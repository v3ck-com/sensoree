# Sensoree

A React ecommerce storefront for Sensoree, built with Vite, TanStack Router, and
Tailwind CSS.

## Development

```bash
npm install
npm run dev
```

## Catalog

The hard-coded catalog in `src/data/catalog.ts` was recovered from the latest
WooCommerce backup, `db-20260730-030001.sql.gz`, captured on 30 July 2026 at
03:00 UTC. It contains the Hammock and its 12 suspension, layer, and size
variations. Product images are stored in `public/products/`.

## Checks

```bash
npm run typecheck
npm run lint
npm run check
npm run build
```

## Deployment

Pushes to `master` deploy `dist/` to GitHub Pages through
`.github/workflows/deploy.yml`. Hash-based TanStack Router history keeps nested
routes working on static hosting.
