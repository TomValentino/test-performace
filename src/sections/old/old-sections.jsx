import { getFontVariables, resolveFonts } from '@/lib/fonts'
import styles from './sections.module.css'
import Link from 'next/link'
import { SmartLink } from './old-layouts'
import {  formatAddress, formatPrice } from '@/lib/format'
import { withBaseProps } from '@/lib/render'
import { Icon } from '@/components/icons'
import { PropImage } from '@/components/img'



// ─── PropertyHero ────────────────────────────────────────────────────────────
export function PropertyHero({
  headingFont    = null,
  headingWeight  = null,
  bodyFont       = null,
  bodyWeight     = null,
  color          = '#ffffff',
  overlayOpacity = 0.5,
  // overridable text props
  heading        = null,
  subheading     = null,
  badgeText      = null,
  priceText      = null,
  property,
  store,
  profile,
}) {
  if (!property) return null
  const hFont = resolveFonts(headingFont, store?.fonts?.heading, 'plus-jakarta-sans')
  const bFont = resolveFonts(bodyFont,    store?.fonts?.body,    'dm-sans')
  const hWght = headingWeight ?? store?.fonts?.headingWeight ?? 600
  const bWght = bodyWeight    ?? store?.fonts?.bodyWeight    ?? 400
  const fontVars     = getFontVariables([hFont, bFont])
  const headingStyle = { fontFamily: `var(--font-${hFont})`, fontWeight: hWght, color }
  const bodyStyle    = { fontFamily: `var(--font-${bFont})`, fontWeight: bWght, color }
const photo = property.photos?.[0]?.url ?? null
  const price = priceText ?? (property.price ? `${formatPrice(property.price, store.currency)}` : null)
  const addr  = property.address ?? {}
  const line  = subheading ?? [addr.street, addr.suburb, addr.state].filter(Boolean).join(', ')
  const specs = property.specs ?? {}
  const resolvedHeading = heading ?? property.title
  const resolvedBadge   = badgeText ?? property.sale_status.replace(/_/g, ' ')

  return (
    <section className={`${fontVars} ${styles.hero}`}>
      {photo && (
        <img src={photo} alt={property.photos?.[0]?.alt ?? property.title ?? ''}  className={styles.heroImage} />
      )}
      <div className={styles.heroOverlay} style={{ opacity: overlayOpacity }} />
      <div className={styles.heroContent}>
        {resolvedBadge && (
          <span className={styles.heroBadge} style={bodyStyle}>{resolvedBadge}</span>
        )}
        <h1 className={styles.heroTitle} style={headingStyle}>{resolvedHeading}</h1>
        {line && <p className={styles.heroLine} style={bodyStyle}>{line}</p>}
        <div className={styles.heroSpecs}>
          {specs.bedrooms   != null && <span className={styles.heroSpec} style={bodyStyle}>{specs.bedrooms} bed</span>}
          {specs.bathrooms  != null && <span className={styles.heroSpec} style={bodyStyle}>{specs.bathrooms} bath</span>}
          {specs.garages    != null && <span className={styles.heroSpec} style={bodyStyle}>{specs.garages} garage</span>}
          {specs.floor_size != null && <span className={styles.heroSpec} style={bodyStyle}>{specs.floor_size}m²</span>}
          {specs.land_size  != null && <span className={styles.heroSpec} style={bodyStyle}>{specs.land_size}m² land</span>}
        </div>
        {price && <p className={styles.heroPrice} style={headingStyle}>{price}</p>}
      </div>
    </section>
  )
}
// ─── CollectionGrid ───────────────────────────────────────────────────────────
export function CollectionGrid({
  headingFont   = null,
  headingWeight = null,
  bodyFont      = null,
  bodyWeight    = null,
  bg            = '#f9f8f6',
  color         = '#1a1a1a',
  columns       = 2,
  // overridable text
  title         = null,
  subtitle      = null,
  emptyText     = null,
  collection,
  store,
  profile,
}) {
  if (!collection) return null
  const hFont = resolveFonts(headingFont, store?.fonts?.heading, 'plus-jakarta-sans')
  const bFont = resolveFonts(bodyFont,    store?.fonts?.body,    'dm-sans')
  const hWght = headingWeight ?? store?.fonts?.headingWeight ?? 600
  const bWght = bodyWeight    ?? store?.fonts?.bodyWeight    ?? 400
  const fontVars     = getFontVariables([hFont, bFont])
  const headingStyle = { fontFamily: `var(--font-${hFont})`, fontWeight: hWght, color }
  const bodyStyle    = { fontFamily: `var(--font-${bFont})`, fontWeight: bWght, color }
  const properties = collection.properties ?? []

  const resolvedTitle    = title    ?? collection.name
  const resolvedSubtitle = subtitle ?? `${properties.length} ${properties.length === 1 ? 'property' : 'properties'}`
  const resolvedEmpty    = emptyText ?? 'No properties yet.'

  return (
    <section className={`${fontVars} ${styles.collection}`} style={{ background: bg }}>
      <h2 className={styles.collectionTitle} style={headingStyle}>{resolvedTitle}</h2>
      <p  className={styles.collectionCount} style={bodyStyle}>{resolvedSubtitle}</p>
      {properties.length === 0 && (
        <p className={styles.collectionEmpty} style={bodyStyle}>{resolvedEmpty}</p>
      )}
      <div className={styles.collectionGrid} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {properties.map(p => {
          const photo = p.photos?.[0]?.url ?? null
          const price = p.price ? `${formatPrice(p.price, store.currency)}`  : null
          const addr  = p.address ?? {}
          const line  = [addr.street, addr.suburb, addr.state].filter(Boolean).join(', ')
          const specs = p.specs ?? {}
          return (
            <SmartLink
              key={p.id}
              prefetch={true}
              href={`property/${p.meta_handle}`}
              username={store.username}
              className={styles.card}
            >
              {photo && (
                <div className={styles.cardImageWrap}>
                  <img src={photo} alt={p.photos?.[0]?.alt ?? p.title ?? ''} className={styles.cardImage} />
                </div>
              )}
              <div className={styles.cardBody}>
                {p.sale_status && <span className={styles.cardStatus} style={bodyStyle}>{p.sale_status.replace(/_/g, ' ')}</span>}
                <h3 className={styles.cardTitle} style={headingStyle}>{p.title}</h3>
                {line && <p className={styles.cardAddress} style={bodyStyle}>{line}</p>}
                <div className={styles.cardSpecs}>
                  {specs.bedrooms   != null && <span className={styles.cardSpec} style={bodyStyle}>{specs.bedrooms} bed</span>}
                  {specs.bathrooms  != null && <span className={styles.cardSpec} style={bodyStyle}>{specs.bathrooms} bath</span>}
                  {specs.floor_size != null && <span className={styles.cardSpec} style={bodyStyle}>{specs.floor_size}m²</span>}
                </div>
                {price && <p className={styles.cardPrice} style={headingStyle}>{price}</p>}
              </div>
            </SmartLink>
          )
        })}
      </div>
    </section>
  )
}




export function HeroHome({
  headingFont   = null,
  headingWeight = null,
  bodyFont      = null,
  bodyWeight    = null,
  color         = '#111111',
  bg            = '#f9f8f6',
  heading       = null,
  subheading    = null,
  ctaText       = null,
  ctaHref       = '/',
  store,
  profile,
}) {
  const hFont    = resolveFonts(headingFont, store?.fonts?.heading, 'plus-jakarta-sans')
  const bFont    = resolveFonts(bodyFont,    store?.fonts?.body,    'dm-sans')
  const hWght    = headingWeight ?? store?.fonts?.headingWeight ?? 600
  const bWght    = bodyWeight    ?? store?.fonts?.bodyWeight    ?? 400
  const fontVars = getFontVariables([hFont, bFont])

  const headingStyle = { fontFamily: `var(--font-${hFont})`, fontWeight: hWght, color }
  const bodyStyle    = { fontFamily: `var(--font-${bFont})`, fontWeight: bWght, color }

  const resolvedHeading    = heading    ?? `Welcome to ${store?.name ?? store?.username}`
  const resolvedSubheading = subheading ?? profile?.title ?? null

  return (
    <section className={fontVars} style={{ background: bg, padding: 'clamp(80px, 12vw, 160px) 40px', textAlign: 'center' }}>
      <h1 style={{ ...headingStyle, fontSize: 'clamp(36px, 6vw, 80px)', marginBottom: '20px' }}>
        {resolvedHeading}
      </h1>
      {resolvedSubheading && (
        <p style={{ ...bodyStyle, fontSize: 'clamp(16px, 2vw, 22px)', opacity: 0.6, marginBottom: '40px' }}>
          {resolvedSubheading}
        </p>
      )}
      {ctaText && (
        <SmartLink href={ctaHref} username={store?.username} style={{
          ...bodyStyle,
          display: 'inline-block',
          padding: '14px 32px',
          borderRadius: '8px',
          background: color,
          color: bg,
          fontWeight: 500,
        }}>
          {ctaText}
        </SmartLink>
      )}
    </section>
  )
}

// tokens.js
// ─── Maps ──────────────────────────────────────────────────────────────────
// Keys = dropdown options for UI. Values = CSS applied as inline override.
// CSS module clamps are always the default — these only apply when prop is set.

const SPACING = {
  'xs':  'clamp(8px,  1vw,   12px)',
  'sm':  'clamp(12px, 1.5vw, 16px)',
  'md':  'clamp(16px, 2vw,   24px)',
  'lg':  'clamp(24px, 3vw,   40px)',
  'xl':  'clamp(40px, 5vw,   64px)',
}

const FONT_SIZE = {
  'xs':  'clamp(10px, 1vw,   12px)',
  'sm':  'clamp(12px, 1.2vw, 14px)',
  'md':  'clamp(14px, 1.5vw, 16px)',
  'lg':  'clamp(18px, 2vw,   24px)',
  'xl':  'clamp(24px, 3vw,   32px)',
  '2xl': 'clamp(32px, 4vw,   48px)',
  '3xl': 'clamp(40px, 5vw,   64px)',
}

const RADIUS = {
  'none': '0px',
  'sm':   '4px',
  'md':   '8px',
  'lg':   '16px',
  'xl':   '24px',
  'full': '9999px',
}



// ─── Resolvers ─────────────────────────────────────────────────────────────
// Pass a key → get the token value
// Pass a raw value like '12px' → passes straight through
// Pass nothing → returns undefined (no inline style applied, CSS default wins)

export const resolveSpacing  = (val) => val == null ? undefined : (SPACING[val]   ?? val)
export const resolveFontSize = (val) => val == null ? undefined : (FONT_SIZE[val] ?? val)
export const resolveRadius   = (val) => val == null ? undefined : (RADIUS[val]    ?? val)

// ─── Keys (for building dropdown UIs) ──────────────────────────────────────
export const SPACING_OPTIONS   = Object.keys(SPACING)    // ['xs','sm','md','lg','xl']
export const FONT_SIZE_OPTIONS = Object.keys(FONT_SIZE)  // ['xs','sm','md','lg','xl','2xl','3xl']
export const RADIUS_OPTIONS    = Object.keys(RADIUS)     // ['none','sm','md','lg','xl','full']


 
// getAnimClass.js — maps animation prop to its CSS class.
// Delay + duration are inline style vars, not utility classes.
//
// Usage:
//   className={getAnimClass('fade-up')}
//   style={{ '--animation-delay': '0.2s', '--animation-duration': '0.7s' }}


// animations.js
export const ANIM_MAP  = { 'fade-up': 'fade-up', 'fade-down': 'fade-down', 'fade-in': 'fade-in', 'fade-left': 'fade-left', 'fade-right': 'fade-right', 'scale-up': 'scale-up', 'scale-down': 'scale-down', 'slide-up': 'slide-up', 'slide-down': 'slide-down', 'blur-in': 'blur-in', 'pop-in': 'pop-in', 'flip-x': 'flip-x', 'none': null }
export const HOVER_MAP = { 'lift': 'lift', 'lift-sm': 'lift-sm', 'scale': 'scale', 'scale-sm': 'scale-sm', 'fade': 'fade', 'brighten': 'brighten', 'dim': 'dim', 'glow': 'glow', 'glow-inset': 'glow-inset', 'underline': 'underline', 'bg-tint': 'bg-tint', 'border-reveal': 'border-reveal', 'none': null }


// PropertyFeatured.jsx





export const PropertyFeatured = withBaseProps(function PropertyFeatured({

  // ─── Fonts ─────────────────────────────────────────────────────────────────
  primaryFont,
  secondaryFont,

  // ─── Label ─────────────────────────────────────────────────────────────────
  labelText  = 'Featured Property',
  labelShow  = true,
  labelColor = '#111111',

  // ─── Badge ─────────────────────────────────────────────────────────────────
  badgeBackground = 'transparent',
  badgeColor      = '#111111',
  badgeRadius     = 'sm',

  // ─── Title ─────────────────────────────────────────────────────────────────
  titleColor = '#111111',

  // ─── Address ───────────────────────────────────────────────────────────────
  addressColor = '#888888',

  // ─── Specs ─────────────────────────────────────────────────────────────────
  specsColor       = '#636262',
  specsIconColor   = '#636262',

  // ─── Price ─────────────────────────────────────────────────────────────────
  priceColor = '#111111',

  // ─── Button ────────────────────────────────────────────────────────────────
  buttonText          = 'View Property',
  buttonTextColor     = '#FFFFFF',
  buttonColor         = '#111111',
  buttonRadius        = 'sm',
  buttonBorderColor   = 'transparent',
  buttonBorderWidth   = '0px',
  buttonHover         = 'scale',
  buttonHoverDuration = '0.2',

  // ─── Image ─────────────────────────────────────────────────────────────────
  photoAspectRatio   = '4/3',
  photoBorderRadius  = 'md',
  photoHover         = 'lift',
  photoHoverDuration = '0.2',

  // ─── Layout ────────────────────────────────────────────────────────────────
  layout = 'left',
  gap,

  // ─── Animations ────────────────────────────────────────────────────────────
  animations = {
    label: { name: 'fade-up',    delay: '0.2',    duration: '0.4' },
    image: { name: 'fade-right', delay: '0.1', duration: '0.6' },
    body:  { name: 'fade-up',    delay: '0.3',  duration: '0.5' },
  },

  property, store, profile,
}) {
  if (!property) return null

  const fontPrimary   = resolveFonts(primaryFont,   store?.fonts?.heading, 'plus-jakarta-sans')
  const fontSecondary = resolveFonts(secondaryFont, store?.fonts?.body,    'dm-sans')
  const headingStyle  = { fontFamily: `var(--font-${fontPrimary})`,   fontWeight: store?.fonts?.heading_weight ?? 600 }
  const bodyStyle     = { fontFamily: `var(--font-${fontSecondary})`, fontWeight: store?.fonts?.body_weight   ?? 400 }

  const photo   = property.photos?.[0]?.url ?? null
  const price   = property.price ? formatPrice(property.price, store.currency) : null
  const address = formatAddress(property.address, 'default')
  const { specs = {} } = property

  return (
    <section className={`${getFontVariables([fontPrimary, fontSecondary])} ${styles.featured}`}>

      {labelShow && (
        <p
          className={styles.featuredLabel}
          style={{ ...bodyStyle, color: labelColor}}
          data-onload-animation={ANIM_MAP[animations.label.name]}
          data-delay={animations.label.delay}
          data-duration={animations.label.duration}
        >
          {labelText}
        </p>
      )}

      <div
        className={styles.featuredInner}
        style={{
          direction: layout === 'right' ? 'rtl' : undefined,
          gap:       resolveSpacing(gap),
        }}
      >
        {photo && (
          <SmartLink
            href={`property/${property.meta_handle}`}
            username={store?.username}
            className={styles.featuredImageWrap}
            style={{ direction: layout === 'right' ? 'ltr' : undefined, borderRadius: resolveRadius(photoBorderRadius) }}
            data-onload-animation={ANIM_MAP[animations.image.name]}
            data-delay={animations.image.delay}
            data-duration={animations.image.duration}
            data-hover={HOVER_MAP[photoHover]}
            data-hover-duration={photoHoverDuration}
          >
            <PropImage
              src={photo}
              aspectRatio={photoAspectRatio}
              alt={property.photos?.[0]?.alt ?? property.title ?? ''}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className={styles.featuredImage}
            
            />
          </SmartLink>
        )}

        <div
          className={styles.featuredBody}
          style={{ direction: layout === 'right' ? 'ltr' : undefined }}
          data-onload-animation={ANIM_MAP[animations.body.name]}
          data-delay={animations.body.delay}
          data-duration={animations.body.duration}
        >
          {property.sale_status && (
            <span
              className={styles.featuredBadge}
              style={{
                ...bodyStyle,
                color:        badgeColor,
                background:   badgeBackground,
                borderRadius: resolveRadius(badgeRadius),
                padding:      badgeBackground !== 'transparent' ? 'clamp(3px, 0.4vw, 5px) clamp(8px, 1vw, 12px)' : undefined,
              }}
            >
              {property.sale_status.replace(/_/g, ' ')}
            </span>
          )}

          <h2
            className={styles.featuredTitle}
            style={{ ...headingStyle, color: titleColor}}
          >
            {property.title}
          </h2>

          {address && (
            <p
              className={styles.featuredAddress}
              style={{ color: addressColor, }}
            >
              {address}
            </p>
          )}

          <div
            className={styles.featuredSpecs}
            style={{  }}
          >
            {specs.beds    != null && <span className={styles.featuredSpec} style={{ ...bodyStyle, color: specsColor,  }}><Icon name="bed"    size={15} color={specsIconColor} />{specs.beds} bed</span>}
            {specs.baths   != null && <span className={styles.featuredSpec} style={{ ...bodyStyle, color: specsColor, }}><Icon name="bath"   size={15} color={specsIconColor} />{specs.baths} bath</span>}
            {specs.garages != null && <span className={styles.featuredSpec} style={{ ...bodyStyle, color: specsColor,}}><Icon name="garage" size={15} color={specsIconColor} />{specs.garages} garage</span>}
            {specs.area    != null && <span className={styles.featuredSpec} style={{ ...bodyStyle, color: specsColor, }}><Icon name="area"   size={15} color={specsIconColor} />{specs.area}m²</span>}
          </div>

          {price && (
            <p
              className={styles.featuredPrice}
              style={{ ...headingStyle, color: priceColor }}
            >
              {price}
              {property.sale_status === 'for_rent' && (
                <span className={styles.featuredPriceSuffix}>/month</span>
              )}
            </p>
          )}

          {buttonText && (
            <SmartLink
              href={`property/${property.meta_handle}`}
              username={store?.username}
              className={styles.featuredCta}
              style={{
                ...bodyStyle,
                background:   buttonColor,
                color:        buttonTextColor,
                borderRadius: resolveRadius(buttonRadius),
                borderColor:  buttonBorderColor,
                borderWidth:  buttonBorderWidth,
                borderStyle:  buttonBorderWidth !== '0px' ? 'solid' : 'none',
              }}
              data-hover={HOVER_MAP[buttonHover]}
              data-hover-duration={buttonHoverDuration}
            >
              {buttonText}
            </SmartLink>
          )}
        </div>
      </div>
    </section>
  )
})
// ─── AgentCard ───────────────────────────────────────────────────────────────
// Agent bio + contact — simple clean card
// Scope: none (uses profile directly)
// Props: heading, subheading, ctaText, ctaHref, bg, color, accentColor

export function AgentCard({
  headingFont   = null,
  headingWeight = null,
  bodyFont      = null,
  bodyWeight    = null,
  bg            = '#f9f8f6',
  color         = '#111111',
  accentColor   = '#111111',
  heading       = null,
  subheading    = null,
  ctaText       = 'Get in Touch',
  ctaHref       = null,
  store,
  profile,
}) {
  const hFont    = resolveFonts(headingFont, store?.fonts?.heading, 'plus-jakarta-sans')
  const bFont    = resolveFonts(bodyFont,    store?.fonts?.body,    'dm-sans')
  const hWght    = headingWeight ?? store?.fonts?.headingWeight ?? 600
  const bWght    = bodyWeight    ?? store?.fonts?.bodyWeight    ?? 400
  const fontVars = getFontVariables([hFont, bFont])

  const headingStyle = { fontFamily: `var(--font-${hFont})`, fontWeight: hWght, color }
  const bodyStyle    = { fontFamily: `var(--font-${bFont})`, fontWeight: bWght, color }

  const resolvedHeading    = heading    ?? profile?.name    ?? store?.username
  const resolvedSubheading = subheading ?? profile?.title   ?? null
  const resolvedCta        = ctaHref    ?? (profile?.email ? `mailto:${profile.email}` : null)

  return (
    <section className={`${fontVars} ${styles.agent}`} style={{ background: bg }}>
      <div className={styles.agentInner}>
        {profile?.photo && (
          <img src={profile.photo} alt={resolvedHeading ?? ''} className={styles.agentPhoto} />
        )}
        <div className={styles.agentBody}>
          <h2 className={styles.agentName} style={headingStyle}>{resolvedHeading}</h2>
          {resolvedSubheading && (
            <p className={styles.agentTitle} style={{ ...bodyStyle, opacity: 0.6 }}>{resolvedSubheading}</p>
          )}
          {profile?.about && (
            <p className={styles.agentAbout} style={bodyStyle}>{profile.about}</p>
          )}
          <div className={styles.agentContact}>
            {profile?.phone && (
              <a href={`tel:${profile.phone}`} className={styles.agentContactItem} style={bodyStyle}>{profile.phone}</a>
            )}
            {profile?.email && (
              <a href={`mailto:${profile.email}`} className={styles.agentContactItem} style={bodyStyle}>{profile.email}</a>
            )}
          </div>
          {ctaText && resolvedCta && (
            <a
              href={resolvedCta}
              className={styles.agentCta}
              style={{ ...bodyStyle, background: accentColor, color: bg }}
            >
              {ctaText}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}