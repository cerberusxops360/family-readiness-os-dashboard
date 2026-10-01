'use client'

import { useState } from 'react'
import { ArrowRight, Cloud, Lock, Paperclip } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  bags,
  contacts,
  daysSince,
  daysUntil,
  documents,
  formatDate,
  gear,
  plans,
  sops,
  type GearItem,
} from '@/lib/readiness-data'

function ViewHeader({ title, view, description }: { title: string; view: string; description: string }) {
  return (
    <div className="border-b px-4 py-4 sm:px-6">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        <span className="rounded-md bg-secondary px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          {view}
        </span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

function ExpiryBadge({ date }: { date: string | null }) {
  if (!date) return <span className="text-xs text-muted-foreground">No expiry</span>
  const days = daysUntil(date)
  const tone = days <= 30 ? 'bg-destructive/15 text-destructive' : days <= 90 ? 'bg-primary/15 text-primary' : 'text-muted-foreground'
  return (
    <span className={cn('rounded px-1.5 py-0.5 font-mono text-[11px] whitespace-nowrap', tone)}>
      {days <= 90 ? `${days}d left` : formatDate(date)}
    </span>
  )
}

const STORAGE_ICON = { Safe: Lock, 'Drive link': Cloud, Upload: Paperclip }

export function DocumentsView() {
  const people = Array.from(new Set(documents.map((d) => d.person)))
  return (
    <div>
      <ViewHeader
        title="Critical Documents"
        view="Gallery · by person"
        description="Where every vital record lives, and when it needs renewing."
      />
      <div className="mx-4 mt-4 flex items-start gap-2 rounded-lg border border-primary/25 bg-primary/5 p-3 text-xs leading-relaxed sm:mx-6">
        <Cloud className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
        <p>
          Large scans (deeds, policies) link out to Google Drive or Dropbox, so the template works fully on a{' '}
          <strong className="font-medium">free Notion account</strong>, with no 5 MB upload limit to worry about.
        </p>
      </div>
      <div className="space-y-5 p-4 sm:p-6">
        {people.map((person) => (
          <section key={person}>
            <h4 className="mb-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{person}</h4>
            <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
              {documents
                .filter((d) => d.person === person)
                .map((d) => {
                  const Icon = STORAGE_ICON[d.storage]
                  return (
                    <article key={d.id} className="rounded-lg border bg-background/40 p-3">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium">{d.type}</p>
                        <ExpiryBadge date={d.expires} />
                      </div>
                      <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Icon className="size-3 shrink-0" aria-hidden="true" />
                        <span className="truncate">{d.location}</span>
                      </p>
                    </article>
                  )
                })}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

const PACE_ORDER = ['Primary', 'Alternate', 'Contingency', 'Emergency']

export function ContactsView() {
  const sorted = [...contacts].sort((a, b) => PACE_ORDER.indexOf(a.pace) - PACE_ORDER.indexOf(b.pace))
  return (
    <div>
      <ViewHeader title="Emergency Contacts" view="Table · pinned" description="Who to call, in what order, and what each person is responsible for." />
      <div className="overflow-x-auto p-4 sm:p-6">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b text-left font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              <th scope="col" className="py-2 pr-3 font-normal">Name</th>
              <th scope="col" className="py-2 pr-3 font-normal">Relationship</th>
              <th scope="col" className="py-2 pr-3 font-normal">Phone</th>
              <th scope="col" className="py-2 pr-3 font-normal">Role</th>
              <th scope="col" className="py-2 font-normal">Tier</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((c) => (
              <tr key={c.id} className="border-b border-border/60 last:border-0">
                <td className="py-2.5 pr-3 font-medium">{c.name}</td>
                <td className="py-2.5 pr-3 text-muted-foreground">{c.relationship}</td>
                <td className="py-2.5 pr-3 font-mono text-xs">{c.phone}</td>
                <td className="py-2.5 pr-3 text-muted-foreground">{c.role}</td>
                <td className="py-2.5">
                  <span
                    className={cn(
                      'rounded px-1.5 py-0.5 text-xs',
                      c.pace === 'Primary' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground',
                    )}
                  >
                    {c.pace}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function PlansView({ onOpenScenario }: { onOpenScenario: (id: string) => void }) {
  return (
    <div>
      <ViewHeader title="Evacuation Plans" view="Board · by scenario" description="Primary and alternate routes, rally points, and the go-bags each plan assumes." />
      <div className="grid gap-3 p-4 sm:grid-cols-2 sm:p-6 xl:grid-cols-4">
        {plans.map((p) => (
          <article key={p.id} className="flex flex-col rounded-lg border bg-background/40 p-3">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-sm font-medium">{p.scenario}</h4>
              <span
                className={cn(
                  'rounded px-1.5 py-0.5 text-[11px]',
                  p.status === 'Ready' ? 'bg-success/15 text-success' : p.status === 'Draft' ? 'bg-secondary text-muted-foreground' : 'bg-primary/15 text-primary',
                )}
              >
                {p.status}
              </span>
            </div>
            <dl className="mt-3 space-y-2 text-xs">
              <div>
                <dt className="text-muted-foreground">Primary</dt>
                <dd>{p.primaryRoute}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Alternate</dt>
                <dd>{p.alternateRoute}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Rally point</dt>
                <dd>{p.rallyPoint}</dd>
              </div>
            </dl>
            <p className="mt-3 text-[11px] text-muted-foreground">Reviewed {formatDate(p.lastReviewed)}</p>
            <button
              type="button"
              onClick={() => onOpenScenario(p.id)}
              className="mt-3 flex items-center gap-1 self-start text-xs text-primary hover:underline"
            >
              Open go card <ArrowRight className="size-3" aria-hidden="true" />
            </button>
          </article>
        ))}
      </div>
    </div>
  )
}

const CATEGORIES: ('All' | GearItem['category'])[] = ['All', 'Water', 'Food', 'Medical', 'Power', 'Docs & Cash', 'Pet']

export function GearView() {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>('All')
  const rows = category === 'All' ? gear : gear.filter((g) => g.category === category)
  return (
    <div>
      <ViewHeader title="Gear & Go-Bag Inventory" view="Table · by category" description="What's packed, which bag it's in, and what expires next." />
      <div className="flex flex-wrap gap-1.5 px-4 pt-4 sm:px-6" role="group" aria-label="Filter by category">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={category === c}
            onClick={() => setCategory(c)}
            className={cn(
              'rounded-full border px-2.5 py-0.5 text-xs transition-colors',
              category === c ? 'border-primary bg-primary/15 text-primary' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto p-4 sm:p-6">
        <table className="w-full min-w-[520px] text-sm">
          <thead>
            <tr className="border-b text-left font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              <th scope="col" className="py-2 pr-3 font-normal">Item</th>
              <th scope="col" className="py-2 pr-3 font-normal">Category</th>
              <th scope="col" className="py-2 pr-3 text-right font-normal">Qty</th>
              <th scope="col" className="py-2 pr-3 font-normal">Bag</th>
              <th scope="col" className="py-2 font-normal">Expires</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((g) => {
              const bag = bags.find((b) => b.id === g.bagId)!
              return (
                <tr key={g.id} className="border-b border-border/60 last:border-0">
                  <td className="py-2.5 pr-3 font-medium">{g.item}</td>
                  <td className="py-2.5 pr-3 text-muted-foreground">{g.category}</td>
                  <td className="py-2.5 pr-3 text-right font-mono text-xs tabular-nums">{g.category === 'Docs & Cash' ? `$${g.quantity}` : g.quantity}</td>
                  <td className="py-2.5 pr-3 text-muted-foreground">
                    {bag.name} · {bag.owner}
                  </td>
                  <td className="py-2.5">
                    <ExpiryBadge date={g.expires} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function SopsView() {
  return (
    <div>
      <ViewHeader title="Family SOPs" view="Gallery · cards" description="Step-by-step procedures, who owns them, and when you last practiced." />
      <div className="grid gap-3 p-4 sm:grid-cols-2 sm:p-6">
        {sops.map((s) => {
          const stale = daysSince(s.lastDrilled) > 180
          return (
            <article key={s.id} className="rounded-lg border bg-background/40 p-3.5">
              <h4 className="text-sm font-medium">{s.name}</h4>
              <p className="mt-1 text-xs text-muted-foreground">When: {s.trigger}</p>
              <ol className="mt-3 space-y-1 text-xs">
                {s.steps.map((step, i) => (
                  <li key={step} className="flex gap-2">
                    <span className="w-3 shrink-0 font-mono text-muted-foreground">{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
              <div className="mt-3 flex items-center justify-between border-t pt-2.5 text-[11px] text-muted-foreground">
                <span>Owner: {s.owner}</span>
                <span className={cn(stale && 'text-primary')}>Drilled {formatDate(s.lastDrilled)}</span>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
