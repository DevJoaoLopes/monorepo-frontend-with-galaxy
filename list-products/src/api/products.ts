export interface Product {
  _id: string
  name: string
  price: number
  stock: number
}

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api'

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE}/products`)

  if (!response.ok) {
    throw new Error('Não foi possível carregar os produtos da API Meteor')
  }

  return (await response.json()) as Product[]
}

export function formatPrice(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}
