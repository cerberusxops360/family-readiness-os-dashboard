export type CategoryId = 'notion' | 'guide' | 'print' | 'bundle' | 'updates'

export const CATEGORIES: { id: CategoryId | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'notion', label: 'Notion templates' },
  { id: 'guide', label: 'Field guides' },
  { id: 'print', label: 'Print kits' },
  { id: 'bundle', label: 'Bundles' },
  { id: 'updates', label: 'Updates' },
]

export type Product = {
  code: string
  name: string
  category: CategoryId
  categoryLabel: string
  price: number
  cadence: 'one-time' | 'per year'
  outcome: string
  formats: string[]
  includes: string[]
  requirements: string
  setupTime: string
  forWho: string
  notFor: string
  version: string
  license: string
  updates: string
  bundleOf?: string[]
}

const STANDARD_LICENSE = 'Personal household license. Use across your own devices and share with the people in your home.'
const SUPPORT_REFUND = 'Email support within two business days. Refund terms are stated in full at checkout.'

export const PRODUCTS: Product[] = [
  {
    code: 'FR NT 01',
    name: 'Family Readiness OS',
    category: 'notion',
    categoryLabel: 'Notion template',
    price: 39,
    cadence: 'one-time',
    outcome: 'One Notion home page that links documents, contacts, routes, go-bags and family procedures.',
    formats: ['Notion', 'PDF setup guide', 'Video walkthrough'],
    includes: [
      'Five linked databases: Critical Documents, Emergency Contacts, Evacuation Plans, Gear & Go-Bags, Family SOPs',
      'Scenario go cards that collapse a plan into grab, call, go',
      'Needs-attention view for expiring documents, stale supplies and undrilled procedures',
      'PACE contact tree: primary, alternate, contingency, emergency',
    ],
    requirements: 'Free Notion account on web, desktop or mobile.',
    setupTime: 'Duplicate in one click. Plan an evening to enter your household data.',
    forWho: 'Households that want one place for the plan and one person willing to own it.',
    notFor: 'Anyone who needs a professional emergency-management assessment or a supply shopping list.',
    version: 'v1.0',
    license: STANDARD_LICENSE,
    updates: 'Fixes and minor improvements to v1 are included at no charge.',
  },
  {
    code: 'FR MD 01',
    name: 'Dependents Module',
    category: 'notion',
    categoryLabel: 'Notion add-on',
    price: 14,
    cadence: 'one-time',
    outcome: 'Adds the people and animals who cannot evacuate themselves to every scenario.',
    formats: ['Notion', 'PDF guide'],
    includes: [
      'Pet profiles with vet records, carriers, food and boarding contacts',
      'Elderly and medical dependents: medications, mobility needs, care handoff notes',
      'Automatic links into each scenario go card',
    ],
    requirements: 'Family Readiness OS (FR NT 01) duplicated in your Notion workspace.',
    setupTime: 'About as long as it takes to fill in one profile per dependent.',
    forWho: 'Families caring for pets, aging parents, or anyone with medical needs.',
    notFor: 'Households without dependents beyond the core family.',
    version: 'v1.0',
    license: STANDARD_LICENSE,
    updates: 'Fixes and minor improvements to v1 are included at no charge.',
  },
  {
    code: 'FR FG 01',
    name: 'Go-Bag Build and Rotation Guide',
    category: 'guide',
    categoryLabel: 'Field guide',
    price: 15,
    cadence: 'one-time',
    outcome: 'Build one bag per person, then keep it current with a rotation calendar instead of guesswork.',
    formats: ['PDF', 'Printable checklists'],
    includes: [
      'Per-person bag lists for adults, kids and pets',
      'Seventy-two-hour baseline and what to cut when space runs out',
      'Rotation calendar for water, food, medication and batteries',
    ],
    requirements: 'Any PDF reader. Prints on letter or A4.',
    setupTime: 'Read in under an hour. Build time depends on what you already own.',
    forWho: 'Anyone starting from zero or inheriting a bag nobody has opened in years.',
    notFor: 'Long-term survival or off-grid living planning.',
    version: 'v1.0',
    license: STANDARD_LICENSE,
    updates: 'Corrections to v1 are included at no charge.',
  },
  {
    code: 'FR FG 02',
    name: 'Family Drill and AAR Kit',
    category: 'guide',
    categoryLabel: 'Field guide',
    price: 17,
    cadence: 'one-time',
    outcome: 'Run short, low-drama drills and capture what actually happened so the plan improves.',
    formats: ['Fillable PDF', 'Print PDF'],
    includes: [
      'Six drill scripts sized for households with kids',
      'A fifteen-minute after-action review worksheet',
      'Quarterly cadence that feeds changes back into your plan',
    ],
    requirements: 'Any PDF reader. Fillable fields work in most free readers.',
    setupTime: 'Each drill fits in a weekend morning.',
    forWho: 'Families who have a plan on paper but have never tested it.',
    notFor: 'Anyone looking for a formal training curriculum.',
    version: 'v1.0',
    license: STANDARD_LICENSE,
    updates: 'Corrections to v1 are included at no charge.',
  },
  {
    code: 'FR PK 01',
    name: 'Printable Readiness Binder',
    category: 'print',
    categoryLabel: 'Print kit',
    price: 19,
    cadence: 'one-time',
    outcome: 'A paper copy of the plan for when power, signal, or the phone itself is gone.',
    formats: ['Print PDF', 'Wallet cards', 'Fridge sheet'],
    includes: [
      'Tabbed binder template mirroring the five Notion databases',
      'Wallet cards with rally points and out-of-area contact',
      'One-page fridge sheet for sitters and visiting family',
    ],
    requirements: 'Printer, or any print shop. Letter and A4 versions included.',
    setupTime: 'Fill by hand or print from your Notion data.',
    forWho: 'Every household. Phones fail first.',
    notFor: 'Storing originals of sensitive documents. Keep copies, not originals.',
    version: 'v1.0',
    license: STANDARD_LICENSE,
    updates: 'Corrections to v1 are included at no charge.',
  },
  {
    code: 'FR BD 01',
    name: 'Family Readiness OS: Complete',
    category: 'bundle',
    categoryLabel: 'Bundle',
    price: 69,
    cadence: 'one-time',
    outcome: 'The full system: workspace, dependents module, both field guides and the printable binder.',
    formats: ['Notion', 'PDF', 'Print PDF'],
    includes: [
      'Family Readiness OS (FR NT 01)',
      'Dependents Module (FR MD 01)',
      'Go-Bag Build and Rotation Guide (FR FG 01)',
      'Family Drill and AAR Kit (FR FG 02)',
      'Printable Readiness Binder (FR PK 01)',
    ],
    requirements: 'Free Notion account and any PDF reader.',
    setupTime: 'Start with the workspace; the guides slot in as you go.',
    forWho: 'Households that want the whole system at once.',
    notFor: 'Anyone who only needs one piece. Buy that piece instead.',
    version: 'v1.0',
    license: STANDARD_LICENSE,
    updates: 'Fixes and minor improvements to every included v1 product.',
    bundleOf: ['FR NT 01', 'FR MD 01', 'FR FG 01', 'FR FG 02', 'FR PK 01'],
  },
  {
    code: 'FR SV 01',
    name: 'Family Command Updates',
    category: 'updates',
    categoryLabel: 'Annual updates',
    price: 19,
    cadence: 'per year',
    outcome: 'Keeps the plan current: new scenario checklists, annual review prompts and priority support.',
    formats: ['Notion', 'Email'],
    includes: ['New disaster-type checklists as they are released', 'Annual review prompts timed to your plan', 'Priority support'],
    requirements: 'Family Readiness OS (FR NT 01).',
    setupTime: 'Nothing to set up. Updates arrive by email.',
    forWho: 'Families who want the system maintained for them.',
    notFor: 'Anyone happy to run their own annual review.',
    version: 'Rolling',
    license: STANDARD_LICENSE,
    updates: 'Cancel anytime; you keep everything already delivered.',
  },
]

export const SUPPORT_TERMS = SUPPORT_REFUND
export const LAUNCH_DISCOUNT = 0.25

export const PRODUCT_CODES = new Set(PRODUCTS.map((p) => p.code))

export function getProduct(code: string) {
  return PRODUCTS.find((p) => p.code === code)
}

export function standaloneValue(bundle: Product) {
  return (bundle.bundleOf ?? []).reduce((sum, code) => sum + (getProduct(code)?.price ?? 0), 0)
}

export function formatPrice(product: Pick<Product, 'price' | 'cadence'>) {
  return product.cadence === 'per year' ? `$${product.price}/yr` : `$${product.price}`
}
