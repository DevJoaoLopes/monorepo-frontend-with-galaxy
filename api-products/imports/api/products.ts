import { Mongo } from 'meteor/mongo'

export interface Product {
  _id?: string
  name: string
  price: number
  stock: number
}

export const Products = new Mongo.Collection<Product>('products')

const seedData: Product[] = [
  { name: 'Camiseta Meteor', price: 79.9, stock: 12 },
  { name: 'Caneca Galaxy', price: 49.9, stock: 30 },
  { name: 'Adesivo React', price: 12.5, stock: 100 },
]

export async function seedProducts() {
  const collection = Products.rawCollection()
  const existing = await collection.countDocuments({})

  if (existing === 0) {
    await collection.insertMany(seedData)
    console.info('[seed] Produtos inseridos:', seedData.length)
  } else {
    console.info('[seed] Coleção já possui registros, nenhum seed aplicado')
  }
}
