export type Suspension = '2-point suspension' | '4-point suspension'
export type LayerCount = '2-layers' | '3-layers' | '4-layers'
export type ProductSize = 'Kids (2m x 1,5m)' | 'Adults (3m x 1,5m)'

export type ProductVariation = {
  id: number
  suspension: Suspension
  layers: LayerCount
  size: ProductSize
  price: number
  inStock: boolean
}

export type Product = {
  id: number
  slug: string
  name: string
  description: string[]
  shortDescription: string
  category: string
  featured: boolean
  badge?: string
  images: Array<{ src: string; alt: string }>
  variations: ProductVariation[]
}

const asset = (filename: string) =>
  `${import.meta.env.BASE_URL}products/${filename}`

const hammockVariations: ProductVariation[] = [
  [202, '2-point suspension', '2-layers', 'Kids (2m x 1,5m)', 1200],
  [208, '2-point suspension', '2-layers', 'Adults (3m x 1,5m)', 1800],
  [214, '2-point suspension', '3-layers', 'Kids (2m x 1,5m)', 1700],
  [220, '2-point suspension', '3-layers', 'Adults (3m x 1,5m)', 2300],
  [226, '2-point suspension', '4-layers', 'Kids (2m x 1,5m)', 2200],
  [232, '2-point suspension', '4-layers', 'Adults (3m x 1,5m)', 2800],
  [238, '4-point suspension', '2-layers', 'Kids (2m x 1,5m)', 1200],
  [244, '4-point suspension', '2-layers', 'Adults (3m x 1,5m)', 1800],
  [250, '4-point suspension', '3-layers', 'Kids (2m x 1,5m)', 1700],
  [280, '4-point suspension', '3-layers', 'Adults (3m x 1,5m)', 2300],
  [286, '4-point suspension', '4-layers', 'Kids (2m x 1,5m)', 2200],
  [292, '4-point suspension', '4-layers', 'Adults (3m x 1,5m)', 2800],
].map(([id, suspension, layers, size, price]) => ({
  id: id as number,
  suspension: suspension as Suspension,
  layers: layers as LayerCount,
  size: size as ProductSize,
  price: price as number,
  inStock: true,
}))

export const catalog: {
  source: string
  extractedAt: string
  currency: 'ZAR'
  products: Product[]
} = {
  source:
    'Sensoree WordPress backup db-20260730-030001.sql.gz (2026-07-30 03:00 UTC)',
  extractedAt: '2026-07-30',
  currency: 'ZAR',
  products: [
    {
      id: 99,
      slug: 'hammock',
      name: 'Hammock',
      category: 'Sensory movement',
      featured: true,
      badge: 'Handmade',
      shortDescription:
        'A handmade sensory hammock for calming deep-pressure and gentle vestibular input.',
      description: [
        'Our handmade sensory hammock wraps the body in a soft, stretchy cocoon, giving calming deep-pressure and gentle vestibular movement input that supports self-regulation and increases body awareness.',
        'Build the one that fits: choose 2-point suspension for a snug, upright cocoon that gently sways from side to side, or 4-point suspension for a flatter, more stable nest.',
        'Choose two to four layers for the right level of support, plus Kids or Adult size. The Adult hammock is longer and has a thicker outside layer, supporting up to 100 kg.',
      ],
      images: [
        {
          src: asset('hammock-forest-green.jpg'),
          alt: 'Grey sensory hammock suspended from an outdoor play frame',
        },
        {
          src: asset('hammock-1.jpg'),
          alt: 'Deep green sensory hammock suspended beside a stream',
        },
        {
          src: asset('hammock-2.jpg'),
          alt: 'Purple layered sensory hammock in a child-friendly room',
        },
      ],
      variations: hammockVariations,
    },
  ],
}

export function getProduct(slug: string) {
  return catalog.products.find((product) => product.slug === slug)
}

export function getPriceRange(product: Product) {
  const prices = product.variations.map((variation) => variation.price)
  return { min: Math.min(...prices), max: Math.max(...prices) }
}
