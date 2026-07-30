import { Link } from '@tanstack/react-router'

import { getPriceRange } from '#/data/catalog'
import type { Product } from '#/data/catalog'

const zar = new Intl.NumberFormat('en-ZA', {
  style: 'currency',
  currency: 'ZAR',
  maximumFractionDigits: 0,
})

export function ProductCard({ product }: { product: Product }) {
  const prices = getPriceRange(product)

  return (
    <article className="product-card">
      <Link
        className="product-image"
        params={{ slug: product.slug }}
        to="/products/$slug"
      >
        <img alt={product.images[0].alt} src={product.images[0].src} />
        {product.badge && <span>{product.badge}</span>}
      </Link>
      <div className="product-details">
        <p>{product.category}</p>
        <h3>
          <Link params={{ slug: product.slug }} to="/products/$slug">
            {product.name}
          </Link>
        </h3>
        <div className="product-price">
          <span>From {zar.format(prices.min)}</span>
          <span className="price-range">Up to {zar.format(prices.max)}</span>
        </div>
      </div>
    </article>
  )
}
