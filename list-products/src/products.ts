export interface Product {
  id: number
  name: string
  price: number
}

export const products: Product[] = [
  { id: 1, name: 'Produto A', price: 29.9 },
  { id: 2, name: 'Produto B', price: 59.9 },
  { id: 3, name: 'Produto C', price: 99.9 }
]

export function formatPrice(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}
