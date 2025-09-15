import './App.css'

interface Product {
  id: number
  name: string
  price: number
}

const products: Product[] = [
  { id: 1, name: 'Sabonete', price: 5.9 },
  { id: 2, name: 'Shampoo', price: 12.5 },
  { id: 3, name: 'Toalha', price: 25 },
]

function App() {
  return (
    <div>
      <h1>Lista de Produtos</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - R$ {product.price.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
