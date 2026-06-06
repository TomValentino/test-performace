import { FooterSimple, NavSimple } from "@/templates/layout-components"
import { AgentCard, CollectionGrid, HeroHome, PropertyFeatured, PropertyHero } from "@/templates/section-components"

const SECTIONS = {
  'nav-simple':      NavSimple,
  'footer-simple':   FooterSimple,
  'property-hero':   PropertyHero,
  'collection-grid': CollectionGrid,
  'hero-home':       HeroHome,
  'property-featured': PropertyFeatured,
  'agent-card':        AgentCard,
}

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
    const Component = SECTIONS[s.id]
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