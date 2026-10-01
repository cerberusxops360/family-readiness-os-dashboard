'use client'

import { useState } from 'react'
import { BookOpenCheck, FileText, Home, Map, Package, Phone, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { contacts, documents, gear, plans, sops } from '@/lib/readiness-data'
import { HomeView } from './home-view'
import { ContactsView, DocumentsView, GearView, PlansView, SopsView } from './database-views'

export type ViewId = 'home' | 'documents' | 'contacts' | 'plans' | 'gear' | 'sops'

const NAV: { id: ViewId; label: string; icon: LucideIcon; count?: number }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'documents', label: 'Critical Documents', icon: FileText, count: documents.length },
  { id: 'contacts', label: 'Emergency Contacts', icon: Phone, count: contacts.length },
  { id: 'plans', label: 'Evacuation Plans', icon: Map, count: plans.length },
  { id: 'gear', label: 'Gear & Go-Bags', icon: Package, count: gear.length },
  { id: 'sops', label: 'Family SOPs', icon: BookOpenCheck, count: sops.length },
]

export function DashboardPreview() {
  const [view, setView] = useState<ViewId>('home')
  const [scenarioId, setScenarioId] = useState(plans[0].id)
  const current = NAV.find((n) => n.id === view)!

  function openScenario(id: string) {
    setScenarioId(id)
    setView('home')
  }

  return (
    <div className="overflow-hidden rounded-2xl border bg-card shadow-2xl shadow-black/40 ring-1 ring-white/5">
      <div className="flex items-center gap-3 border-b bg-background/60 px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-muted-foreground/30" />
          <span className="size-2.5 rounded-full bg-muted-foreground/30" />
          <span className="size-2.5 rounded-full bg-muted-foreground/30" />
        </div>
        <p className="truncate text-xs text-muted-foreground">
          Family Readiness OS <span className="px-1 opacity-50">/</span>
          <span className="text-foreground">{current.label}</span>
        </p>
        <span className="ml-auto hidden rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-primary sm:inline">
          Interactive preview · example data
        </span>
      </div>

      <div className="flex flex-col md:flex-row">
        <nav aria-label="Template sections" className="border-b bg-background/40 md:w-56 md:shrink-0 md:border-r md:border-b-0">
          <p className="hidden px-4 pt-4 pb-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground md:block">
            Workspace
          </p>
          <ul className="flex gap-1 overflow-x-auto p-2 md:flex-col md:overflow-visible md:pt-0">
            {NAV.map((item) => {
              const Icon = item.icon
              const active = view === item.id
              return (
                <li key={item.id} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setView(item.id)}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-left text-sm transition-colors',
                      active ? 'bg-accent text-foreground' : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground',
                    )}
                  >
                    <Icon className={cn('size-4 shrink-0', active && 'text-primary')} aria-hidden="true" />
                    <span className="whitespace-nowrap">{item.label}</span>
                    {item.count !== undefined && (
                      <span className="ml-auto hidden font-mono text-[11px] text-muted-foreground md:inline">{item.count}</span>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
          <div className="mx-3 mb-3 hidden rounded-lg border border-dashed p-3 text-xs leading-relaxed text-muted-foreground md:block">
            Every database links to the others. Tag a contact on a plan and it shows up on that scenario&apos;s go card.
          </div>
        </nav>

        <div className="min-h-[560px] min-w-0 flex-1">
          {view === 'home' && <HomeView scenarioId={scenarioId} onScenarioChange={setScenarioId} onNavigate={setView} />}
          {view === 'documents' && <DocumentsView />}
          {view === 'contacts' && <ContactsView />}
          {view === 'plans' && <PlansView onOpenScenario={openScenario} />}
          {view === 'gear' && <GearView />}
          {view === 'sops' && <SopsView />}
        </div>
      </div>
    </div>
  )
}
