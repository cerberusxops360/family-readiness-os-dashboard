'use client'

import { Check, Plus } from 'lucide-react'
import { getProduct } from '@/lib/catalog'
import { cn } from '@/lib/utils'
import { useCart } from './cart-context'

const base =
  'inline-flex h-11 items-center justify-center gap-1.5 rounded-md px-4 text-sm font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed'

export function AddToCartButton({ code, className }: { code: string; className?: string }) {
  const { add, inCart, coveringBundle } = useCart()
  const product = getProduct(code)
  const bundle = coveringBundle(code)
  const added = inCart(code)

  if (bundle) {
    return (
      <button type="button" disabled className={cn(base, 'border border-dashed text-muted-foreground', className)}>
        <Check className="size-4" aria-hidden="true" />
        In bundle
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={() => add(code)}
      aria-label={added ? `${product?.name} is in your cart. Open cart` : `Add ${product?.name} to cart`}
      className={cn(
        base,
        added ? 'border border-primary text-primary hover:bg-primary/10' : 'bg-primary text-primary-foreground hover:bg-primary/90',
        className,
      )}
    >
      {added ? <Check className="size-4" aria-hidden="true" /> : <Plus className="size-4" aria-hidden="true" />}
      {added ? 'In cart' : 'Add'}
    </button>
  )
}

export function DetailsButton({ code, className }: { code: string; className?: string }) {
  const { openDetail } = useCart()
  const product = getProduct(code)
  return (
    <button
      type="button"
      onClick={() => openDetail(code)}
      aria-label={`Details for ${product?.name}`}
      className={cn(base, 'border bg-transparent hover:bg-accent', className)}
    >
      Details
    </button>
  )
}
