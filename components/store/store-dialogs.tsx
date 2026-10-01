'use client'

import { useEffect, useRef } from 'react'
import { AlertCircle, Trash2, X } from 'lucide-react'
import { track } from '@vercel/analytics'
import { LAUNCH_DISCOUNT, SUPPORT_TERMS, formatPrice, getProduct, standaloneValue } from '@/lib/catalog'
import { cn } from '@/lib/utils'
import { WaitlistForm } from '@/components/landing/waitlist-form'
import { useCart } from './cart-context'
import { AddToCartButton } from './product-actions'

function useModal(open: boolean) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])
  return ref
}

const closeBtn =
  'flex size-11 shrink-0 items-center justify-center rounded-md border text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'

export function ProductDialog() {
  const { detail: product, closeDetail, coveringBundle } = useCart()
  const ref = useModal(Boolean(product))
  const bundle = product ? coveringBundle(product.code) : undefined

  return (
    <dialog
      ref={ref}
      aria-labelledby="product-dialog-title"
      onClose={closeDetail}
      onClick={(e) => e.target === e.currentTarget && closeDetail()}
      className="paper m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-lg border p-0 shadow-2xl open:animate-in open:fade-in-0 open:zoom-in-[0.98] open:duration-200"
    >
      {product && (
        <article>
          <header className="sticky top-0 z-10 flex items-start gap-4 border-b bg-background px-6 py-5">
            <div className="mr-auto">
              <p className="font-mono text-[11px] font-medium tracking-[0.14em] text-primary uppercase">
                {product.categoryLabel} · {product.code}
              </p>
              <h2 id="product-dialog-title" className="mt-1.5 text-2xl font-semibold tracking-tight">
                {product.name}
              </h2>
            </div>
            <button type="button" autoFocus onClick={closeDetail} className={closeBtn}>
              <X className="size-5" aria-hidden="true" />
              <span className="sr-only">Close details</span>
            </button>
          </header>

          <div className="flex flex-col gap-7 px-6 py-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <p className="max-w-md text-pretty leading-relaxed">{product.outcome}</p>
              <div className="sm:text-right">
                <p className="font-mono text-3xl font-semibold tabular-nums">{formatPrice(product)}</p>
                <p className="text-xs text-muted-foreground">
                  {product.bundleOf ? `$${standaloneValue(product)} if bought separately` : 'Launch price'}
                </p>
              </div>
            </div>

            <section aria-labelledby="pd-includes">
              <h3 id="pd-includes" className="font-mono text-[11px] font-medium tracking-[0.14em] text-muted-foreground">
                WHAT YOU RECEIVE
              </h3>
              <ul className="mt-3 flex flex-col divide-y rounded-md border bg-card">
                {product.includes.map((item) => (
                  <li key={item} className="px-4 py-3 text-sm leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <dl className="grid gap-px overflow-hidden rounded-md border bg-border sm:grid-cols-2">
              {[
                ['Requires', product.requirements],
                ['Formats', product.formats.join(', ')],
                ['Setup', product.setupTime],
                ['Version', product.version],
                ['Built for', product.forWho],
                ['Not for', product.notFor],
              ].map(([term, desc]) => (
                <div key={term} className="bg-card px-4 py-3">
                  <dt className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">{term}</dt>
                  <dd className="mt-1 text-sm leading-relaxed">{desc}</dd>
                </div>
              ))}
            </dl>

            <section aria-labelledby="pd-terms" className="rounded-md border border-dashed px-4 py-4 text-sm leading-relaxed">
              <h3 id="pd-terms" className="font-mono text-[11px] font-medium tracking-[0.14em] text-muted-foreground">
                LICENSE, UPDATES, SUPPORT
              </h3>
              <p className="mt-2">{product.license}</p>
              <p className="mt-1">{product.updates}</p>
              <p className="mt-1">{SUPPORT_TERMS}</p>
            </section>
          </div>

          <footer className="sticky bottom-0 flex items-center gap-3 border-t bg-background px-6 py-4">
            <p className="mr-auto text-sm text-muted-foreground">
              {bundle ? `Included in ${bundle.name}, already in your cart.` : 'Sold and supported by Field Ready.'}
            </p>
            <AddToCartButton code={product.code} className="px-6" />
          </footer>
        </article>
      )}
    </dialog>
  )
}

export function CartDrawer() {
  const { items, notice, cartOpen, closeCart, remove } = useCart()
  const ref = useModal(cartOpen)
  const subtotal = items.reduce((sum, p) => sum + p.price, 0)
  const discount = Math.round(subtotal * LAUNCH_DISCOUNT * 100) / 100

  return (
    <dialog
      ref={ref}
      aria-labelledby="cart-title"
      onClose={closeCart}
      onClick={(e) => e.target === e.currentTarget && closeCart()}
      className="paper fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-none w-full max-w-md border-l p-0 open:animate-in open:slide-in-from-right open:duration-200"
    >
      <div className="flex h-full flex-col">
        <header className="flex items-center gap-4 border-b px-5 py-4">
          <h2 id="cart-title" className="mr-auto text-lg font-semibold">
            Cart <span className="font-mono text-sm text-muted-foreground">({items.length})</span>
          </h2>
          <button type="button" autoFocus onClick={closeCart} className={closeBtn}>
            <X className="size-5" aria-hidden="true" />
            <span className="sr-only">Close cart</span>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {notice && (
            <p role="status" className="mb-4 flex gap-2 rounded-md border bg-card px-3 py-2.5 text-sm">
              <AlertCircle className="mt-0.5 size-4 shrink-0 text-info" aria-hidden="true" />
              {notice}
            </p>
          )}

          {items.length === 0 ? (
            <div className="flex flex-col items-start gap-3 py-10">
              <p className="font-medium">Your cart is empty.</p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Start with Family Readiness OS, or take the Complete bundle for the full system.
              </p>
              <a
                href="#store"
                onClick={closeCart}
                className="mt-2 inline-flex h-11 items-center rounded-md border px-4 text-sm font-semibold hover:bg-accent"
              >
                Browse the kit
              </a>
            </div>
          ) : (
            <ul className="flex flex-col divide-y rounded-md border bg-card">
              {items.map((p) => (
                <li key={p.code} className="flex items-start gap-3 px-4 py-4">
                  <div className="mr-auto min-w-0">
                    <p className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground">{p.code}</p>
                    <p className="font-medium">{p.name}</p>
                    <p className="text-xs text-muted-foreground">Qty 1 · Personal household license</p>
                    {p.bundleOf && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        Includes {p.bundleOf.map((c) => getProduct(c)?.name).join(', ')}
                      </p>
                    )}
                  </div>
                  <p className="font-mono font-semibold tabular-nums">{formatPrice(p)}</p>
                  <button
                    type="button"
                    onClick={() => remove(p.code)}
                    className="-mt-2 -mr-2 flex size-11 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="size-4" aria-hidden="true" />
                    <span className="sr-only">Remove {p.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <footer className="border-t px-5 py-5">
            <dl className="flex flex-col gap-1.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-mono tabular-nums">${subtotal.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Launch discount, reserved (25%)</dt>
                <dd className="font-mono tabular-nums text-primary">-${discount.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between border-t pt-2 font-semibold">
                <dt>Estimated at launch</dt>
                <dd className="font-mono tabular-nums">${(subtotal - discount).toFixed(2)}</dd>
              </div>
            </dl>
            <p className={cn('mt-4 text-sm leading-relaxed text-muted-foreground')}>
              Checkout opens at launch. Reserve this cart and we&apos;ll email your checkout link with the discount held.
              Tax is calculated at checkout.
            </p>
            <WaitlistForm
              className="mt-3"
              cta="Reserve this cart"
              hint="One email at launch. No payment taken today."
              items={items.map((p) => p.code)}
              onSubmitted={() => track('reserve_cart', { items: items.length, value: subtotal })}
            />
          </footer>
        )}
      </div>
    </dialog>
  )
}
