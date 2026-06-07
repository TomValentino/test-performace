import { FooterSimple, NavSimple }                                        from '@/sections/layout-components'
import { PropertyDescription }                                             from '@/sections/property'
import { AgentCard, CollectionGrid, HeroHome, PropertyFeatured, PropertyHero } from '@/sections/section-components'


// ─────────────────────────────────────────────────────────────────────────────
// test-components.jsx
// Simple components to test layouts — drop these in your section-components
// ─────────────────────────────────────────────────────────────────────────────
 
/**
 * InfoCard
 * props: title, body, accentColor, bg
 */
export function InfoCard({ title = 'Card Title', body = 'Some content here.', accentColor = '#1a7a5e', bg = '#ffffff' }) {
  return (
    <div style={{
      background: bg,
      borderTop: `4px solid ${accentColor}`,
      borderRadius: '8px',
      padding: '2rem',
      boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
    }}>
      <h3 style={{ margin: '0 0 0.75rem', fontSize: '1.1rem', fontWeight: 700 }}>{title}</h3>
      <p style={{ margin: 0, color: '#555', lineHeight: 1.6 }}>{body}</p>
    </div>
  )
}
 
/**
 * StatBlock
 * props: label, value, accentColor
 */
export function StatBlock({ label = 'Stat', value = '—', accentColor = '#1a7a5e', background = '#f9f7f4' }) {
  return (
    <div style={{
      padding: '2rem',
      textAlign: 'center',
      borderRadius: '8px',
      background,
    }}>
      <div style={{ fontSize: '2.5rem', fontWeight: 800, color: accentColor, lineHeight: 1 }}>{value}</div>
      <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#888' }}>{label}</div>
    </div>
  )
}
 


// ─────────────────────────────────────────────────────────────────────────────
// REGISTRY
// ─────────────────────────────────────────────────────────────────────────────
export function ColumnsLayout({
  slots = [],
  columns = 2,
  columnsTablet,
  columnsMobile = 1,
  gap = '2rem',
  breakpointTablet = '1024px',
  breakpointMobile = '768px',
  maxWidth = '1280px',
  bg = 'transparent',
  paddingX = '2rem',
  paddingY = '4rem',
}) {
  const uid = `cols-${Math.random().toString(36).slice(2, 7)}`
  return (
    <>
      <style>{`
        .${uid}-grid { display: grid; grid-template-columns: repeat(${columns}, minmax(0, 1fr)); gap: ${gap}; }
        @media (max-width: ${breakpointTablet}) {
          .${uid}-grid { grid-template-columns: repeat(${columnsTablet ?? columns}, minmax(0, 1fr)); }
        }
        @media (max-width: ${breakpointMobile}) {
          .${uid}-grid { grid-template-columns: repeat(${columnsMobile}, minmax(0, 1fr)); }
        }
      `}</style>
      <section style={{ background: bg, padding: `${paddingY} ${paddingX}` }}>
        <div style={{ maxWidth: maxWidth ?? 'none', margin: '0 auto' }}>
          <div className={`${uid}-grid`}>
            {slots.map((slotChildren, i) => <div key={i}>{slotChildren}</div>)}
          </div>
        </div>
      </section>
    </>
  )
}
export const componentRegistry = [
  { id: 'nav-simple',           title: 'Simple Nav',          category: 'NAVS',       required_scopes: null,         component: NavSimple           },
  { id: 'footer-simple',        title: 'Simple Footer',       category: 'FOOTERS',    required_scopes: null,         component: FooterSimple        },
  { id: 'hero-home',            title: 'Home Hero',           category: 'HEROES',     required_scopes: null,         component: HeroHome            },
  { id: 'property-hero',        title: 'Property Hero',       category: 'PROPERTY',   required_scopes: 'PROPERTY',   component: PropertyHero        },
  { id: 'property-description', title: 'Property Desc',       category: 'PROPERTY',   required_scopes: 'PROPERTY',   component: PropertyDescription },
  { id: 'property-featured',    title: 'Property Featured',   category: 'PROPERTY',   required_scopes: 'PROPERTY',   component: PropertyFeatured    },
  { id: 'collection-grid',      title: 'Collection Grid',     category: 'COLLECTION', required_scopes: 'COLLECTION', component: CollectionGrid      },
  { id: 'agent-card',           title: 'Agent Card',          category: 'AGENTS',     required_scopes: null,         component: AgentCard           },
  // ColumnsLayout is just a component — the only one that accepts slots as children
  { id: 'columns',              title: 'Columns',             category: 'LAYOUT',     required_scopes: null,         component: ColumnsLayout       },
  { id: 'info-card',   title: 'Info Card',   category: 'TEST', required_scopes: null, component: InfoCard   },
{ id: 'stat-block',  title: 'Stat Block',  category: 'TEST', required_scopes: null, component: StatBlock  },
]

export const sectionRegistry  = componentRegistry // legacy alias
export const getComponentById = (id) => componentRegistry.find(c => c.id === id) ?? null
export const getSectionById   = getComponentById  // legacy alias

// ─────────────────────────────────────────────────────────────────────────────
// TOKEN RESOLUTION
// ─────────────────────────────────────────────────────────────────────────────

export function resolveTokens(str, ctx) {
  if (!str || typeof str !== 'string') return str
  return str.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_, path) => {
    const value = path.split('.').reduce((obj, key) => obj?.[key], ctx)
    return value ?? ''
  })
}

function resolveProps(props, ctx) {
  return Object.fromEntries(
    Object.entries(props ?? {}).map(([k, v]) => [k, typeof v === 'string' ? resolveTokens(v, ctx) : v])
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// RENDER
// ─────────────────────────────────────────────────────────────────────────────

function renderItem(item, ctx, key) {
  const { store = null, profile = null, propertiesMap = {}, collectionsMap = {}, currentPropertyId = null, currentCollectionId = null } = ctx

  const entry = getComponentById(item.id)
  if (!entry) return null

  // Scope
  const scoped = {}
  if (item.scope === 'PROPERTY') {
    const id = item.scope_id ?? currentPropertyId
    scoped.property = id ? (propertiesMap[id] ?? null) : null
  }
  if (item.scope === 'COLLECTION') {
    const id = item.scope_id ?? currentCollectionId
    scoped.collection = id ? (collectionsMap[id] ?? null) : null
  }

  const resolvedProps = resolveProps(item.props, { store, profile, ...scoped })

  // If this component has slots, render them and pass as slots prop
  // Only ColumnsLayout uses this — but the renderer doesn't need to know that
  if (item.slots?.length) {
    const slots = item.slots.map((slot, slotIdx) =>
      slot.map((child, childIdx) =>
        renderItem(child, ctx, `${key}-slot${slotIdx}-${childIdx}`)
      )
    )
    return (
      <entry.component key={key} {...resolvedProps} {...scoped} store={store} profile={profile} slots={slots} />
    )
  }

  return (
    <entry.component key={key} {...resolvedProps} {...scoped} store={store} profile={profile} />
  )
}

export function renderPage(items = [], ctx = {}) {
  const fullCtx = {
    store: null, profile: null, propertiesMap: {}, collectionsMap: {},
    currentPropertyId: null, currentCollectionId: null,
    ...ctx,
  }
  return items.map((item, i) => renderItem(item, fullCtx, `${item.id}-${i}`))
}

export function renderSections(items = [], ctx = {}) {
  return renderPage(items, ctx)
}

export function renderPreview(items = []) {
  return items.map((item, i) => {
    const entry = getComponentById(item.id)
    if (!entry) return null
    if (item.slots?.length) {
      const slots = item.slots.map(slot =>
        slot.map((child, ci) => {
          const c = getComponentById(child.id)
          return c ? <c.component key={ci} {...child.props} /> : null
        })
      )
      return <entry.component key={i} {...item.props} slots={slots} />
    }
    return <entry.component key={i} {...item.props} />
  })
}