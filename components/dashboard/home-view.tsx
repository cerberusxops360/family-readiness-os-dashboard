'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowRight, Check, FileText, MapPin, Navigation, Package, Phone, Route, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  bags,
  contacts,
  documents,
  getAttentionItems,
  getReadinessScore,
  plans,
  sops,
  type PaceRole,
} from '@/lib/readiness-data'
import type { ViewId } from './dashboard-preview'

const PACE_STYLES: Record<PaceRole, string> = {
  Primary: 'bg-primary text-primary-foreground',
  Alternate: 'bg-secondary text-foreground',
  Contingency: 'bg-secondary text-muted-foreground',
  Emergency: 'bg-destructive/20 text-destructive',
}

const SOURCE_TO_VIEW: Record<string, ViewId> = {
  Documents: 'documents',
  Gear: 'gear',
  SOPs: 'sops',
  Plans: 'plans',
}

type HomeViewProps = {
  scenarioId: string
  onScenarioChange: (id: string) => void
  onNavigate: (view: ViewId) => void
}

export function HomeView({ scenarioId, onScenarioChange, onNavigate }: HomeViewProps) {
  const plan = plans.find((p) => p.id === scenarioId)!
  const sop = sops.find((s) => s.id === plan.sopId)!
  const callOrder = plan.contactIds.map((id) => contacts.find((c) => c.id === id)!)
  const grabDocs = plan.documentIds.map((id) => documents.find((d) => d.id === id)!)
  const grabBags = plan.bagIds.map((id) => bags.find((b) => b.id === id)!)

  return (
    <div>
      <div className="relative h-24 sm:h-28">
        <Image src="/images/cover.png" alt="" fill priority className="object-cover" sizes="(min-width: 768px) 900px, 100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
      </div>

      <div className="px-4 pb-6 sm:px-6">
        <div className="relative z-10 -mt-7 flex items-end gap-3">
          <div className="relative flex size-14 items-center justify-center rounded-xl border bg-background shadow-lg">
            <ShieldCheck className="size-7 text-primary" aria-hidden="true" />
          </div>
          <div className="pb-0.5">
            <h3 className="text-lg font-semibold tracking-tight sm:text-xl">Family Readiness OS</h3>
            <p className="text-xs text-muted-foreground">The Bishop household · 4 people, 1 dog</p>
          </div>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_15rem]">
          <section aria-labelledby="go-card-title" className="min-w-0">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h4 id="go-card-title" className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                If this happens
              </h4>
              <p className="text-[11px] text-muted-foreground">One tap builds the whole plan</p>
            </div>
            <div role="radiogroup" aria-label="Scenario" className="mt-2 flex flex-wrap gap-1.5">
              {plans.map((p) => {
                const active = p.id === scenarioId
                return (
                  <button
                    key={p.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => onScenarioChange(p.id)}
                    className={cn(
                      'flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition-colors',
                      active
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:border-muted-foreground/50 hover:text-foreground',
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        'size-1.5 rounded-full',
                        p.status === 'Ready' ? 'bg-success' : p.status === 'Draft' ? 'bg-muted-foreground' : 'bg-primary',
                        active && 'bg-primary-foreground',
                      )}
                    />
                    {p.scenario}
                  </button>
                )
              })}
            </div>

            <div key={plan.id} className="mt-4 grid animate-in gap-3 fade-in-0 slide-in-from-bottom-1 duration-300 sm:grid-cols-2">
              <GoBlock icon={Route} title="Where we go" source="Evacuation Plans">
                <dl className="space-y-2.5 text-sm">
                  <div className="flex gap-2.5">
                    <Navigation className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
                    <div>
                      <dt className="text-[11px] text-muted-foreground">Primary</dt>
                      <dd>{plan.primaryRoute}</dd>
                    </div>
                  </div>
                  <div className="flex gap-2.5">
                    <Navigation className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                    <div>
                      <dt className="text-[11px] text-muted-foreground">Alternate</dt>
                      <dd>{plan.alternateRoute}</dd>
                    </div>
                  </div>
                  <div className="flex gap-2.5 rounded-md bg-primary/10 p-2">
                    <MapPin className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
                    <div>
                      <dt className="text-[11px] text-primary">Rally point</dt>
                      <dd className="font-medium">{plan.rallyPoint}</dd>
                    </div>
                  </div>
                </dl>
              </GoBlock>

              <GoBlock icon={Phone} title="Who we call" source="Emergency Contacts">
                <ol className="space-y-2">
                  {callOrder.map((c, i) => (
                    <li key={c.id} className="flex items-center gap-2.5 text-sm">
                      <span className="w-3 font-mono text-[11px] text-muted-foreground">{i + 1}</span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate">{c.name}</p>
                        <p className="font-mono text-[11px] text-muted-foreground">{c.phone}</p>
                      </div>
                      <span className={cn('rounded px-1.5 py-0.5 font-mono text-[10px]', PACE_STYLES[c.pace])}>
                        {c.pace[0]}
                      </span>
                    </li>
                  ))}
                </ol>
              </GoBlock>

              <GoBlock icon={FileText} title="What we grab" source="Documents + Gear">
                <ul className="space-y-1.5 text-sm">
                  {grabDocs.map((d) => (
                    <li key={d.id} className="flex items-baseline justify-between gap-2">
                      <span className="truncate">
                        {d.person}&apos;s {d.type.toLowerCase()}
                      </span>
                      <span className="shrink-0 text-[11px] text-muted-foreground">{d.storage}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex flex-wrap gap-1.5 border-t pt-3">
                  {grabBags.map((b) => (
                    <span key={b.id} className="flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 text-xs">
                      <Package className="size-3 text-primary" aria-hidden="true" />
                      {b.name} · {b.owner}
                    </span>
                  ))}
                </div>
              </GoBlock>

              <SopChecklist key={sop.id} name={sop.name} owner={sop.owner} steps={sop.steps} />
            </div>
          </section>

          <aside aria-labelledby="attention-title" className="space-y-3">
            <ReadinessRing score={getReadinessScore()} />
            <div className="rounded-xl border bg-background/40 p-3">
              <h4 id="attention-title" className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Needs attention
              </h4>
              <ul className="mt-2 space-y-1">
                {getAttentionItems()
                  .slice(0, 5)
                  .map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => onNavigate(SOURCE_TO_VIEW[item.source])}
                        className="group flex w-full items-start gap-2 rounded-md p-1.5 text-left hover:bg-accent/60"
                      >
                        <span
                          aria-hidden="true"
                          className={cn(
                            'mt-1.5 size-1.5 shrink-0 rounded-full',
                            item.severity === 'high' ? 'bg-destructive' : 'bg-primary',
                          )}
                        />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm">{item.label}</span>
                          <span className="block text-[11px] text-muted-foreground">{item.detail}</span>
                        </span>
                        <ArrowRight
                          className="mt-1 size-3 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                          aria-hidden="true"
                        />
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

function GoBlock({
  icon: Icon,
  title,
  source,
  children,
}: {
  icon: typeof Route
  title: string
  source: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-xl border bg-background/40 p-3.5">
      <div className="mb-3 flex items-center gap-2">
        <Icon className="size-4 text-primary" aria-hidden="true" />
        <h5 className="text-sm font-medium">{title}</h5>
        <span className="ml-auto truncate font-mono text-[10px] text-muted-foreground">{source}</span>
      </div>
      {children}
    </div>
  )
}

function SopChecklist({ name, owner, steps }: { name: string; owner: string; steps: string[] }) {
  const [done, setDone] = useState<Set<number>>(new Set())
  const progress = Math.round((done.size / steps.length) * 100)

  function toggle(i: number) {
    setDone((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  return (
    <div className="rounded-xl border bg-background/40 p-3.5">
      <div className="mb-1 flex items-center gap-2">
        <ShieldCheck className="size-4 text-primary" aria-hidden="true" />
        <h5 className="truncate text-sm font-medium">{name}</h5>
        <span className="ml-auto shrink-0 font-mono text-[10px] text-muted-foreground">Family SOPs</span>
      </div>
      <p className="mb-2.5 text-[11px] text-muted-foreground">Owner: {owner}</p>
      <div className="mb-2.5 h-1 overflow-hidden rounded-full bg-secondary" aria-hidden="true">
        <div className="h-full rounded-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>
      <ul className="space-y-1">
        {steps.map((step, i) => {
          const checked = done.has(i)
          return (
            <li key={step}>
              <button
                type="button"
                role="checkbox"
                aria-checked={checked}
                onClick={() => toggle(i)}
                className="flex w-full items-start gap-2 rounded px-1 py-0.5 text-left text-sm hover:bg-accent/50"
              >
                <span
                  className={cn(
                    'mt-0.5 flex size-3.5 shrink-0 items-center justify-center rounded-sm border transition-colors',
                    checked ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground/50',
                  )}
                >
                  {checked && <Check className="size-2.5" strokeWidth={3} aria-hidden="true" />}
                </span>
                <span className={cn(checked && 'text-muted-foreground line-through')}>{step}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function ReadinessRing({ score }: { score: number }) {
  const radius = 28
  const circumference = 2 * Math.PI * radius
  return (
    <div className="flex items-center gap-3 rounded-xl border bg-background/40 p-3">
      <svg viewBox="0 0 72 72" className="size-16 -rotate-90" role="img" aria-label={`Readiness ${score} percent`}>
        <circle cx="36" cy="36" r={radius} fill="none" strokeWidth="6" className="stroke-secondary" />
        <circle
          cx="36"
          cy="36"
          r={radius}
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - score / 100)}
          className="stroke-primary"
        />
      </svg>
      <div>
        <p className="text-2xl font-semibold tabular-nums">{score}%</p>
        <p className="text-[11px] leading-snug text-muted-foreground">Household readiness · from expiries, drills & reviews</p>
      </div>
    </div>
  )
}
