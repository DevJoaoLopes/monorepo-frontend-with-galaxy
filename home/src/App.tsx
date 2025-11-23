import { Suspense, lazy, useMemo } from 'react'
import './App.css'

const remoteBase = import.meta.env.VITE_PRODUCTS_REMOTE ?? 'http://localhost:4174'

const RemoteProductList = lazy(async () => {
  const path = import.meta.env.DEV ? '/src/remote-entry.ts' : '/assets/remote-entry.js'
  const remoteEntryUrl = `${remoteBase}${path}`
  const module = await import(/* @vite-ignore */ remoteEntryUrl)

  return { default: module.ProductList ?? module.default }
})

function App() {
  const marketingCards = useMemo(
    () => [
      {
        title: 'API Meteor',
        description: 'Serviço backend exposto via REST para consumo em múltiplos pacotes.',
      },
      {
        title: 'Module Federation',
        description: 'Front-ends React carregados dinamicamente em tempo de execução.',
      },
      {
        title: 'Galaxy-ready',
        description: 'Monorepo pronto para hospedar o backend no Galaxy e servir os remotes.',
      },
    ],
    [],
  )

  return (
    <div className="home-layout">
      <header>
        <div>
          <p className="eyebrow">Monorepo Federado</p>
          <h1>Loja orquestrada com Meteor + React</h1>
          <p className="lede">
            O backend Meteor entrega dados centralizados enquanto as experiências em React se conectam via
            module federation. Cada aplicativo segue independente, mas fala a mesma língua.
          </p>
        </div>
        <span className="logo">🪐</span>
      </header>

      <section className="grid">
        {marketingCards.map((card) => (
          <article key={card.title}>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </article>
        ))}
      </section>

      <section className="remote">
        <h2>Catálogo remoto</h2>
        <p className="lede">Carregado em tempo de execução do pacote list-products consumindo a API Meteor.</p>
        <div className="remote-card">
          <Suspense fallback={<p>Carregando lista federada...</p>}>
            <RemoteProductList />
          </Suspense>
        </div>
      </section>
    </div>
  )
}

export default App
