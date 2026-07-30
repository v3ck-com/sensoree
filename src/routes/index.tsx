import { Link, createFileRoute } from '@tanstack/react-router'

import { ProductCard } from '#/components/ProductCard'
import { catalog } from '#/data/catalog'

export const Route = createFileRoute('/')({ component: Home })

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20">
      <path d="M4 10h11m-4-4 4 4-4 4" />
    </svg>
  )
}

function Home() {
  const featuredProducts = catalog.products.filter(
    (product) => product.featured,
  )

  return (
    <main>
      <section className="hero page-shell">
        <div className="hero-copy">
          <p className="eyebrow">A more considered way to shop</p>
          <h1>
            Find your <em>feel-good.</em>
          </h1>
          <p className="hero-intro">
            Thoughtful goods chosen for comfort, curiosity, and the small
            rituals that make every day feel more like yours.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/shop">
              Explore the collection
              <ArrowIcon />
            </Link>
            <button
              className="text-link"
              onClick={() =>
                document.getElementById('our-approach')?.scrollIntoView()
              }
              type="button"
            >
              Why Sensoree
            </button>
          </div>
        </div>

        <div className="sensory-composition" aria-hidden="true">
          <div className="composition-label">
            <span>01</span>
            <p>Made to be felt</p>
          </div>
          <div className="shape shape-coral" />
          <div className="shape shape-sun" />
          <div className="shape shape-ink" />
          <div className="shape shape-loop" />
          <div className="shape shape-dot" />
        </div>
      </section>

      <section className="ticker" aria-label="Our values">
        <div>
          <span>Comfort-led</span>
          <i />
          <span>Curiosity-approved</span>
          <i />
          <span>Selected with care</span>
          <i />
          <span>Made for real life</span>
        </div>
      </section>

      {featuredProducts.length > 0 && (
        <section className="collection page-shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">The edit</p>
              <h2>Current favourites</h2>
            </div>
            <Link className="text-link" to="/shop">
              Shop all <ArrowIcon />
            </Link>
          </div>
          <div className="product-grid">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      <section className="approach page-shell" id="our-approach">
        <div className="approach-art" aria-hidden="true">
          <span>touch</span>
          <span>pause</span>
          <span>notice</span>
          <div />
        </div>
        <div className="approach-copy">
          <p className="eyebrow">Our approach</p>
          <h2>There is no one right way to feel good.</h2>
          <p>
            Sensoree is being shaped as a welcoming place to discover products
            through the way they feel, fit, and support your everyday rhythms.
          </p>
          <Link className="button button-secondary" to="/shop">
            Shop the hammock
            <ArrowIcon />
          </Link>
        </div>
      </section>

      <section className="newsletter page-shell">
        <div>
          <p className="eyebrow">We are here to help</p>
          <h2>Not sure which hammock is right?</h2>
        </div>
        <a className="newsletter-contact" href="mailto:hello@sensoree.co.za">
          <span>Ask us a question</span>
          <ArrowIcon />
        </a>
      </section>
    </main>
  )
}
