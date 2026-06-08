import Image                                                                    from 'next/image'
import { Icon }                                                                 from '@/components/icons'
import { PropImage, skeletonURL }                                               from '@/components/img'
import { FooterSimple, NavSimple, SmartLink }                                   from '@/sections/layout-components'
import { PropertyDescription }                                                  from '@/sections/property'
import { AgentCard, ONLOAD_MAP, CollectionGrid, HeroHome, PropertyFeatured, PropertyHero, resolveRadius, ANIM_MAP } from '@/sections/section-components'
import { useId }                                                                from 'react'


// ─── Helpers ───────────────────────────────────────────────────────────────────

function onloadProps(onload, onloadPreset = null) {
  if (onloadPreset) return {}
  return {
    'data-onload-animation': onload.onLoadAnimation,
    'data-delay':     onload.onLoadDelay,
    'data-duration':  onload.onLoadDuration,
  }
}

function hoverProps(hover) {
  return {
    'data-hover':          hover.hover,
    'data-hover-duration': hover.hoverDuration,
  }
}


// ─── Base HOC ──────────────────────────────────────────────────────────────────

export function withBaseProps(Component) {
  return function({
    background, padding, margin, maxWidth,
    border, borderRadius, boxShadow,
    style = {},
    onLoadAnimation, onLoadDelay, onLoadDuration,
    hover, hoverDuration,
    ...props
  }) {
    return (
      <Component
        {...props}
        style={{
          background,
          padding,
          margin,
          maxWidth,
          ...(border       && { border }),
          ...(borderRadius && { borderRadius: resolveRadius(borderRadius) }),
          ...(boxShadow    && { boxShadow }),
          ...style,
        }}
        onload={{ onLoadAnimation, onLoadDelay, onLoadDuration }}
        hover={{ hover, hoverDuration }}
      />
    )
  }
}


// ─── Layout Blocks ─────────────────────────────────────────────────────────────

export const ContentBlock = withBaseProps(function ContentBlock({
  children,
  gap,
  align,
  justify,
  backgroundImage,
  backgroundImageSizes,
  backgroundImagePriority = false,
  backgroundImageOpacity  = 1,
  style,
  onload,
  hover,
}) {
  const flexStyle = {
    display:       'flex',
    flexDirection: 'column',
    ...(gap     && { gap }),
    ...(align   && { alignItems: align }),
    ...(justify && { justifyContent: justify }),
  }

  return (
    <div
      style={{
        ...flexStyle,
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
      {...onloadProps(onload)}
      {...hoverProps(hover)}
    >
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt=""
          fill
          placeholder="blur"
          blurDataURL={skeletonURL(1600, 900)}
          priority={backgroundImagePriority}
          sizes={backgroundImageSizes ?? '100vw'}
          style={{ objectFit: 'cover', opacity: backgroundImageOpacity, zIndex: 0 }}
        />
      )}
      {backgroundImage ? (
        <div style={{ ...flexStyle, position: 'relative', zIndex: 1 }}>
          {children}
        </div>
      ) : children}
    </div>
  )
})

export const ColumnBlock = withBaseProps(function ColumnBlock({
  children,
  widths     = [],
  breakpoints = [],
  gap        = '1rem',
  align      = 'stretch',
  justify    = 'start',
  style,
  onload,
  hover,
}) {
  const uid = useId()
  const cls = `col-${uid.replace(/:/g, '')}`

  return (
    <div
      className={cls}
      style={{
        display:               'grid',
        gridTemplateColumns:   widths.length ? widths.join(' ') : '1fr',
        gap,
        alignItems:            align,
        justifyContent:        justify,
        ...style,
      }}
      {...onloadProps(onload)}
      {...hoverProps(hover)}
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


// ─── Property Primitives ───────────────────────────────────────────────────────

export const PropertyImage = withBaseProps(function PropertyImage({
  aspectRatio  = '4/3',
  objectFit    = 'cover',
  borderRadius,
  sizes        = '(max-width: 768px) 100vw, 50vw',
  priority     = false,
  style,
  onload,
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
      {...onloadProps(onload)}
      {...hoverProps(hover)}
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
  color  = '#111111',
  as: Tag = 'h2',
  style,
  onload,
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
      {...onloadProps(onload)}
      {...hoverProps(hover)}
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
  gap      = '1rem',
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  color     = '#636262',
  iconColor = '#636262',
  iconSize  = 15,
  customOnloadAnimation,
  customOnloadStaggerDelay = 100,
  style,
  onload,
  hover,
  property,
  store,
}) {
  if (!property) return null
  const { specs = {} } = property

  const items = [
    showBeds    && specs.beds    != null && { icon: 'bed',    value: specs.beds,    label: labelBeds },
    showBaths   && specs.baths   != null && { icon: 'bath',   value: specs.baths,   label: labelBaths },
    showGarages && specs.garages != null && { icon: 'garage', value: specs.garages, label: labelGarages },
    showArea    && specs.area    != null && { icon: 'area',   value: specs.area,    label: labelArea },
  ].filter(Boolean)

  if (!items.length) return null

  const resolvedFamily = fontFamily ?? (store?.fonts?.body ? `var(--font-${store.fonts.body})` : undefined)

  const textStyle = {
    ...(resolvedFamily && { fontFamily: resolvedFamily }),
    ...(fontSize       && { fontSize }),
    ...(fontWeight     && { fontWeight }),
    ...(lineHeight     && { lineHeight }),
    ...(letterSpacing  && { letterSpacing }),
    color,
  }

  const onloadPreset = customOnloadAnimation ? (ANIM_MAP[customOnloadAnimation] ?? null) : null

  return (
    <div
      style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap, ...style }}
      {...onloadProps(onload, onloadPreset)}
      {...hoverProps(hover)}
    >
      {items.map(({ icon, value, label }, index) => (
        <span
          key={icon}
          data-onload-animation={onloadPreset ?? undefined}
          style={{
            display:    'flex',
            alignItems: 'center',
            gap:        '0.35em',
            ...(onloadPreset && { '--onload-delay': `${index * customOnloadStaggerDelay}ms` }),
            ...textStyle,
          }}
        >
          <Icon name={icon} size={iconSize} color={iconColor} />
          {value} {label}
        </span>
      ))}
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