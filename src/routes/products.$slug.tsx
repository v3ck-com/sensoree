import { useState } from 'react'
import type { FormEvent } from 'react'
import { createFileRoute, notFound } from '@tanstack/react-router'

import { useCart } from '#/components/Cart'
import { getProduct } from '#/data/catalog'
import type { LayerCount, ProductSize, Suspension } from '#/data/catalog'

const zar = new Intl.NumberFormat('en-ZA', {
  style: 'currency',
  currency: 'ZAR',
  maximumFractionDigits: 0,
})

const suspensionOptions: Suspension[] = [
  '2-point suspension',
  '4-point suspension',
]
const layerOptions: LayerCount[] = ['2-layers', '3-layers', '4-layers']
const sizeOptions: ProductSize[] = ['Kids (2m x 1,5m)', 'Adults (3m x 1,5m)']

export const Route = createFileRoute('/products/$slug')({
  loader: ({ params }) => {
    const product = getProduct(params.slug)
    if (!product) throw notFound()
    return product
  },
  component: ProductPage,
})

function ProductPage() {
  const product = Route.useLoaderData()
  const { addItem } = useCart()
  const [activeImage, setActiveImage] = useState(0)
  const [suspension, setSuspension] = useState<Suspension>('2-point suspension')
  const [layers, setLayers] = useState<LayerCount>('2-layers')
  const [size, setSize] = useState<ProductSize>('Kids (2m x 1,5m)')
  const [colours, setColours] = useState(['#CAE2F9', '#CAE2F9', '#CAE2F9'])

  const variation = product.variations.find(
    (candidate) =>
      candidate.suspension === suspension &&
      candidate.layers === layers &&
      candidate.size === size,
  )

  if (!variation) return null

  function updateColour(index: number, value: string) {
    setColours((currentColours) =>
      currentColours.map((colour, colourIndex) =>
        colourIndex === index ? value : colour,
      ),
    )
  }

  function addToBag(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!variation) return
    const colourNames = ['Outer', 'Middle', 'Inner']
    addItem({
      key: [variation.id, ...colours].join('-'),
      productId: product.id,
      name: product.name,
      image: product.images[0].src,
      price: variation.price,
      configuration: [
        suspension,
        layers,
        size,
        ...colours.map(
          (colour, index) => `${colourNames[index]} colour: ${colour}`,
        ),
      ],
    })
  }

  return (
    <main className="product-page page-shell">
      <div className="product-gallery">
        <div className="gallery-main">
          <img
            alt={product.images[activeImage].alt}
            src={product.images[activeImage].src}
          />
          <span>{activeImage + 1}</span>
        </div>
        <div className="gallery-thumbnails">
          {product.images.map((image, index) => (
            <button
              aria-label={`View image ${index + 1}`}
              className={activeImage === index ? 'active' : ''}
              key={image.src}
              onClick={() => setActiveImage(index)}
              type="button"
            >
              <img alt="" src={image.src} />
            </button>
          ))}
        </div>
      </div>

      <div className="product-buy-box">
        <div className="product-title-row">
          <div>
            <p className="eyebrow">{product.category}</p>
            <h1>{product.name}</h1>
          </div>
          <span className="stock-status">In stock</span>
        </div>
        <p className="product-lead">{product.shortDescription}</p>
        <p className="selected-price">{zar.format(variation.price)}</p>

        <form className="product-options" onSubmit={addToBag}>
          <OptionGroup
            label="Suspension"
            name="suspension"
            onChange={(value) => setSuspension(value as Suspension)}
            options={suspensionOptions}
            selected={suspension}
          />
          <OptionGroup
            label="Layers"
            name="layers"
            onChange={(value) => setLayers(value as LayerCount)}
            options={layerOptions}
            selected={layers}
          />
          <OptionGroup
            label="Size"
            name="size"
            onChange={(value) => setSize(value as ProductSize)}
            options={sizeOptions}
            selected={size}
          />

          <fieldset className="colour-options">
            <legend>Choose your layer colours</legend>
            <p>
              Pick a colour for each part. We will confirm the exact fabric with
              you.
            </p>
            <div>
              {['Outer layer', 'Middle layer', 'Inner layer'].map(
                (label, index) => (
                  <label key={label}>
                    <span>{label}</span>
                    <span className="colour-input">
                      <input
                        aria-label={label}
                        onChange={(event) =>
                          updateColour(index, event.target.value)
                        }
                        type="color"
                        value={colours[index]}
                      />
                      <span>{colours[index]}</span>
                    </span>
                  </label>
                ),
              )}
            </div>
          </fieldset>

          <button className="button button-primary add-to-bag" type="submit">
            Add to bag
            <span>{zar.format(variation.price)}</span>
          </button>
        </form>

        <div className="product-notes">
          <div>
            <strong>Handmade to order</strong>
            <span>Colour and delivery are confirmed personally.</span>
          </div>
          <div>
            <strong>Adult support</strong>
            <span>Adult size supports up to 100 kg.</span>
          </div>
        </div>
      </div>

      <section className="product-story">
        <p className="eyebrow">Why it feels good</p>
        <h2>A cocoon for movement, pressure, and pause.</h2>
        <div>
          {product.description.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>
    </main>
  )
}

function OptionGroup({
  label,
  name,
  options,
  selected,
  onChange,
}: {
  label: string
  name: string
  options: string[]
  selected: string
  onChange: (value: string) => void
}) {
  return (
    <fieldset className="option-group">
      <legend>{label}</legend>
      <div>
        {options.map((option) => (
          <label key={option}>
            <input
              checked={selected === option}
              name={name}
              onChange={() => onChange(option)}
              type="radio"
              value={option}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
