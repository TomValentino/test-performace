import { Icon } from '@/components/icons'
import { PropImage }                                                            from '@/components/img'
import { FooterSimple, NavSimple, SmartLink }                                   from '@/sections/layout-components'
import { PropertyDescription }                                                  from '@/sections/property'
import { AgentCard, CollectionGrid, HeroHome, PropertyFeatured, PropertyHero, resolveRadius }  from '@/sections/section-components'
import { useId }                                                                from 'react'


// ─── Base HOC ──────────────────────────────────────────────────────────────────

export function withBaseProps(Component) {
  return function({ 
    background, padding, margin, maxWidth,
    style = {},
    animName, animDelay, animDuration,
    hover, hoverDuration,
    ...props 
  }) {
    return (
      <Component
        {...props}
         style={{ background, padding, margin, maxWidth, ...style }}
         animation={{ animName, animDelay, animDuration }}
         hover={{ hover, hoverDuration }}
      />
    )
  }
}

// export function withBaseProps(Component) {
//   return function({ background, padding, margin, maxWidth, style = {}, ...props }) {
//     return (
//       <Component
//         {...props}
//         style={{ background, padding, margin, maxWidth, ...style }}
//       />
//     )
//   }
// }


// ─── Layout Blocks ─────────────────────────────────────────────────────────────

export const ContentBlock = withBaseProps(function ContentBlock({
  children,
  gap,
  align,
  justify,
  style,
  animation,
  hover,
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        ...(gap     && { gap }),
        ...(align   && { alignItems: align }),
        ...(justify && { justifyContent: justify }),
        ...style,
      }}
      data-anim={animation.animName}
      data-delay={animation.animDelay}
      data-duration={animation.animDuration}
      data-hover={hover.hover}
      data-hover-duration={hover.hoverDuration}
    >
      {children}
    </div>
  )
})

export const ColumnBlock = withBaseProps(function ColumnBlock({
  children,
  widths = [],
  breakpoints = [],
  gap = '1rem',
  align = 'stretch',
  justify = 'start',
  style,
  animation,
  hover,
}) {
  const uid = useId()
  const cls = `col-${uid.replace(/:/g, '')}`
  return (
    <div
      className={cls}
      style={{
        display: 'grid',
        gridTemplateColumns: widths.length ? widths.join(' ') : '1fr',
        gap,
        alignItems: align,
        justifyContent: justify,
        ...style,
      }}
      data-anim={animation.animName}
      data-delay={animation.animDelay}
      data-duration={animation.animDuration}
      data-hover={hover.hover}
      data-hover-duration={hover.hoverDuration}
    >
      {breakpoints.length > 0 && (
        <style>{breakpoints
          .map(({ screen, widths }) =>
            `@media (max-width: ${screen}) { .${cls} { grid-template-columns: ${widths.join(' ')} !important; } }`
          ).join('\n')}
        </style>
      )}
      {children}
    </div>
  )
})


// ─── Property Primitives ────────────────────────────────────────────────────────

export const PropertyImage = withBaseProps(function PropertyImage({
  aspectRatio  = '4/3',
  objectFit    = 'cover',
  borderRadius,
  sizes        = '(max-width: 768px) 100vw, 50vw',
  priority     = false,
  style,
  animation,
  hover,
  property,
  store,
}) {
  if (!property) return null
  const photo = property.photos?.[0]
  if (!photo) return null
  const radius = borderRadius ? resolveRadius(borderRadius) : undefined

  return (
    <SmartLink
      href={`property/${property.meta_handle}`}
      username={store?.username}
      style={{
        display: 'block',
        ...(borderRadius && { borderRadius: resolveRadius(borderRadius) }),
        ...style,
      }}
      data-anim={animation.animName}
      data-delay={animation.animDelay}
      data-duration={animation.animDuration}
      data-hover={hover.hover}
      data-hover-duration={hover.hoverDuration}
    >
      <PropImage
        src={photo.url}
        aspectRatio={aspectRatio}
        alt={photo.alt ?? property.title ?? ''}
        fill
        priority={priority}
        sizes={sizes}
        style={{
          objectFit,
          ...(radius && { borderRadius: radius, overflow: 'hidden' }),
        }}
      />
    </SmartLink>
  )
})

export const PropertyTitle = withBaseProps(function PropertyTitle({
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  color = '#111111',
  as: Tag = 'h2',
  style,
  animation,
  hover,
  property,
  store,
}) {
  if (!property?.title) return null
  const resolvedFamily = fontFamily ?? (store?.fonts?.heading ? `var(--font-${store.fonts.heading})` : undefined)

  return (
    <Tag
      style={{
        margin: 0,
        ...(resolvedFamily && { fontFamily: resolvedFamily }),
        ...(fontSize       && { fontSize }),
        ...(fontWeight     && { fontWeight }),
        ...(lineHeight     && { lineHeight }),
        ...(letterSpacing  && { letterSpacing }),
        color,
        ...style,
      }}
      data-anim={animation.animName}
      data-delay={animation.animDelay}
      data-duration={animation.animDuration}
      data-hover={hover.hover}
      data-hover-duration={hover.hoverDuration}
    >
      {property.title}
    </Tag>
  )
})

export const PropertySpecs = withBaseProps(function PropertySpecs({
  showBeds    = true,
  showBaths   = true,
  showGarages = true,
  showArea    = true,
  labelBeds    = 'bed',
  labelBaths   = 'bath',
  labelGarages = 'garage',
  labelArea    = 'm²',
  gap = '1rem',
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  color     = '#636262',
  iconColor = '#636262',
  iconSize  = 15,
  style,
  animation,
  hover,
  property,
  store,
}) {
  if (!property) return null
  const { specs = {} } = property
  const hasAny = (
    (showBeds    && specs.beds    != null) ||
    (showBaths   && specs.baths   != null) ||
    (showGarages && specs.garages != null) ||
    (showArea    && specs.area    != null)
  )
  if (!hasAny) return null

  const resolvedFamily = fontFamily ?? (store?.fonts?.body ? `var(--font-${store.fonts.body})` : undefined)

  const textStyle = {
    ...(resolvedFamily && { fontFamily: resolvedFamily }),
    ...(fontSize       && { fontSize }),
    ...(fontWeight     && { fontWeight }),
    ...(lineHeight     && { lineHeight }),
    ...(letterSpacing  && { letterSpacing }),
    color,
  }

  const specStyle = {
    display:    'flex',
    alignItems: 'center',
    gap:        '0.35em',
  }

  return (
    <div
      style={{
        display:    'flex',
        flexWrap:   'wrap',
        alignItems: 'center',
        gap,
        ...style,
      }}
      data-anim={animation.animName}
      data-delay={animation.animDelay}
      data-duration={animation.animDuration}
      data-hover={hover.hover}
      data-hover-duration={hover.hoverDuration}
    >
      {showBeds    && specs.beds    != null && (
        <span style={{ ...specStyle, ...textStyle }}>
          <Icon name="bed"    size={iconSize} color={iconColor} />
          {specs.beds} {labelBeds}
        </span>
      )}
      {showBaths   && specs.baths   != null && (
        <span style={{ ...specStyle, ...textStyle }}>
          <Icon name="bath"   size={iconSize} color={iconColor} />
          {specs.baths} {labelBaths}
        </span>
      )}
      {showGarages && specs.garages != null && (
        <span style={{ ...specStyle, ...textStyle }}>
          <Icon name="garage" size={iconSize} color={iconColor} />
          {specs.garages} {labelGarages}
        </span>
      )}
      {showArea    && specs.area    != null && (
        <span style={{ ...specStyle, ...textStyle }}>
          <Icon name="area"   size={iconSize} color={iconColor} />
          {specs.area}{labelArea}
        </span>
      )}
    </div>
  )
})


// ─── Registry ──────────────────────────────────────────────────────────────────

export const componentRegistry = [
  { id: 'nav-simple',           component: NavSimple           },
  { id: 'footer-simple',        component: FooterSimple        },
  { id: 'hero-home',            component: HeroHome            },
  { id: 'property-hero',        component: PropertyHero        },
  { id: 'property-description', component: PropertyDescription },
  { id: 'property-featured',    component: PropertyFeatured    },
  { id: 'collection-grid',      component: CollectionGrid      },
  { id: 'agent-card',           component: AgentCard           },
  { id: 'content-block',        component: ContentBlock        },
  { id: 'column-block',         component: ColumnBlock         },
  { id: 'property-image',       component: PropertyImage       },
  { id: 'property-title',       component: PropertyTitle       },
  { id: 'property-specs',       component: PropertySpecs       },
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