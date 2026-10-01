import { Check, CircleDollarSign, Copy, FileWarning, RefreshCw, ShieldCheck } from 'lucide-react'
import { WaitlistForm } from './waitlist-form'

export function Hero() {
  return (
    <section className="mx-auto max-w-3xl px-5 pt-16 text-center sm:pt-24">
      <p className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        <ShieldCheck className="size-3.5 text-primary" aria-hidden="true" />
        Family Readiness OS - Notion template
      </p>
      <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
        The family emergency system built the way special operations plans for{' '}
        <span className="text-primary">worst cases</span>
      </h1>
      <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
        Documents, contacts, routes, go-bags and procedures in one Notion home page. Pick what&apos;s happening and it
        tells you exactly what to grab, who to call, and where to go.
      </p>
      <WaitlistForm className="mx-auto mt-8 max-w-md text-left" />
      <ul className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
        {['Works on a free Notion account', 'Duplicate in one click', '5 linked databases, one home page'].map((t) => (
          <li key={t} className="flex items-center gap-1.5">
            <Check className="size-3.5 text-primary" aria-hidden="true" />
            {t}
          </li>
        ))}
      </ul>
    </section>
  )
}

const FAILURES = [
  { icon: FileWarning, title: 'Scattered', body: "Passports in a drawer, policy in an inbox, routes in someone's head. Every database here links to the others." },
  { icon: RefreshCw, title: 'Never updated', body: 'Expiring documents, stale water, and un-drilled procedures surface automatically in "Needs attention."' },
  { icon: Copy, title: 'Too long to use', body: 'In the moment, nobody reads a binder. One tap on a scenario collapses everything into a single go card.' },
]

export function WhyPlansFail() {
  return (
    <section aria-labelledby="why-title" className="mx-auto max-w-5xl px-5 py-20">
      <h2 id="why-title" className="text-center font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        Why most family plans fail
      </h2>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {FAILURES.map(({ icon: Icon, title, body }) => (
          <div key={title} className="rounded-xl border bg-card p-5">
            <Icon className="size-5 text-primary" aria-hidden="true" />
            <h3 className="mt-4 font-medium">{title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

const FEATURES = [
  'Critical document vault',
  'Emergency contact tree',
  'Evacuation routes & rally points',
  'Gear inventory + go-bag checklist',
  'Family SOPs with drill history',
]

export function Pricing() {
  return (
    <section aria-labelledby="pricing-title" className="mx-auto max-w-2xl px-5 pb-20">
      <div className="text-center">
        <h2 id="pricing-title" className="text-3xl font-semibold tracking-tight">
          Launch pricing
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          One-time payment, yours to keep. Waitlist members get 25% off with their code at checkout.
        </p>
      </div>
      <div className="mt-10 rounded-xl border border-primary/50 bg-card p-8 text-center ring-1 ring-primary/20">
        <h3 className="font-medium">Family Readiness OS</h3>
        <p className="mt-3 flex items-baseline justify-center gap-1.5">
          <span className="text-4xl font-semibold tabular-nums">$79</span>
          <span className="text-xs text-muted-foreground">one-time</span>
        </p>
        <ul className="mx-auto mt-6 max-w-xs space-y-2 text-left text-sm">
          {FEATURES.map((item) => (
            <li key={item} className="flex gap-2">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <span className="text-muted-foreground">{item}</span>
            </li>
          ))}
        </ul>
        <a
          href="/api/checkout"
          className="mt-7 inline-flex w-full items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 sm:w-auto sm:px-8"
        >
          Buy now - $79
        </a>
      </div>
      <p className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <CircleDollarSign className="size-3.5" aria-hidden="true" />
        Digital product. Refund policy is stated in full at checkout.
      </p>
    </section>
  )
}

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="mx-auto max-w-2xl px-5 pb-24 text-center">
      <h2 id="cta-title" className="text-balance text-3xl font-semibold tracking-tight">
        Set it up once. Know it&apos;s ready when it counts.
      </h2>
      <WaitlistForm className="mx-auto mt-8 max-w-md text-left" />
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-5xl space-y-3 px-5 py-8 text-xs leading-relaxed text-muted-foreground">
        <p>
          This template is an organizational tool, not professional emergency management, legal, or medical advice.
          Verify local evacuation routes and requirements with official sources.
        </p>
        <p>
          Not affiliated with, endorsed by, or sponsored by the U.S. Navy, the Department of Defense, or any government
          agency. Notion is a trademark of Notion Labs, Inc.
        </p>
        <p>(c) 2026 Family Readiness OS</p>
      </div>
    </footer>
  )
}

