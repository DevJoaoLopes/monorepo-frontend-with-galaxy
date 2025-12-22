export interface Product {
  _id: string
  name: string
  price: number
  stock: number
}

const API_BASE = 'http://localhost:3000/api'

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE}/products`)

  if (!response.ok) {
    throw new Error('Could not load products from the Meteor API')
  }

  return (await response.json()) as Product[]
}

export function formatPrice(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}
