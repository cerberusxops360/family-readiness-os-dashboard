'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { getAttentionItems, plans, sops } from '@/lib/readiness-data'

const attention = getAttentionItems().length

const PHASES = [
  {
    id: 'assess',
    label: 'ASSESS',
    title: 'See the field',
    body: 'The needs-attention view surfaces expiring passports, stale water, and procedures nobody has drilled, before they become a problem on the worst day.',
    proof: `${attention} items flagged in the example household`,
    uses: ['Critical Documents', 'Gear & Go-Bags'],
    position: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2',
  },
  {
    id: 'plan',
    label: 'PLAN',
    title: 'Set the plan',
    body: 'Each scenario links a primary and alternate route, a rally point, a PACE contact tree, the documents to grab and the bags to carry.',
    proof: `${plans.length} scenarios linked across five databases`,
    uses: ['Evacuation Plans', 'Emergency Contacts'],
    position: 'top-1/2 right-0 translate-x-1/2 -translate-y-1/2',
  },
  {
    id: 'execute',
    label: 'EXECUTE',
    title: 'Move',
    body: 'One tap collapses a plan into a go card: grab, call, go. The printed binder and wallet cards carry the same plan when phones fail.',
    proof: 'Go cards in Notion, on paper, and in the wallet',
    uses: ['Family SOPs', 'Printable Binder'],
    position: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2',
  },
  {
    id: 'review',
    label: 'REVIEW',
    title: 'After action',
    body: 'Short quarterly drills and a fifteen-minute after-action review feed what actually happened back into the plan, so it improves instead of decaying.',
    proof: `${sops.length} procedures with last-drilled dates`,
    uses: ['Drill and AAR Kit', 'Family Command Updates'],
    position: 'top-1/2 left-0 -translate-x-1/2 -translate-y-1/2',
  },
] as const

export function OperatingLoop() {
  const [index, setIndex] = useState(0)
  const phase = PHASES[index]

  return (
    <section id="how-it-works" aria-labelledby="loop-title" className="border-y">
      <div className="mx-auto grid max-w-[1220px] items-center gap-16 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
        <div>
          <p className="font-mono text-xs font-medium tracking-[0.18em] text-primary">ONE OPERATING LOOP</p>
          <h2 id="loop-title" className="mt-4 text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            See the threat. Set the plan. Move. Review.
          </h2>
          <p className="mt-5 max-w-lg text-pretty leading-relaxed text-muted-foreground">
            Plans fail because they sit in a drawer. Every Field Ready product supports one loop that keeps the family
            plan current, rehearsed and easy to execute under stress.
          </p>

          <div aria-live="polite" className="mt-8 rounded-lg border bg-card p-6">
            <p className="font-mono text-[11px] tracking-[0.16em] text-primary">{phase.label}</p>
            <p className="mt-1 text-2xl font-semibold">{phase.title}</p>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{phase.body}</p>
            <p className="mt-4 font-mono text-xs text-info">{phase.proof}</p>
            <ul aria-label="Handled by" className="mt-4 flex flex-wrap gap-1.5">
              {phase.uses.map((u) => (
                <li key={u} className="rounded-sm border px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                  {u}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[22rem] px-10 sm:max-w-md">
          <div className="relative aspect-square">
            <div className="absolute inset-0 rounded-full border-2 border-border" aria-hidden="true" />
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary transition-transform duration-300 ease-out"
              style={{ transform: `rotate(${index * 90}deg)` }}
            />
            <div className="absolute inset-[18%] rounded-full border border-dashed" aria-hidden="true" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <p className="font-mono text-6xl font-semibold tracking-tight tabular-nums sm:text-7xl">360</p>
              <p className="mt-1 font-mono text-[11px] tracking-[0.2em] text-muted-foreground">FAMILY READINESS</p>
            </div>

            <div role="tablist" aria-label="Operating loop phases" className="contents">
              {PHASES.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  onClick={() => setIndex(i)}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') setIndex((i + 1) % 4)
                    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') setIndex((i + 3) % 4)
                  }}
                  tabIndex={i === index ? 0 : -1}
                  className={cn(
                    'absolute flex h-11 min-w-24 items-center justify-center rounded-md border px-3 font-mono text-xs font-semibold tracking-[0.14em] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                    p.position,
                    i === index
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'bg-background text-muted-foreground hover:border-foreground/40 hover:text-foreground',
                  )}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
