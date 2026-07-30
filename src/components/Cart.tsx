import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

export type CartItem = {
  key: string
  productId: number
  name: string
  image: string
  price: number
  quantity: number
  configuration: string[]
}

type CartContextValue = {
  items: CartItem[]
  itemCount: number
  isOpen: boolean
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  changeQuantity: (key: string, adjustment: number) => void
  removeItem: (key: string) => void
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

const zar = new Intl.NumberFormat('en-ZA', {
  style: 'currency',
  currency: 'ZAR',
  maximumFractionDigits: 0,
})

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  function addItem(item: Omit<CartItem, 'quantity'>) {
    setItems((currentItems) => {
      const existingItem = currentItems.find(({ key }) => key === item.key)
      if (existingItem) {
        return currentItems.map((currentItem) =>
          currentItem.key === item.key
            ? { ...currentItem, quantity: currentItem.quantity + 1 }
            : currentItem,
        )
      }
      return [...currentItems, { ...item, quantity: 1 }]
    })
    setIsOpen(true)
  }

  function changeQuantity(key: string, adjustment: number) {
    setItems((currentItems) =>
      currentItems
        .map((item) =>
          item.key === key
            ? { ...item, quantity: item.quantity + adjustment }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount: items.reduce((count, item) => count + item.quantity, 0),
        isOpen,
        addItem,
        changeQuantity,
        removeItem: (key) =>
          setItems((currentItems) =>
            currentItems.filter((item) => item.key !== key),
          ),
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside CartProvider')
  return context
}

export function CartDrawer() {
  const { items, isOpen, closeCart, changeQuantity, removeItem } = useCart()
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )
  const orderBody = [
    'Hello Sensoree,',
    '',
    'I would like to order:',
    ...items.map(
      (item) =>
        `${item.quantity} x ${item.name} (${item.configuration.join(', ')}) - ${zar.format(item.price * item.quantity)}`,
    ),
    '',
    `Subtotal: ${zar.format(subtotal)}`,
  ].join('\n')

  return (
    <>
      <button
        aria-label="Close shopping bag"
        className={`cart-scrim ${isOpen ? 'is-open' : ''}`}
        onClick={closeCart}
        type="button"
      />
      <aside
        aria-hidden={!isOpen}
        aria-label="Shopping bag"
        className={`cart-drawer ${isOpen ? 'is-open' : ''}`}
      >
        <div className="cart-heading">
          <div>
            <p className="eyebrow">Your selection</p>
            <h2>Shopping bag</h2>
          </div>
          <button
            aria-label="Close shopping bag"
            onClick={closeCart}
            type="button"
          >
            <span />
            <span />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <p>Your bag is ready for something good.</p>
            <button onClick={closeCart} type="button">
              Continue shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <article className="cart-item" key={item.key}>
                  <img alt="" src={item.image} />
                  <div>
                    <h3>{item.name}</h3>
                    {item.configuration.map((value) => (
                      <p key={value}>{value}</p>
                    ))}
                    <div className="cart-item-actions">
                      <div className="quantity-control">
                        <button
                          aria-label={`Remove one ${item.name}`}
                          onClick={() => changeQuantity(item.key, -1)}
                          type="button"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          aria-label={`Add one ${item.name}`}
                          onClick={() => changeQuantity(item.key, 1)}
                          type="button"
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="remove-item"
                        onClick={() => removeItem(item.key)}
                        type="button"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <strong>{zar.format(item.price * item.quantity)}</strong>
                </article>
              ))}
            </div>
            <div className="cart-summary">
              <div>
                <span>Subtotal</span>
                <strong>{zar.format(subtotal)}</strong>
              </div>
              <p>Delivery is arranged after your order is confirmed.</p>
              <a
                className="button button-primary"
                href={`mailto:hello@sensoree.co.za?subject=${encodeURIComponent('Sensoree order request')}&body=${encodeURIComponent(orderBody)}`}
              >
                Request this order
              </a>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
