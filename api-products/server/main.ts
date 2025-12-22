import { Meteor } from 'meteor/meteor'
import { WebApp } from 'meteor/webapp'
import type { IncomingMessage, ServerResponse } from 'http'
import { Products, seedProducts, type Product } from '../imports/api/products'

Meteor.startup(async () => {
  await seedProducts()
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
  const rawPath = req?.url ?? '/'
  const trimmedPath = rawPath.startsWith('/api/products')
    ? rawPath.slice('/api/products'.length) || '/'
    : rawPath
  const url = new URL(trimmedPath, 'http://localhost')
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
    const items = await Products.rawCollection().find({}).toArray()
    sendJson(res, 200, items)
    return
  }

  if (req.method === 'GET' && productId) {
    const product = await Products.rawCollection().findOne({ _id: productId })

    if (!product) {
      sendJson(res, 404, { message: 'Product not found' })
      return
    }

    sendJson(res, 200, product)
    return
  }

  // Create product (optional)
  if (req.method === 'POST') {
    try {
      const rawBody = await readBody(req)
      const parsed = (rawBody ? JSON.parse(rawBody) : {}) as Partial<Product>

      if (!parsed.name || typeof parsed.price !== 'number') {
        sendJson(res, 400, { message: 'Send the name and price to create a product' })
        return
      }

      const product: Product = {
        name: parsed.name,
        price: parsed.price,
        stock: typeof parsed.stock === 'number' ? parsed.stock : 0,
      }

      const result = await Products.rawCollection().insertOne(product)
      sendJson(res, 201, { _id: result.insertedId, ...product })
      return
    } catch (error) {
      sendJson(res, 500, { message: 'Error processing product', error: `${error}` })
      return
    }
  }

  next()
})
