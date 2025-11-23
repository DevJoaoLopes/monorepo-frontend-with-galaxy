import ProductList from './components/ProductList'
import './App.css'

function App() {
  return (
    <main>
      <h1>Lista de produtos</h1>
      <p>Pacote remoto consumindo a API do Meteor.</p>
      <ProductList />
    </main>
  )
}

export default App
