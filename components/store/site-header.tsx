'use client'

import { useState } from 'react'
import { Menu, Search, ShoppingBag, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCart } from './cart-context'

const NAV = [
  { href: '#store', label: 'Store' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#founder', label: 'Founder' },
  { href: '#gear', label: 'Recommended gear' },
]

const utility =
  'inline-flex size-11 items-center justify-center rounded-md border text-foreground transition-colors duration-150 hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'

export function BrandMark() {
  return (
    <span className="flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className="relative flex size-8 items-center justify-center rounded-full border-2 border-foreground/80"
      >
        <span className="absolute inset-[-2px] rounded-full border-2 border-transparent border-t-primary" />
        <span className="size-1.5 rounded-full bg-primary" />
      </span>
      <span className="font-mono text-sm font-semibold tracking-[0.2em]">FIELD READY</span>
    </span>
  )
}

export function SiteHeader() {
  const { items, openCart } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  function focusSearch() {
    setMenuOpen(false)
    document.getElementById('store')?.scrollIntoView()
    document.getElementById('catalog-search')?.focus({ preventScroll: true })
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1220px] items-center gap-6 px-4 sm:px-6">
        <a href="#top" className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
          <BrandMark />
          <span className="sr-only">Field Ready home</span>
        </a>

        <nav aria-label="Primary" className="ml-4 hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button type="button" onClick={focusSearch} className={utility}>
            <Search className="size-5" aria-hidden="true" />
            <span className="sr-only">Search the kit</span>
          </button>
          <button type="button" onClick={openCart} className={cn(utility, 'relative')}>
            <ShoppingBag className="size-5" aria-hidden="true" />
            <span className="sr-only">Open cart, {items.length} {items.length === 1 ? 'item' : 'items'}</span>
            <span
              aria-hidden="true"
              className={cn(
                'absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full font-mono text-[11px] font-semibold',
                items.length ? 'bg-primary text-primary-foreground' : 'border bg-card text-muted-foreground',
              )}
            >
              {items.length}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className={cn(utility, 'lg:hidden')}
          >
            {menuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-nav" aria-label="Primary mobile" className="border-t lg:hidden">
          <ul className="mx-auto flex max-w-[1220px] flex-col px-2 py-2">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex h-11 items-center rounded-md px-3 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
