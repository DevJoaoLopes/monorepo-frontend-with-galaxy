import { Meteor } from 'meteor/meteor'
import { WebApp } from 'meteor/webapp'
import type { IncomingMessage, ServerResponse } from 'http'
import { Products, seedProducts, type Product } from '../imports/api/products'

Meteor.startup(() => {
  seedProducts()
})

function sendJson(res: ServerResponse, statusCode: number, payload: unknown) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  })
  res.end(JSON.stringify(payload))
}

async function readBody(req: IncomingMessage) {
  const chunks: Uint8Array[] = []

  for await (const chunk of req) {
    chunks.push(Buffer.from(chunk))
  }

  return Buffer.concat(chunks).toString('utf-8')
}

WebApp.connectHandlers.use('/api/products', async (req, res, next) => {
  const url = new URL(req?.url ?? '/', 'http://localhost')
  const [productId] = url.pathname.split('/').filter(Boolean)

  if (req.method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    })
    res.end()
    return
  }

  if (req.method === 'GET' && !productId) {
    const items = Products.find().fetch()
    sendJson(res, 200, items)
    return
  }

  if (req.method === 'GET' && productId) {
    const product = Products.findOne({ _id: productId })

    if (!product) {
      sendJson(res, 404, { message: 'Produto não encontrado' })
      return
    }

    sendJson(res, 200, product)
    return
  }

  if (req.method === 'POST') {
    try {
      const rawBody = await readBody(req)
      const parsed = (rawBody ? JSON.parse(rawBody) : {}) as Partial<Product>

      if (!parsed.name || typeof parsed.price !== 'number') {
        sendJson(res, 400, { message: 'Envie nome, preço e estoque para criar um produto' })
        return
      }

      const product: Product = {
        name: parsed.name,
        price: parsed.price,
        stock: typeof parsed.stock === 'number' ? parsed.stock : 0,
      }

      const _id = Products.insert(product)
      sendJson(res, 201, { _id, ...product })
      return
    } catch (error) {
      sendJson(res, 500, { message: 'Erro ao processar o produto', error: `${error}` })
      return
    }
  }

  next()
})
