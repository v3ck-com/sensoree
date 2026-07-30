import { Link, Outlet, createRootRoute } from '@tanstack/react-router'

import { CartDrawer, CartProvider, useCart } from '#/components/Cart'

export const Route = createRootRoute({ component: RootLayout })

function BagIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M6.5 8.5h11l1 12h-13l1-12Z" />
      <path d="M9 9V6.5a3 3 0 0 1 6 0V9" />
    </svg>
  )
}

function RootLayout() {
  return (
    <CartProvider>
      <StoreShell />
    </CartProvider>
  )
}

function StoreShell() {
  const { itemCount, openCart } = useCart()

  function scrollToApproach() {
    window.setTimeout(
      () => document.getElementById('our-approach')?.scrollIntoView(),
      100,
    )
  }

  return (
    <>
      <div className="announcement">
        <p>Handmade in South Africa</p>
      </div>
      <header className="site-header page-shell">
        <Link className="wordmark" to="/" aria-label="Sensoree home">
          sensoree<span>.</span>
        </Link>
        <nav aria-label="Main navigation">
          <Link to="/shop" activeProps={{ className: 'active' }}>
            Shop
          </Link>
          <Link onClick={scrollToApproach} to="/">
            Our approach
          </Link>
        </nav>
        <button
          aria-label={`Open shopping bag with ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
          className="bag-button"
          onClick={openCart}
          type="button"
        >
          <BagIcon />
          <span>{itemCount}</span>
        </button>
      </header>
      <Outlet />
      <footer className="site-footer page-shell">
        <div className="footer-brand">
          <p className="wordmark">
            sensoree<span>.</span>
          </p>
          <p>Find your feel-good.</p>
        </div>
        <div className="footer-links">
          <Link to="/shop">Shop</Link>
          <a href="mailto:hello@sensoree.co.za">Contact</a>
        </div>
        <p className="copyright">Sensoree, South Africa</p>
      </footer>
      <CartDrawer />
    </>
  )
}
