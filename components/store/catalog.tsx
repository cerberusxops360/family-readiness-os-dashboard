'use client'

import { useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { CATEGORIES, PRODUCTS, formatPrice, standaloneValue, type CategoryId, type Product } from '@/lib/catalog'
import { cn } from '@/lib/utils'
import { AddToCartButton, DetailsButton } from './product-actions'

type Filter = CategoryId | 'all'

function matches(product: Product, query: string) {
  if (!query) return true
  const haystack = [product.name, product.code, product.categoryLabel, product.outcome, ...product.formats, ...product.includes]
    .join(' ')
    .toLowerCase()
  return query
    .toLowerCase()
    .split(/\s+/)
    .every((term) => haystack.includes(term))
}

export function Catalog() {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const initialCategory = params.get('category')
  const [filter, setFilter] = useState<Filter>(
    CATEGORIES.some((c) => c.id === initialCategory) ? (initialCategory as Filter) : 'all',
  )
  const [query, setQuery] = useState(params.get('q') ?? '')

  function sync(nextFilter: Filter, nextQuery: string) {
    const next = new URLSearchParams()
    if (nextFilter !== 'all') next.set('category', nextFilter)
    if (nextQuery.trim()) next.set('q', nextQuery.trim())
    const qs = next.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }

  const visible = useMemo(
    () => PRODUCTS.filter((p) => (filter === 'all' || p.category === filter) && matches(p, query.trim())),
    [filter, query],
  )

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div role="group" aria-label="Filter by category" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:px-0">
          {CATEGORIES.map((c) => {
            const active = filter === c.id
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setFilter(c.id)
                  sync(c.id, query)
                }}
                className={cn(
                  'h-11 shrink-0 rounded-md border px-4 text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                  active ? 'border-foreground bg-foreground text-background' : 'bg-card hover:border-foreground/40',
                )}
              >
                {c.label}
              </button>
            )
          })}
        </div>

        <div className="relative md:w-80">
          <label htmlFor="catalog-search" className="sr-only">
            Search systems or outcomes
          </label>
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input
            id="catalog-search"
            type="search"
            value={query}
            placeholder="Search systems or outcomes"
            onChange={(e) => {
              setQuery(e.target.value)
              sync(filter, e.target.value)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Escape' && query) {
                e.preventDefault()
                setQuery('')
                sync(filter, '')
              }
            }}
            className="h-11 w-full rounded-md border bg-card pr-10 pl-9 text-base outline-none placeholder:text-muted-foreground focus-visible:border-foreground focus-visible:ring-2 focus-visible:ring-ring/40 md:text-sm [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('')
                sync(filter, '')
                document.getElementById('catalog-search')?.focus()
              }}
              className="absolute top-1/2 right-1 flex size-9 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" aria-hidden="true" />
              <span className="sr-only">Clear search</span>
            </button>
          )}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length} {visible.length === 1 ? 'product' : 'products'} shown
      </p>

      {visible.length === 0 ? (
        <div className="mt-8 rounded-lg border border-dashed bg-card px-6 py-14 text-center">
          <p className="font-medium">No systems match that search.</p>
          <p className="mt-1 text-sm text-muted-foreground">Try an outcome like &ldquo;go-bag&rdquo;, &ldquo;drill&rdquo;, or &ldquo;pets&rdquo;.</p>
          <button
            type="button"
            onClick={() => {
              setQuery('')
              setFilter('all')
              sync('all', '')
            }}
            className="mt-5 inline-flex h-11 items-center rounded-md border px-4 text-sm font-semibold hover:bg-accent"
          >
            Show all products
          </button>
        </div>
      ) : (
        <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <li key={p.code}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  const isBundle = product.category === 'bundle'
  return (
    <article
      aria-labelledby={`${product.code}-name`}
      className={cn(
        'flex h-full flex-col rounded-lg border bg-card p-5 transition-colors duration-150 hover:border-foreground/30',
        isBundle && 'border-foreground/40',
      )}
    >
      <div className="flex items-center justify-between gap-3 font-mono text-[11px] tracking-[0.14em]">
        <span className="font-medium text-primary uppercase">{product.categoryLabel}</span>
        <span className="text-muted-foreground">{product.code}</span>
      </div>
      <h3 id={`${product.code}-name`} className="mt-4 text-xl font-semibold tracking-tight">
        {product.name}
      </h3>
      <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">{product.outcome}</p>

      <ul aria-label="Formats" className="mt-4 flex flex-wrap gap-1.5">
        {product.formats.map((f) => (
          <li key={f} className="rounded-sm border px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-end gap-2 pt-6">
        <div className="mr-auto">
          <p className="font-mono text-2xl font-semibold tabular-nums">{formatPrice(product)}</p>
          {isBundle && (
            <p className="text-xs text-muted-foreground">${standaloneValue(product)} if bought separately</p>
          )}
        </div>
        <DetailsButton code={product.code} />
        <AddToCartButton code={product.code} />
      </div>
    </article>
  )
}
