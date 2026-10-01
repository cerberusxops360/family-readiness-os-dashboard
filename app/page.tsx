import { CartProvider } from '@/components/store/cart-context'
import { Hero } from '@/components/store/hero'
import { OperatingLoop } from '@/components/store/operating-loop'
import {
  FounderSection,
  GearSection,
  PreviewSection,
  ReleaseNotes,
  SiteFooter,
  StoreSection,
} from '@/components/store/sections'
import { SiteHeader } from '@/components/store/site-header'
import { CartDrawer, ProductDialog } from '@/components/store/store-dialogs'

export default function Page() {
  return (
    <CartProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <PreviewSection />
        <StoreSection />
        <OperatingLoop />
        <FounderSection />
        <GearSection />
        <ReleaseNotes />
      </main>
      <SiteFooter />
      <ProductDialog />
      <CartDrawer />
    </CartProvider>
  )
}
