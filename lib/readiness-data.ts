export const TODAY = new Date('2026-10-01')

export type PaceRole = 'Primary' | 'Alternate' | 'Contingency' | 'Emergency'

export type Contact = {
  id: string
  name: string
  relationship: string
  phone: string
  role: string
  pace: PaceRole
}

export type DocumentItem = {
  id: string
  type: string
  person: string
  location: string
  storage: 'Safe' | 'Drive link' | 'Upload'
  expires: string | null
}

export type GoBag = { id: string; name: string; owner: string }

export type GearItem = {
  id: string
  item: string
  category: 'Water' | 'Food' | 'Medical' | 'Power' | 'Docs & Cash' | 'Pet'
  quantity: number
  expires: string | null
  bagId: string
}

export type Sop = {
  id: string
  name: string
  trigger: string
  owner: string
  lastDrilled: string
  steps: string[]
}

export type Plan = {
  id: string
  scenario: string
  status: 'Ready' | 'Review due' | 'Draft'
  primaryRoute: string
  alternateRoute: string
  rallyPoint: string
  lastReviewed: string
  bagIds: string[]
  contactIds: string[]
  documentIds: string[]
  sopId: string
}

export const contacts: Contact[] = [
  { id: 'c1', name: 'Aunt Jo Bishop', relationship: 'Family · Denver', phone: '(303) 555-0142', role: 'Out-of-area relay', pace: 'Primary' },
  { id: 'c2', name: 'Priya Shah', relationship: 'Neighbor', phone: '(619) 555-0178', role: 'Key holder · kid pickup', pace: 'Alternate' },
  { id: 'c3', name: 'Dr. Lena Ortiz', relationship: 'Pediatrician', phone: '(619) 555-0110', role: 'Ellie medical', pace: 'Contingency' },
  { id: 'c4', name: 'Coastal Mutual', relationship: 'Insurance', phone: '(800) 555-0199', role: 'Claims · policy #HX-2291', pace: 'Contingency' },
  { id: 'c5', name: 'Mesa Animal Hospital', relationship: 'Vet', phone: '(619) 555-0133', role: 'Biscuit records', pace: 'Emergency' },
  { id: 'c6', name: 'Lincoln Elementary', relationship: 'School office', phone: '(619) 555-0101', role: 'Release protocol', pace: 'Alternate' },
]

export const documents: DocumentItem[] = [
  { id: 'd1', type: 'Passport', person: 'Dana', location: 'Fireproof safe · top shelf', storage: 'Safe', expires: '2026-12-14' },
  { id: 'd2', type: 'Passport', person: 'Marcus', location: 'Fireproof safe · top shelf', storage: 'Safe', expires: '2031-04-02' },
  { id: 'd3', type: 'Birth certificate', person: 'Ellie', location: 'Drive › Family › Vital records', storage: 'Drive link', expires: null },
  { id: 'd4', type: 'Homeowners policy', person: 'Household', location: 'Drive › Insurance (38 MB scan)', storage: 'Drive link', expires: '2027-03-01' },
  { id: 'd5', type: 'Medication list', person: 'Ruth', location: 'Attached PDF · 140 KB', storage: 'Upload', expires: '2026-10-20' },
  { id: 'd6', type: 'Vaccination record', person: 'Biscuit', location: 'Attached PDF · 90 KB', storage: 'Upload', expires: '2027-01-08' },
  { id: 'd7', type: 'Property deed', person: 'Household', location: 'Drive › Property (22 MB scan)', storage: 'Drive link', expires: null },
  { id: 'd8', type: "Driver's license", person: 'Marcus', location: 'Wallet · copy in Drive', storage: 'Drive link', expires: '2028-07-19' },
]

export const bags: GoBag[] = [
  { id: 'b1', name: 'Bag A', owner: 'Dana' },
  { id: 'b2', name: 'Bag B', owner: 'Marcus' },
  { id: 'b3', name: 'Kid kit', owner: 'Ellie' },
  { id: 'b4', name: 'Pet kit', owner: 'Biscuit' },
]

export const gear: GearItem[] = [
  { id: 'g1', item: 'Water pouches (500 ml)', category: 'Water', quantity: 12, expires: '2026-11-02', bagId: 'b1' },
  { id: 'g2', item: 'Ration bars', category: 'Food', quantity: 6, expires: '2029-05-01', bagId: 'b1' },
  { id: 'g3', item: 'Trauma & first-aid kit', category: 'Medical', quantity: 1, expires: '2027-08-15', bagId: 'b2' },
  { id: 'g4', item: 'Hand-crank radio', category: 'Power', quantity: 1, expires: null, bagId: 'b2' },
  { id: 'g5', item: 'Power bank 20k mAh', category: 'Power', quantity: 2, expires: null, bagId: 'b1' },
  { id: 'g6', item: 'Cash in small bills', category: 'Docs & Cash', quantity: 300, expires: null, bagId: 'b2' },
  { id: 'g7', item: "Children's ibuprofen", category: 'Medical', quantity: 1, expires: '2026-10-28', bagId: 'b3' },
  { id: 'g8', item: 'Kibble (3-day)', category: 'Pet', quantity: 1, expires: '2027-02-10', bagId: 'b4' },
  { id: 'g9', item: 'N95 masks', category: 'Medical', quantity: 10, expires: '2030-01-01', bagId: 'b1' },
  { id: 'g10', item: 'Water filter straw', category: 'Water', quantity: 3, expires: null, bagId: 'b3' },
]

export const sops: Sop[] = [
  {
    id: 's1',
    name: 'Evacuate in 10 minutes',
    trigger: 'Evacuation WARNING or ORDER for our zone',
    owner: 'Dana',
    lastDrilled: '2026-06-12',
    steps: ['Text "GO" to family thread', 'Grab assigned bags + safe docs', 'Load Biscuit & pet kit', 'Close windows, leave lights on', 'Drive primary route, check in at rally point'],
  },
  {
    id: 's2',
    name: 'Shelter in place',
    trigger: 'Air-quality alert or shelter order',
    owner: 'Marcus',
    lastDrilled: '2026-02-03',
    steps: ['Bring everyone + Biscuit inside', 'Seal doors/vents, run HEPA', 'Tune radio to local AM', 'Check in with Aunt Jo'],
  },
  {
    id: 's3',
    name: 'Power out > 4 hours',
    trigger: 'Utility outage with no restore estimate',
    owner: 'Marcus',
    lastDrilled: '2026-08-21',
    steps: ['Start fridge log', 'Charge phones from power banks', "Move Ruth's meds to cooler", 'Report outage, check neighbors'],
  },
  {
    id: 's4',
    name: 'School reunification',
    trigger: 'Event during school hours',
    owner: 'Dana',
    lastDrilled: '2026-09-04',
    steps: ['Do NOT call the school line', 'Watch district alerts', 'Priya picks up if we cannot', 'Meet at rally point'],
  },
]

export const plans: Plan[] = [
  {
    id: 'p1',
    scenario: 'Wildfire',
    status: 'Ready',
    primaryRoute: 'I-15 North → Escondido',
    alternateRoute: 'SR-78 West → Oceanside',
    rallyPoint: 'Escondido Library lot',
    lastReviewed: '2026-09-02',
    bagIds: ['b1', 'b2', 'b3', 'b4'],
    contactIds: ['c1', 'c2', 'c5'],
    documentIds: ['d1', 'd2', 'd3', 'd4', 'd6'],
    sopId: 's1',
  },
  {
    id: 'p2',
    scenario: 'Earthquake',
    status: 'Review due',
    primaryRoute: 'Stay put · inspect gas & water',
    alternateRoute: 'Walk to Lincoln Elementary field',
    rallyPoint: 'Front yard oak tree',
    lastReviewed: '2026-03-11',
    bagIds: ['b1', 'b3'],
    contactIds: ['c1', 'c6', 'c3'],
    documentIds: ['d5', 'd4'],
    sopId: 's4',
  },
  {
    id: 'p3',
    scenario: 'Power outage',
    status: 'Ready',
    primaryRoute: 'Shelter at home',
    alternateRoute: "Aunt Jo's cabin (if > 72 h)",
    rallyPoint: 'Kitchen',
    lastReviewed: '2026-08-21',
    bagIds: ['b2'],
    contactIds: ['c2', 'c1'],
    documentIds: ['d5'],
    sopId: 's3',
  },
  {
    id: 'p4',
    scenario: 'Smoke / bad air',
    status: 'Draft',
    primaryRoute: 'Shelter in place · seal room',
    alternateRoute: 'Cooling center · Mesa Library',
    rallyPoint: 'Upstairs office',
    lastReviewed: '2026-02-03',
    bagIds: ['b1'],
    contactIds: ['c1', 'c3'],
    documentIds: ['d5'],
    sopId: 's2',
  },
]

export function daysUntil(date: string) {
  return Math.round((new Date(date).getTime() - TODAY.getTime()) / 86_400_000)
}

export function daysSince(date: string) {
  return -daysUntil(date)
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
}

export type AttentionItem = { id: string; label: string; detail: string; source: string; severity: 'high' | 'medium' }

export function getAttentionItems(): AttentionItem[] {
  const items: AttentionItem[] = []
  for (const d of documents) {
    if (d.expires && daysUntil(d.expires) <= 90) {
      const days = daysUntil(d.expires)
      items.push({ id: d.id, label: `${d.person}'s ${d.type.toLowerCase()}`, detail: `Expires in ${days} days`, source: 'Documents', severity: days <= 30 ? 'high' : 'medium' })
    }
  }
  for (const g of gear) {
    if (g.expires && daysUntil(g.expires) <= 60) {
      const bag = bags.find((b) => b.id === g.bagId)
      items.push({ id: g.id, label: g.item, detail: `Expires in ${daysUntil(g.expires)} days · ${bag?.name}`, source: 'Gear', severity: 'high' })
    }
  }
  for (const s of sops) {
    if (daysSince(s.lastDrilled) > 180) {
      items.push({ id: s.id, label: s.name, detail: `Not drilled in ${Math.round(daysSince(s.lastDrilled) / 30)} months`, source: 'SOPs', severity: 'medium' })
    }
  }
  for (const p of plans) {
    if (p.status !== 'Ready') {
      items.push({ id: p.id, label: `${p.scenario} plan`, detail: p.status === 'Draft' ? 'Still a draft' : 'Quarterly review due', source: 'Plans', severity: 'medium' })
    }
  }
  return items.sort((a, b) => (a.severity === b.severity ? 0 : a.severity === 'high' ? -1 : 1))
}

export function getReadinessScore() {
  const total = documents.length + gear.length + sops.length + plans.length
  return Math.round(((total - getAttentionItems().length) / total) * 100)
}
