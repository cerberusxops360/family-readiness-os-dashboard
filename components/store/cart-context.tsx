'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { track } from '@vercel/analytics'
import { getProduct, type Product } from '@/lib/catalog'

type CartContextValue = {
  items: Product[]
  notice: string | null
  cartOpen: boolean
  detail: Product | null
  add: (code: string) => void
  remove: (code: string) => void
  inCart: (code: string) => boolean
  coveringBundle: (code: string) => Product | undefined
  openCart: () => void
  closeCart: () => void
  openDetail: (code: string) => void
  closeDetail: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [codes, setCodes] = useState<string[]>([])
  const [notice, setNotice] = useState<string | null>(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [detailCode, setDetailCode] = useState<string | null>(null)

  const items = useMemo(() => codes.map(getProduct).filter((p): p is Product => Boolean(p)), [codes])

  const coveringBundle = useCallback(
    (code: string) => items.find((p) => p.bundleOf?.includes(code)),
    [items],
  )

  const add = useCallback(
    (code: string) => {
      const product = getProduct(code)
      if (!product || coveringBundle(code)) return
      setDetailCode(null)
      setCartOpen(true)
      if (codes.includes(code)) {
        setNotice(null)
        return
      }
      const children = product.bundleOf ?? []
      const removed = codes.filter((c) => children.includes(c))
      setCodes([...codes.filter((c) => !children.includes(c)), code])
      setNotice(
        removed.length
          ? `Removed ${removed.length} ${removed.length === 1 ? 'item' : 'items'} already included in ${product.name}.`
          : null,
      )
      track('add_to_cart', { product: code, price: product.price })
    },
    [codes, coveringBundle],
  )

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      notice,
      cartOpen,
      detail: detailCode ? (getProduct(detailCode) ?? null) : null,
      add,
      remove: (code) => {
        setCodes((prev) => prev.filter((c) => c !== code))
        setNotice(null)
      },
      inCart: (code) => codes.includes(code),
      coveringBundle,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      openDetail: (code) => {
        setDetailCode(code)
        track('view_item', { product: code })
      },
      closeDetail: () => setDetailCode(null),
    }),
    [items, notice, cartOpen, detailCode, add, codes, coveringBundle],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
