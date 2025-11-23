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

export function seedProducts() {
  if (Products.find().count() === 0) {
    seedData.forEach((product) => {
      Products.insert(product)
    })
  }
}
