import Image           from 'next/image'
import { FooterSimple, NavSimple } from '@/sections/old/old-layouts'
import { AgentCard, CollectionGrid, HeroHome, PropertyFeatured, PropertyHero,resolveRadius  } from '@/sections/old/old-sections'
import { PropertyImage, PropertyPrice, PropertySpecs, PropertyTitle } from '@/sections/property'
import { ColumnBlock, ContentBlock, ScopeBlock } from '@/sections/structure-blocks'
import { CollectionTitle } from '@/sections/collection'
import { AgentAbout, AgentName } from '@/sections/agent'
import {  TextElement } from '@/sections/elements'
import { ButtonElementSchema } from '@/sections/element-schema'
import { ButtonElement } from '@/sections/elements-client'

// ─── Helpers ───────────────────────────────────────────────────────────────────

export function animationDataAttrs({ animation, animDelay, animDuration, animThreshold, animRepeat } = {}) {
  if (!animation || animation === 'none') return {}
  return {
    'data-anim':                                                   animation,
    ...(animDelay     != null && { 'data-anim-delay':     String(animDelay)     }),
    ...(animDuration  != null && { 'data-anim-duration':  String(animDuration)  }),
    ...(animThreshold != null && { 'data-anim-threshold': String(animThreshold) }),
    ...(animRepeat              && { 'data-anim-repeat':   'true'                }),
  }
}

export function hoverDataAttrs({ hover, hoverDuration } = {}) {
  return {
    ...(hover         && { 'data-hover':          hover         }),
    ...(hoverDuration && { 'data-hover-duration': hoverDuration }),
  }
}

// ─── Base HOC ──────────────────────────────────────────────────────────────────

export function withBaseProps(Component) {
  return function({
    background, padding, margin, maxWidth,
    border, borderRadius, boxShadow,
    style = {},
    animation, animDelay, animDuration, animThreshold, animRepeat,
    hover, hoverDuration,
    ...props
  }) {
    return (
      <Component
        {...props}
        suppressHydrationWarning
        style={{
          ...(background   && { background }),
          ...(padding      && { padding }),
          ...(margin       && { margin }),
          ...(maxWidth     && { maxWidth }),
          ...(border       && { border }),
          ...(borderRadius && { borderRadius: resolveRadius(borderRadius) }),
          ...(boxShadow    && { boxShadow }),
          ...style,
        }}
        anim={animation ? { animation, animDelay, animDuration, animThreshold, animRepeat } : undefined}
        hover={hover ? { hover, hoverDuration } : undefined}
      />
    )
  }
}
export const SCOPES = {
  NONE:       null,
  PROPERTY:   'PROPERTY',
  COLLECTION: 'COLLECTION',
  STORE:      'STORE',
}

export const COMPONENT_TYPE = {
  SECTION:   'SECTION',
  ELEMENT:   'ELEMENT',
  CONTAINER: 'CONTAINER',
}

// ─── Registry ──────────────────────────────────────────────────────────────────
export const componentRegistry = [
  // Sections
  { id: 'nav-simple',           component: NavSimple,           schema: null, scope: SCOPES.NONE,       type: COMPONENT_TYPE.SECTION   },
  { id: 'footer-simple',        component: FooterSimple,        schema: null, scope: SCOPES.NONE,       type: COMPONENT_TYPE.SECTION   },
  { id: 'hero-home',            component: HeroHome,            schema: null, scope: SCOPES.NONE,       type: COMPONENT_TYPE.SECTION   },
  { id: 'property-hero',        component: PropertyHero,        schema: null, scope: SCOPES.PROPERTY,   type: COMPONENT_TYPE.SECTION   },
  // { id: 'property-description', component: PropertyDescription, schema: null, scope: SCOPES.PROPERTY,   type: COMPONENT_TYPE.SECTION   },
  { id: 'property-featured',    component: PropertyFeatured,    schema: null, scope: SCOPES.PROPERTY,   type: COMPONENT_TYPE.SECTION   },
  { id: 'collection-grid',      component: CollectionGrid,      schema: null, scope: SCOPES.COLLECTION, type: COMPONENT_TYPE.SECTION   },
  { id: 'agent-card',           component: AgentCard,           schema: null, scope: SCOPES.NONE,       type: COMPONENT_TYPE.SECTION   },

  // Collections
  { id: 'collection-title',     component: CollectionTitle,     schema: null, scope: SCOPES.COLLECTION, type: COMPONENT_TYPE.ELEMENT   },

  // Elements
  { id: 'button',               component: ButtonElement,       schema: ButtonElementSchema,  scope: SCOPES.NONE,     type: COMPONENT_TYPE.ELEMENT },
  { id: 'text',         component: TextElement,         schema: null, scope: SCOPES.NONE,       type: COMPONENT_TYPE.ELEMENT   },

  // Agent
  { id: 'agent-name',           component: AgentName,           schema: null, scope: SCOPES.NONE,       type: COMPONENT_TYPE.ELEMENT   },
  { id: 'agent-about',          component: AgentAbout,          schema: null, scope: SCOPES.NONE,       type: COMPONENT_TYPE.ELEMENT   },

  // Property
  { id: 'property-image',       component: PropertyImage,       schema: null, scope: SCOPES.PROPERTY,   type: COMPONENT_TYPE.ELEMENT   },
  { id: 'property-title',       component: PropertyTitle,       schema: null, scope: SCOPES.PROPERTY,   type: COMPONENT_TYPE.ELEMENT   },
  { id: 'property-price',       component: PropertyPrice,       schema: null, scope: SCOPES.PROPERTY,   type: COMPONENT_TYPE.ELEMENT   },
  { id: 'property-specs',       component: PropertySpecs,       schema: null, scope: SCOPES.PROPERTY,   type: COMPONENT_TYPE.ELEMENT   },

  // Containers
  { id: 'content-block',        component: ContentBlock,        schema: null, scope: SCOPES.NONE,       type: COMPONENT_TYPE.CONTAINER },
  { id: 'column-block',         component: ColumnBlock,         schema: null, scope: SCOPES.NONE,       type: COMPONENT_TYPE.CONTAINER },
  { id: 'scope-block',          component: ScopeBlock,          schema: null, scope: SCOPES.NONE,       type: COMPONENT_TYPE.CONTAINER },
]


export const sectionRegistry  = componentRegistry
export const getComponentById = (id) => componentRegistry.find(c => c.id === id) ?? null
export const getSectionById   = getComponentById

// ─── Token helpers ─────────────────────────────────────────────────────────────

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
      typeof v === 'string' ? resolveTokens(v, ctx) : v,
    ])
  )
}

// ─── Renderer ──────────────────────────────────────────────────────────────────

function renderItem(item, ctx, key) {
  const {
    store               = null,
    profile             = null,
    propertiesMap       = {},
    collectionsMap      = {},
    currentPropertyId   = null,
    currentCollectionId = null,
  } = ctx
  const entry = getComponentById(item.id)
  if (!entry) return null
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
  const children      = item.children?.map((child, i) => renderItem(child, ctx, `${key}-${i}`))
  return (
    <entry.component key={key} {...resolvedProps} {...scoped} store={store} profile={profile}>
      {children}
    </entry.component>
  )
}

export function renderPage(items = [], ctx = {}) {
  const fullCtx = {
    store:               null,
    profile:             null,
    propertiesMap:       {},
    collectionsMap:      {},
    currentPropertyId:   null,
    currentCollectionId: null,
    ...ctx,
  }
  return items.map((item, i) => renderItem(item, fullCtx, `${item.id}-${i}`))
}

export const renderSections = renderPage

export function renderPreview(items = []) {
  return items.map((item, i) => {
    const entry = getComponentById(item.id)
    if (!entry) return null
    const children = item.children?.map((child, ci) => {
      const c = getComponentById(child.id)
      return c ? <c.component key={ci} {...child.props} /> : null
    })
    return <entry.component key={i} {...item.props}>{children}</entry.component>
  })
}