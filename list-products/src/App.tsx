import { products, formatPrice } from './products'
import './App.css'

function App() {
  return (
    <main>
      <h1>Produtos</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {formatPrice(product.price)}
          </li>
        ))}
      </ul>
    </main>
  )
}

export default App
