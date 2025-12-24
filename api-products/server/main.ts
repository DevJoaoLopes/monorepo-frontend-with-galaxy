import { Meteor } from 'meteor/meteor'
import { WebApp } from 'meteor/webapp'
import type { IncomingMessage, ServerResponse } from 'http'
import { Products, seedProducts, type IProduct } from '../imports/api/products'


//* Seed products on server startup
Meteor.startup(async () => {
  await seedProducts()
})

//* Simple JSON response helper
function sendJson(res: ServerResponse, statusCode: number, payload: unknown) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  })
  res.end(JSON.stringify(payload))
}

//* Read request body helper
async function readBody(req: IncomingMessage) {
  const chunks: Uint8Array[] = []

  for await (const chunk of req) {
    chunks.push(Buffer.from(chunk))
  }

  return Buffer.concat(chunks).toString('utf-8')
}

//* API route for products
WebApp.connectHandlers.use('/api/products', async (req, res, next) => {
  const rawPath = req?.url ?? '/'
  const trimmedPath = rawPath.startsWith('/api/products')
    ? rawPath.slice('/api/products'.length) || '/'
    : rawPath
  const url = new URL(trimmedPath, 'http://localhost')
  const hasExtraPath = url.pathname.split('/').filter(Boolean).length > 0

  if (req.method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    })
    res.end()
    return
  }

  //* GET List products
  if (req.method === 'GET' && !hasExtraPath) {
    const items = await Products.rawCollection().find({}).toArray()
    sendJson(res, 200, items)
    return
  }

  //* POST Create product (optional)
  if (req.method === 'POST' && !hasExtraPath) {
    try {
      const rawBody = await readBody(req)
      const parsed = (rawBody ? JSON.parse(rawBody) : {}) as Partial<IProduct>

      if (!parsed.name || typeof parsed.price !== 'number') {
        sendJson(res, 400, { message: 'Send the name and price to create a product' })
        return
      }

      const product: IProduct = {
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
  
  sendJson(res, 404, { message: 'Not found' })
  return
})
