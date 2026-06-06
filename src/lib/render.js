import { FooterSimple, NavSimple } from "@/sections/layout-components"
import { PropertyDescription } from "@/sections/property"
import { AgentCard, CollectionGrid, HeroHome, PropertyFeatured, PropertyHero } from "@/sections/section-components"

// --------------------------------------------------
// SECTION REGISTRY
// category: NAVS | HEROES | PROPERTY | COLLECTION | FOOTERS | AGENTS
// required_scopes: PROPERTY | COLLECTION | null
// --------------------------------------------------

export const sectionRegistry = [
  { id: 'nav-simple',        title: 'Simple Nav',        category: 'NAVS',       required_scopes: null,         component: NavSimple        },
  { id: 'footer-simple',     title: 'Simple Footer',     category: 'FOOTERS',    required_scopes: null,         component: FooterSimple     },
  { id: 'hero-home',         title: 'Home Hero',         category: 'HEROES',     required_scopes: null,         component: HeroHome         },
  { id: 'property-hero',     title: 'Property Hero',     category: 'PROPERTY',   required_scopes: 'PROPERTY',   component: PropertyHero     },
  { id: 'property-description', title: 'Property Description', category: 'PROPERTY',   required_scopes: 'PROPERTY',   component: PropertyDescription },
  { id: 'property-featured', title: 'Property Featured', category: 'PROPERTY',   required_scopes: 'PROPERTY',   component: PropertyFeatured },
  { id: 'collection-grid',   title: 'Collection Grid',   category: 'COLLECTION', required_scopes: 'COLLECTION', component: CollectionGrid   },
  { id: 'agent-card',        title: 'Agent Card',        category: 'AGENTS',     required_scopes: null,         component: AgentCard        },
]

export const getSectionById        = (id)       => sectionRegistry.find(s => s.id === id) ?? null
export const getSectionsByCategory = (category) => sectionRegistry.filter(s => s.category === category)

// --------------------------------------------------
// RENDER — live (scoped, for real pages)
// --------------------------------------------------

export function resolveTokens(str, ctx) {
  if (!str || typeof str !== 'string') return str
  return str.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_, path) => {
    const value = path.split('.').reduce((obj, key) => obj?.[key], ctx)
    return value ?? ''
  })
}

function resolveProps(props, ctx) {
  return Object.fromEntries(
    Object.entries(props ?? {}).map(([k, v]) => [
      k,
      typeof v === 'string' ? resolveTokens(v, ctx) : v
    ])
  )
}

export function renderSections(sections = [], ctx = {}) {
  const {
    store               = null,
    profile             = null,
    propertiesMap       = {},
    collectionsMap      = {},
    currentPropertyId   = null,
    currentCollectionId = null,
  } = ctx

  return sections.map((s, i) => {
    const Component = getSectionById(s.id)?.component
    if (!Component) return null

    const scoped = {}

    if (s.scope === 'PROPERTY') {
      const id = s.scope_id ?? currentPropertyId
      scoped.property = id ? (propertiesMap[id] ?? null) : null
    }

    if (s.scope === 'COLLECTION') {
      const id = s.scope_id ?? currentCollectionId
      scoped.collection = id ? (collectionsMap[id] ?? null) : null
    }

    const resolvedProps = resolveProps(s.props, { store, profile, ...scoped })

    return (
      <Component
        key={`${s.id}-${i}`}
        {...resolvedProps}
        {...scoped}
        store={store}
        profile={profile}
      />
    )
  })
}

// --------------------------------------------------
// RENDER — preview (no scope, for picker UI)
// --------------------------------------------------

export function renderPreview(sections = []) {
  return sections.map((s, i) => {
    const Component = getSectionById(s.id)?.component
    if (!Component) return null
    return <Component key={`${s.id}-${i}`} {...s.props} />
  })
}