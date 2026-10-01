import { ArrowRight, BookOpenCheck, Compass, Download, LayoutDashboard } from 'lucide-react'
import { getAttentionItems, plans } from '@/lib/readiness-data'
import { AddToCartButton, DetailsButton } from './product-actions'

const TRUST = [
  { icon: Compass, label: 'Built on field-tested planning principles' },
  { icon: BookOpenCheck, label: 'Clear setup and drill guidance' },
  { icon: LayoutDashboard, label: 'Works on a free Notion account' },
  { icon: Download, label: 'Instant digital delivery at launch' },
]

const STATUS_STYLE: Record<string, string> = {
  Ready: 'text-info',
  'Review due': 'text-primary',
  Draft: 'text-muted-foreground',
}

export function Hero() {
  const ready = plans.filter((p) => p.status === 'Ready').length
  const review = plans.length - ready
  const attention = getAttentionItems().length

  return (
    <section id="top" aria-labelledby="hero-title" className="border-b">
      <div className="mx-auto grid max-w-[1220px] gap-12 px-4 pt-16 pb-14 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:pt-24">
        <div className="flex flex-col justify-center lg:col-span-7">
          <p className="font-mono text-xs font-medium tracking-[0.18em] text-primary">FAMILY READINESS SYSTEMS</p>
          <h1
            id="hero-title"
            className="mt-5 text-balance text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Make the next move obvious <span className="text-primary">before the worst day.</span>
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Notion workspaces, field guides, and print kits that turn special-operations planning discipline into a
            household plan anyone in the family can run.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#store"
              className="inline-flex h-12 items-center gap-2 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors duration-150 hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Explore the kit
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex h-12 items-center rounded-md border px-5 text-sm font-semibold transition-colors duration-150 hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              How it works
            </a>
          </div>
        </div>

        <aside aria-label="Featured system" className="lg:col-span-5">
          <div className="rounded-lg border bg-card">
            <div className="flex items-center justify-between border-b px-5 py-3">
              <p className="font-mono text-[11px] font-medium tracking-[0.16em] text-muted-foreground">FEATURED SYSTEM</p>
              <p className="flex items-center gap-2 font-mono text-[11px] font-medium tracking-[0.12em] text-info">
                <span className="size-1.5 rounded-full bg-info" aria-hidden="true" />
                WAITLIST OPEN
              </p>
            </div>

            <div className="p-5">
              <p className="font-mono text-[11px] tracking-[0.16em] text-primary">FAMILY READINESS OS</p>
              <p className="mt-1 text-xl font-semibold">Readiness view</p>
              <p className="text-sm text-muted-foreground">Plans, documents, go-bags, drills</p>

              <dl className="mt-5 grid grid-cols-3 gap-px overflow-hidden rounded-md border bg-border">
                {[
                  { label: 'READY', value: ready },
                  { label: 'REVIEW', value: review },
                  { label: 'ATTENTION', value: attention },
                ].map((s) => (
                  <div key={s.label} className="flex flex-col gap-1 bg-background px-3 py-3">
                    <dt className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground">{s.label}</dt>
                    <dd className="font-mono text-3xl font-semibold tabular-nums">{String(s.value).padStart(2, '0')}</dd>
                  </div>
                ))}
              </dl>

              <p className="mt-5 font-mono text-[10px] tracking-[0.14em] text-muted-foreground">SCENARIO STACK</p>
              <ul className="mt-2 flex flex-col divide-y rounded-md border">
                {plans.map((p) => (
                  <li key={p.id} className="flex items-center justify-between gap-3 px-3 py-2 text-sm">
                    <span className="truncate">{p.scenario}</span>
                    <span className={`shrink-0 font-mono text-[11px] uppercase tracking-wider ${STATUS_STYLE[p.status]}`}>
                      {p.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap items-center gap-3 border-t px-5 py-4">
              <div className="mr-auto">
                <p className="text-sm font-semibold">Family Readiness OS</p>
                <p className="text-xs text-muted-foreground">Notion system + setup guide</p>
              </div>
              <p className="font-mono text-2xl font-semibold tabular-nums">$39</p>
              <DetailsButton code="FR NT 01" />
              <AddToCartButton code="FR NT 01" />
            </div>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Counts come from the example household in the live preview below.</p>
        </aside>
      </div>

      <ul className="mx-auto grid max-w-[1220px] border-t sm:grid-cols-2 lg:grid-cols-4">
        {TRUST.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-3 border-b px-4 py-4 text-sm sm:px-6 lg:border-b-0 lg:border-r lg:last:border-r-0">
            <Icon className="size-5 shrink-0 text-primary" aria-hidden="true" />
            {label}
          </li>
        ))}
      </ul>
    </section>
  )
}
