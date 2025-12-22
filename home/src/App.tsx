import { lazy, Suspense, useMemo } from 'react'
import './App.css'
const RemoteProducts = lazy(
	// @ts-expect-error module-federation
	async () => import('remote/remote-products'),
);


function App() {
  const marketingCards = useMemo(
    () => [
      {
        title: 'Meteor API',
        description: 'Backend service exposed via REST for multiple packages.',
      },
      {
        title: 'Module Federations',
        description: 'React frontends loaded dynamically at runtime (host + remote_products).',
      },
    ],
    [],
  )

  return (
    <div className="home-layout">
      <header>
        <div>
          <p className="eyebrow">Federated monorepo</p>
          <h1>Store orchestrated with Meteor + React</h1>
          <p className="lede">
            The Meteor backend serves centralized data while React experiences connect through module federation.
            Each app runs independently but speaks the same language.
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
        <h2>Remote catalog</h2>
        <p className="lede">Runtime-loaded from the list-products package consuming the Meteor API.</p>
        <div className="remote-card">
          <Suspense fallback={<p>Loading federated list...</p>}>
            <RemoteProducts />
          </Suspense>
        </div>
      </section>
    </div>
  )
}

export default App
