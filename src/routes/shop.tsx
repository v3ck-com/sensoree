import { createFileRoute } from '@tanstack/react-router'

import { ProductCard } from '#/components/ProductCard'
import { catalog } from '#/data/catalog'

export const Route = createFileRoute('/shop')({ component: Shop })

function Shop() {
  return (
    <main className="shop-page page-shell">
      <header className="shop-heading">
        <p className="eyebrow">The collection</p>
        <h1>Made for movement. Built for comfort.</h1>
        <p>
          Handmade sensory support, configurable to fit the way you move, rest,
          and regulate.
        </p>
      </header>

      {catalog.products.length > 0 ? (
        <div className="product-grid">
          {catalog.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty-catalog">
          <div className="empty-mark" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div>
            <p className="eyebrow">Coming soon</p>
            <h2>The shelves are waiting.</h2>
            <p>
              Product details and prices will appear here as soon as the
              Sensoree catalogue is ready.
            </p>
            <a href="mailto:hello@sensoree.co.za">Ask us what is coming</a>
          </div>
        </div>
      )}
    </main>
  )
}
