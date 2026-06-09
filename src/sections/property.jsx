import { PropImage } from "@/components/img"
import { SmartLink } from "./old/old-layouts"
import { animationDataAttrs, hoverDataAttrs, withBaseProps } from "@/lib/render"
import { Icon } from "@/components/icons"
import { formatPrice } from "@/lib/format"
import { FONT_MAP, getFontVariables } from "@/lib/fonts"
import styles from './property.module.css'




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

const SPECS_CONFIG = [
  { key: 'beds',    icon: 'bed',      label: 'Beds'    },
  { key: 'baths',   icon: 'bath',     label: 'Baths'   },
  { key: 'garages', icon: 'garage',   label: 'Garages' },
  { key: 'area',    icon: 'area',     label: 'm²'      },
]
 
export const PropertySpecs = withBaseProps(function PropertySpecs({
  showBeds     = true,
  showBaths    = true,
  showGarages  = true,
  showArea     = true,
  gap          = '1.5rem',
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  color,
  iconColor,
  iconSize     = 16,
  animStagger  = 0.08,
  anim         = { animation: 'fade-up', animDuration: '0.5', animDelay: '0.1' },
  hover,
  style,
  property,
}) {
  if (!property) return null
 
  const { specs = {} } = property
  const SHOW = { beds: showBeds, baths: showBaths, garages: showGarages, area: showArea }
  const items = SPECS_CONFIG.filter(({ key }) => SHOW[key] && specs[key] != null)
  if (!items.length) return null
 
  const hasStagger = animStagger != null && anim?.animation
 
  const textStyle = {
    ...(fontFamily    && { fontFamily    }),
    ...(fontSize      && { fontSize      }),
    ...(fontWeight    && { fontWeight    }),
    ...(lineHeight    && { lineHeight    }),
    ...(letterSpacing && { letterSpacing }),
    ...(color         && { color         }),
  }
 
  return (
    <div
      suppressHydrationWarning
      className={styles.wrap}
      style={{ gap, ...style }}
    >
      {items.map(({ key, icon, label }, i) => (
        <span
          key={key}
          suppressHydrationWarning
          className={styles.item}
          style={textStyle}
          {...(hasStagger ? animationDataAttrs({
            ...anim,
            animDelay: (parseFloat(anim.animDelay ?? 0) + i * animStagger).toFixed(2),
          }) : animationDataAttrs(anim))}
          {...hoverDataAttrs(hover)}
        >
          <Icon name={icon} size={iconSize} color={iconColor} />
          {specs[key]} {label}
        </span>
      ))}
    </div>
  )
})




// ─── Property Price ───────────────────────────────────────────────────────────────────


const SPEC_CONFIG = {
  beds:       { icon: 'bed',      label: 'Beds'    },
  baths:      { icon: 'bath',     label: 'Baths'   },
  garages:    { icon: 'garage',   label: 'Garages' },
  area:       { icon: 'area',     label: 'Size'    },
  lot_size:   { icon: 'area',     label: 'Lot'     },
  year_built: { icon: 'calendar', label: 'Built'   },
  stories:    { icon: 'stairs',   label: 'Stories' },
}
 
export const PropertySpec = withBaseProps(function PropertySpec({
  spec         = 'beds',
  label,
  iconSize     = 24,
  iconColor,
  gap          = '0.5rem',
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  color        = '#111',
  labelColor,
  labelSize,
  style,
  anim,
  hover,
  property,
}) {
  if (!property) return null
  const value = property.specs?.[spec]
  if (value == null) return null
 
  const config     = SPEC_CONFIG[spec]
  const resolvedLabel = label ?? config?.label
  const resolvedIcon  = config?.icon
 
  const textStyle = {
    ...(fontFamily    && { fontFamily    }),
    ...(fontSize      && { fontSize      }),
    ...(fontWeight    && { fontWeight    }),
    ...(lineHeight    && { lineHeight    }),
    ...(letterSpacing && { letterSpacing }),
    color,
  }
 
  return (
    <div
      suppressHydrationWarning
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap, ...style }}
      {...animationDataAttrs(anim)}
      {...hoverDataAttrs(hover)}
    >
      {resolvedIcon && (
        <Icon name={resolvedIcon} size={iconSize} color={iconColor ?? color} />
      )}
      <span style={{ ...textStyle, fontWeight: fontWeight ?? 600 }}>{value}</span>
      {resolvedLabel && (
        <span style={{
          ...textStyle,
          fontSize:   labelSize  ?? '0.8em',
          color:      labelColor ?? color,
          fontWeight: 400,
        }}>
          {resolvedLabel}
        </span>
      )}
    </div>
  )
})







// ─── Slug → label + icon ──────────────────────────────────────────────────────
 
const AMENITY_MAP = {
  gym:                  { label: 'Gym',                    icon: 'gym'          },
  pool:                 { label: 'Pool',                   icon: 'pool'         },
  rooftop_terrace:      { label: 'Rooftop Terrace',        icon: 'terrace'      },
  concierge:            { label: 'Concierge',              icon: 'concierge'    },
  air_conditioning:     { label: 'Air Conditioning',       icon: 'ac'           },
  secure_parking:       { label: 'Secure Parking',         icon: 'garage'       },
  intercom:             { label: 'Intercom',               icon: 'intercom'     },
  built_in_wardrobes:   { label: 'Built-in Wardrobes',     icon: 'wardrobe'     },
  dishwasher:           { label: 'Dishwasher',             icon: 'dishwasher'   },
  balcony:              { label: 'Balcony',                icon: 'balcony'      },
  garden:               { label: 'Garden',                 icon: 'garden'       },
  lake_view:            { label: 'Lake View',              icon: 'lake'         },
  ocean_view:           { label: 'Ocean View',             icon: 'ocean'        },
  city_view:            { label: 'City View',              icon: 'city'         },
  solar_panels:         { label: 'Solar Panels',           icon: 'solar'        },
  ev_charging:          { label: 'EV Charging',            icon: 'ev'           },
  home_theatre:         { label: 'Home Theatre',           icon: 'theatre'      },
  wine_cellar:          { label: 'Wine Cellar',            icon: 'wine'         },
  sauna:                { label: 'Sauna',                  icon: 'sauna'        },
  bbq:                  { label: 'BBQ Area',               icon: 'bbq'          },
  coworking:            { label: 'Co-Working Space',       icon: 'coworking'    },
  grocery_store:        { label: 'In-House Grocery Store', icon: 'grocery'      },
  fine_dining:          { label: 'Fine Dining',            icon: 'dining'       },
  fireplace:            { label: 'Fireplace',              icon: 'fireplace'    },
  storage:              { label: 'Storage',                icon: 'storage'      },
  laundry:              { label: 'Laundry',                icon: 'laundry'      },
  pet_friendly:         { label: 'Pet Friendly',           icon: 'pet'          },
  wheelchair_access:    { label: 'Wheelchair Access',      icon: 'accessibility'},
}
 
export const PropertyAmenities = withBaseProps(function PropertyAmenities({
  gap             = '0.5rem',
  itemPadding     = '0.5rem 1rem',
  itemRadius      = '999px',
  itemBackground,
  itemBorder,
  itemShadow,
  iconSize        = 16,
  iconColor,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  color,
  animStagger     = 0.04,
  anim            = { animation: 'fade-up', animDuration: '0.4', animDelay: '0.1' },
  hover,
  style,
  property,
}) {
  if (!property?.amenities?.length) return null
 
  const hasStagger = animStagger != null && anim?.animation
 
  const pillStyle = {
    padding:      itemPadding,
    borderRadius: itemRadius,
    ...(itemBackground && { background:  itemBackground }),
    ...(itemBorder     && { border:      itemBorder     }),
    ...(itemShadow     && { boxShadow:   itemShadow     }),
    ...(fontFamily     && { fontFamily                  }),
    ...(fontSize       && { fontSize                    }),
    ...(fontWeight     && { fontWeight                  }),
    ...(lineHeight     && { lineHeight                  }),
    ...(letterSpacing  && { letterSpacing               }),
    ...(color          && { color                       }),
  }
 
  return (
    <div
      suppressHydrationWarning
      className={styles.wrap}
      style={{ gap, ...style }}
    >
      {property.amenities.map((slug, i) => {
        const entry = AMENITY_MAP[slug]
        const label = entry?.label ?? slug.replace(/_/g, ' ')
        const icon  = entry?.icon
 
        return (
          <span
            key={slug}
            suppressHydrationWarning
            className={styles.pill}
            style={pillStyle}
            {...(hasStagger ? animationDataAttrs({
              ...anim,
              animDelay: (parseFloat(anim.animDelay ?? 0) + i * animStagger).toFixed(2),
            }) : animationDataAttrs(anim))}
            {...hoverDataAttrs(hover)}
          >
            {icon && <Icon name={icon} size={iconSize} color={iconColor ?? color} />}
            {label}
          </span>
        )
      })}
    </div>
  )
})
 