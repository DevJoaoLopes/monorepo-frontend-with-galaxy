import { useEffect, useState } from 'react'
import { fetchProducts, formatPrice, type Product } from '../api/products'
import './ProductList.css'

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : 'Erro desconhecido'
        setError(message)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <p>Carregando produtos...</p>
  }

  if (error) {
    return <p>⚠️ {error}</p>
  }

  return (
    <section className="product-list">
      <div className="product-list__header">
        <h2>Produtos</h2>
        <small>Consumindo dados do Meteor API</small>
      </div>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <div className="product-list__row">
              <strong>{product.name}</strong>
              <span>{formatPrice(product.price)}</span>
            </div>
            <small>Estoque: {product.stock}</small>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ProductList
