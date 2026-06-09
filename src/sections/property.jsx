import { PropImage } from "@/components/img"
import { SmartLink } from "./old/old-layouts"
import { animationDataAttrs, hoverDataAttrs, withBaseProps } from "@/lib/render"
import { Icon } from "@/components/icons"
import { formatPrice } from "@/lib/format"
import { FONT_MAP, getFontVariables } from "@/lib/fonts"




// ─── Property Image ───────────────────────────────────────────────────────────────────

export const PropertyImage = withBaseProps(function PropertyImage({
  aspectRatio  = '4/3',
  objectFit    = 'cover',
  borderRadius,
  sizes        = '(max-width: 768px) 100vw, 50vw',
  priority     = false,
  style,
  anim = { animation: 'fade-in', animDelay: '0.05', animDuration: '0.4' } ,
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
      suppressHydrationWarning
      style={{
        display: 'block',
        position: 'relative',
        aspectRatio,
        width: '100%',
        overflow: 'hidden',
        ...(radius && { borderRadius: radius }),
        ...style,
      }}
      {...animationDataAttrs(anim)}
      {...hoverDataAttrs(hover)}
    >
      <PropImage
        src={photo.url}
        aspectRatio={aspectRatio}
        alt={photo.alt ?? property.title ?? ''}
        fill
        priority={priority}
        sizes={sizes}
        style={{ objectFit }}
      />
    </SmartLink>
  )
})







// ─── Property Title ───────────────────────────────────────────────────────────────────

export const PropertyTitle = withBaseProps(function PropertyTitle({
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  color   = '#111111',
  as: Tag = 'h2',
  style,
  anim,
  hover,
  property,
  store,
}) {
  console.log('property', property)
  if (!property?.title) return null
    const resolvedKey = FONT_MAP[fontFamily] ? fontFamily : null
    const fontVars    = resolvedKey ? getFontVariables([resolvedKey]) : ''

  return (
    <Tag
      suppressHydrationWarning
            className={fontVars || undefined}

      style={{
        margin: 0,
        fontFamily: resolvedKey ? `var(--font-${resolvedKey})` : 'var(--font-heading)',
        ...(fontSize       && { fontSize }),
        ...(fontWeight     && { fontWeight }),
        ...(lineHeight     && { lineHeight }),
        ...(letterSpacing  && { letterSpacing }),
        color,
        ...style,
      }}
      {...animationDataAttrs(anim)}
      {...hoverDataAttrs(hover)}
    >
      {property.title}
    </Tag>
  )
})










// ─── Property Price ───────────────────────────────────────────────────────────────────

export const PropertyPrice = withBaseProps(function PropertyPrice({
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  color   = '#111111',

  as: Tag = 'h2',

  style,
  anim,
  hover,

  property,
  store,
}) {
  if (!property?.price) return null
      const resolvedKey = FONT_MAP[fontFamily] ? fontFamily : null
    const fontVars    = resolvedKey ? getFontVariables([resolvedKey]) : ''
  return (
    <Tag
      suppressHydrationWarning
                  className={fontVars || undefined}

      style={{
        margin: 0,
        fontFamily: resolvedKey ? `var(--font-${resolvedKey})` : 'var(--font-heading)',
        ...(fontSize       && { fontSize }),
        ...(fontWeight     && { fontWeight }),
        ...(lineHeight     && { lineHeight }),
        ...(letterSpacing  && { letterSpacing }),
        color,
        ...style,
      }}
      {...animationDataAttrs(anim)}
      {...hoverDataAttrs(hover)}
    >
      {formatPrice(property.price, store.currency)}
    </Tag>
  )
})








// ─── Property Spec ───────────────────────────────────────────────────────────────────

export const PropertySpecs = withBaseProps(function PropertySpecs({
  showBeds     = true,
  showBaths    = true,
  showGarages  = true,
  showArea     = true,
  labelBeds    = 'bed',
  labelBaths   = 'bath',
  labelGarages = 'garage',
  labelArea    = 'm²',
  gap          = '1rem',
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  color     = '#636262',
  iconColor = '#636262',
  iconSize  = 15,
  style,
  anim,
  hover,
  property,
  store,
}) {
  if (!property) return null
  const { specs = {} } = property
  const items = [
    showBeds    && specs.beds    != null && { icon: 'bed',    value: specs.beds,    label: labelBeds    },
    showBaths   && specs.baths   != null && { icon: 'bath',   value: specs.baths,   label: labelBaths   },
    showGarages && specs.garages != null && { icon: 'garage', value: specs.garages, label: labelGarages },
    showArea    && specs.area    != null && { icon: 'area',   value: specs.area,    label: labelArea    },
  ].filter(Boolean)
  if (!items.length) return null
  
        const resolvedKey = FONT_MAP[fontFamily] ? fontFamily : null
    const fontVars    = resolvedKey ? getFontVariables([resolvedKey]) : ''
  
  const textStyle = {
        fontFamily: resolvedKey ? `var(--font-${resolvedKey})` : 'var(--font-body)',
    ...(fontSize       && { fontSize }),
    ...(fontWeight     && { fontWeight }),
    ...(lineHeight     && { lineHeight }),
    ...(letterSpacing  && { letterSpacing }),
    color,
  }
  return (
    <div
                      className={fontVars || undefined}

      suppressHydrationWarning
      style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap, ...style }}
      {...animationDataAttrs(anim)}
      {...hoverDataAttrs(hover)}
    >
      {items.map(({ icon, value, label }) => (
        <span
          key={icon}
          suppressHydrationWarning
          style={{ display: 'flex', alignItems: 'center', gap: '0.35em', ...textStyle }}
        >
          <Icon name={icon} size={iconSize} color={iconColor} />
          {value} {label}
        </span>
      ))}
    </div>
  )
})