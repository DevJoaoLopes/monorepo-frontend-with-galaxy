import { Mongo } from 'meteor/mongo'

export interface Product {
  _id?: string
  name: string
  price: number
  stock: number
}

export const Products = new Mongo.Collection<Product>('products')

const seedData: Product[] = [
  { name: 'Meteor T-Shirt', price: 79.9, stock: 12 },
  { name: 'Galaxy Mug', price: 49.9, stock: 30 },
  { name: 'React Sticker', price: 12.5, stock: 100 },
]

export async function seedProducts() {
  const collection = Products.rawCollection()

  try {
    await collection.deleteMany({})
    await collection.insertMany(seedData)
    console.info('[seed] Products collection reset and seeded')
  } catch (error) {
    console.error('[seed] Error seeding products:', error)
  }
}
