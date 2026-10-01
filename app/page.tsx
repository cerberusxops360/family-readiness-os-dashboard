import { DashboardPreview } from '@/components/dashboard/dashboard-preview'
import { FinalCta, Footer, Hero, Pricing, WhyPlansFail } from '@/components/landing/sections'

export default function Page() {
  return (
    <>
      <main>
        <Hero />
        <section aria-labelledby="preview-title" className="mx-auto mt-16 max-w-6xl px-3 sm:px-5">
          <h2 id="preview-title" className="sr-only">
            Dashboard preview
          </h2>
          <p className="mb-3 text-center text-xs text-muted-foreground">
            Try it: pick a scenario, check off steps, or open any database.
          </p>
          <DashboardPreview />
        </section>
        <WhyPlansFail />
        <Pricing />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
