import { Suspense } from 'react'
import Image from 'next/image'
import { BadgeDollarSign, ExternalLink, Eye, Layers } from 'lucide-react'
import { DashboardPreview } from '@/components/dashboard/dashboard-preview'
import { WaitlistForm } from '@/components/landing/waitlist-form'
import { Catalog } from './catalog'
import { BrandMark } from './site-header'

function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-xs font-medium tracking-[0.18em] text-primary">{children}</p>
}

export function PreviewSection() {
  return (
    <section aria-labelledby="preview-title" className="mx-auto max-w-[1220px] px-4 py-20 sm:px-6">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <Kicker>INTERACTIVE PREVIEW</Kicker>
          <h2 id="preview-title" className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Run a scenario before you buy.
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
          Pick a scenario, check off steps, or open any database. This is the real structure, filled with an example
          household.
        </p>
      </div>
      <DashboardPreview />
    </section>
  )
}

export function StoreSection() {
  return (
    <section id="store" aria-labelledby="store-title" className="paper">
      <div className="mx-auto max-w-[1220px] px-4 py-20 sm:px-6 lg:py-28">
        <div className="mb-10 max-w-2xl">
          <Kicker>THE READINESS KIT</Kicker>
          <h2 id="store-title" className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Systems your family can actually run.
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Owned products, sold and supported by Field Ready. Every product states what you receive, what it
            requires, how it updates, and who it is not for, before you reach checkout.
          </p>
        </div>
        <Suspense fallback={<div className="h-96 rounded-lg border bg-card" />}>
          <Catalog />
        </Suspense>
      </div>
    </section>
  )
}

const FACTS = [
  { label: 'OPERATIONAL', text: 'Retired U.S. Navy SEAL officer, mission commander, and instructor.' },
  { label: 'BUSINESS', text: 'Founder and operator turning practical frameworks into usable products.' },
  { label: 'DESIGN INTENT', text: 'Clear decisions, lower cognitive load, and drills a ten-year-old can follow.' },
]

export function FounderSection() {
  return (
    <section id="founder" aria-labelledby="founder-title" className="paper border-b">
      <div className="mx-auto grid max-w-[1220px] gap-12 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:py-28">
        <div className="lg:col-span-6">
          <Kicker>FOUNDER-LED, BUILT TO OUTLAST THE FOUNDER</Kicker>
          <h2 id="founder-title" className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Experience only matters when it transfers to the people at home.
          </h2>
          <div className="mt-6 flex max-w-xl flex-col gap-4 leading-relaxed text-muted-foreground">
            <p>
              Field Ready was founded by Adam Bishop, a retired U.S. Navy SEAL officer, former mission commander,
              instructor, and business operator. Family Readiness OS applies the same discipline used to plan
              operations: primary, alternate, contingency, emergency.
            </p>
            <p>
              It does that without turning your home into an operations center. The story explains why the system
              exists. The system earns trust by working on an ordinary Tuesday, and on the worst day.
            </p>
          </div>
        </div>

        <figure className="night rounded-lg border bg-background p-6 text-foreground sm:p-8 lg:col-span-6">
          <BrandMark />
          <blockquote className="mt-8 text-balance text-2xl font-semibold leading-snug sm:text-3xl">
            Built from operational planning, not prepper theater.
          </blockquote>
          <dl className="mt-8 flex flex-col divide-y border-t">
            {FACTS.map((f) => (
              <div key={f.label} className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-4">
                <dt className="font-mono text-[11px] tracking-[0.16em] text-primary">{f.label}</dt>
                <dd className="text-sm leading-relaxed text-muted-foreground">{f.text}</dd>
              </div>
            ))}
          </dl>
        </figure>
      </div>
    </section>
  )
}

const STANDARDS = [
  { icon: Layers, title: 'Separate product type', text: 'Recommendations never enter the Field Ready cart or inherit our delivery promises.' },
  { icon: Eye, title: 'Disclosed before you click', text: 'The commission disclosure sits next to the link, not in a footer.' },
  { icon: BadgeDollarSign, title: 'Use before commission', text: 'Only gear that solves a documented problem, with its limits stated.' },
]

export function GearSection() {
  return (
    <section id="gear" aria-labelledby="gear-title" className="paper">
      <div className="mx-auto grid max-w-[1220px] gap-12 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:py-28">
        <div className="lg:col-span-5">
          <Kicker>FUTURE CATALOG · AFFILIATE STANDARDS</Kicker>
          <h2 id="gear-title" className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Recommended gear, without hidden incentives.
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Your go-bags need real equipment. When we point you to it, the link stays visibly separate from what we
            sell.
          </p>
          <ul className="mt-8 flex flex-col gap-5">
            {STANDARDS.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-md border bg-card">
                  <Icon className="size-5 text-primary" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-semibold">{title}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4 lg:col-span-7">
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg border">
            <Image
              src="/images/go-bag-flatlay.png"
              alt="Go-bag contents laid out in a grid: weather radio, water pouches, first aid kit, headlamp, batteries, map and a document pouch"
              fill
              sizes="(min-width: 1024px) 700px, 100vw"
              className="object-cover"
            />
          </div>

          <article aria-labelledby="affiliate-example" className="rounded-lg border-2 border-dashed bg-card p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] tracking-[0.14em]">
              <span className="font-medium text-info">AFFILIATE · SOLD BY A THIRD PARTY</span>
              <span className="text-muted-foreground">EXAMPLE LISTING FORMAT</span>
            </div>
            <h3 id="affiliate-example" className="mt-3 text-lg font-semibold">
              Weather alert radio with hand crank
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Why it is here: alerts still arrive when cell networks are saturated. Limitation: reception varies by
              region, so test it at home first.
            </p>
            <div className="mt-4 flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-relaxed text-muted-foreground sm:max-w-xs">
                Field Ready may earn a commission. The merchant handles price, delivery, returns and support.
              </p>
              <button
                type="button"
                disabled
                className="inline-flex h-11 shrink-0 cursor-not-allowed items-center gap-2 rounded-md border px-4 text-sm font-semibold text-muted-foreground"
              >
                View recommended gear
                <ExternalLink className="size-4" aria-hidden="true" />
                <span className="sr-only">(opens after launch)</span>
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

export function ReleaseNotes() {
  return (
    <section aria-labelledby="release-title" className="border-b">
      <div className="mx-auto grid max-w-[1220px] gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24">
        <div>
          <Kicker>RELEASE NOTES</Kicker>
          <h2 id="release-title" className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Receive the next field release.
          </h2>
          <p className="mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">
            Launch pricing, new scenario checklists, and concise operating notes. No daily noise.
          </p>
        </div>
        <WaitlistForm />
      </div>
    </section>
  )
}

const FOOTER_LINKS = [
  { title: 'Store', links: [['All products', '#store'], ['Complete bundle', '#store'], ['Recommended gear', '#gear']] },
  { title: 'Field Ready', links: [['How it works', '#how-it-works'], ['Founder', '#founder'], ['Release notes', '#top']] },
  { title: 'Customer care', links: [['Support', 'mailto:support@fieldready.co'], ['Refund policy', '#store'], ['Affiliate disclosure', '#gear']] },
]

export function SiteFooter() {
  return (
    <footer>
      <div className="mx-auto grid max-w-[1220px] gap-10 px-4 py-14 sm:px-6 md:grid-cols-12">
        <div className="md:col-span-5">
          <BrandMark />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Family readiness systems for decisive moments at home.
          </p>
        </div>
        {FOOTER_LINKS.map((col) => (
          <nav key={col.title} aria-label={col.title} className="md:col-span-2">
            <p className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">{col.title}</p>
            <ul className="mt-3 flex flex-col gap-2 text-sm">
              {col.links.map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="hover:text-primary">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t">
        <div className="mx-auto flex max-w-[1220px] flex-col gap-2 px-4 py-6 text-xs leading-relaxed text-muted-foreground sm:px-6">
          <p>
            Field Ready products are organizational tools, not professional emergency management, legal, or medical
            advice. Follow official guidance from local authorities during an emergency.
          </p>
          <p>
            Not affiliated with, endorsed by, or sponsored by the U.S. Navy, the Department of Defense, or any
            government agency. Notion is a trademark of Notion Labs, Inc.
          </p>
          <p>© 2026 Field Ready</p>
        </div>
      </div>
    </footer>
  )
}
