import { getFontVariables, resolveFonts } from '@/lib/fonts'
import styles from './_styles/sections.module.css'
import Link from 'next/link'
import { SmartLink } from './layout-components'
import {  formatAddress, formatPrice } from '@/lib/format'
import { withLayoutProps } from '@/lib/render'
import { Icon } from '@/components/icons'



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





// ─── PropertyFeatured ────────────────────────────────────────────────────────
// Single featured property — clean horizontal card layout
// Scope: PROPERTY
// Props: label, ctaText, bg, color, accentColor

// getAnimClass.js — maps an animation prop to its CSS class
// Import this wherever you need to resolve animation props to classes.

export const ANIM_MAP = {
  'fade-up':    'anim-fade-up',
  'fade-down':  'anim-fade-down',
  'fade-in':    'anim-fade-in',
  'fade-left':  'anim-fade-left',
  'fade-right': 'anim-fade-right',
  'scale-up':   'anim-scale-up',
  'none':       '',
}

export const DELAY_MAP = {
  1: 'anim-delay-1',
  2: 'anim-delay-2',
  3: 'anim-delay-3',
  4: 'anim-delay-4',
  5: 'anim-delay-5',
  6: 'anim-delay-6',
}

// Returns a string of classes to spread onto className
// e.g. getAnimClass('fade-up', 2) → 'anim-fade-up anim-delay-2'
export function getAnimClass(anim, delay) {
  const animClass  = ANIM_MAP[anim] ?? ''
  const delayClass = delay ? (DELAY_MAP[delay] ?? '') : ''
  return [animClass, delayClass].filter(Boolean).join(' ')
}


// ─── PropertyFeatured — updated with animation props ─────────────────────────
//
// New props:
//   labelAnim       = 'fade-up'   animation for the label
//   imageAnim       = 'fade-up'   animation for the image
//   bodyAnim        = 'fade-up'   animation for the body
//   imageAnimDelay  = 1           delay step (1–6) for image
//   bodyAnimDelay   = 2           delay step (1–6) for body
//   Pass 'none' to any to disable individually.

export const PropertyFeatured = withLayoutProps(function PropertyFeatured({

  primaryFont         = null,
  primaryFontWeight   = null,
  secondaryFont       = null,
  secondaryFontWeight = null,

  style,
  primaryTextColor = '#111111',
  textColor        = '#111111',
  accentColor      = '#111111',

  label           = 'Featured Property',
  ctaText         = 'View Property',
  buttonColor     = '#FFFFFF',
  buttonTextColor = '#111111',

  addressFormat = 'default',
  specsColor    = null,
  iconColor     = null,

  // ── animation props ──────────────────────────────
  labelAnim      = 'fade-right',
  imageAnim      = 'fade-up',
  bodyAnim       = 'scale-up',
  imageAnimDelay = 1,
  bodyAnimDelay  = 2,
  // ─────────────────────────────────────────────────

  property,
  store,
  profile,

}) {
  if (!property) return null

  const fontPrimary   = resolveFonts(primaryFont,   store?.fonts?.heading, 'plus-jakarta-sans')
  const fontSecondary = resolveFonts(secondaryFont, store?.fonts?.body,    'dm-sans')

  const headingStyle = {
    fontFamily: `var(--font-${fontPrimary})`,
    fontWeight: primaryFontWeight   ?? store?.fonts?.heading_weight ?? 600,
    color:      primaryTextColor,
  }
  const bodyStyle = {
    fontFamily: `var(--font-${fontSecondary})`,
    fontWeight: secondaryFontWeight ?? store?.fonts?.body_weight    ?? 400,
    color:      textColor,
  }

  const resolvedIconColor = iconColor ?? accentColor
  const specStyle = { ...bodyStyle, color: specsColor ?? textColor, opacity: specsColor ? 1 : 0.65 }

  const photo   = property.photos?.[0]?.url ?? null
  const price   = property.price ? `${formatPrice(property.price, store.currency)}` : null
  const address = formatAddress(property.address, addressFormat)
  const specs   = property.specs ?? {}

  return (
    <section className={`${getFontVariables([fontPrimary, fontSecondary])} ${styles.featured}`} style={{ ...style }}>

      <p className={`${styles.featuredLabel} ${getAnimClass(labelAnim)}`} style={{ ...bodyStyle, color: accentColor }}>
        {label}
      </p>

      <div className={styles.featuredInner}>

        {photo && (
          <SmartLink
            href={`property/${property.meta_handle}`}
            username={store?.username}
            className={`${styles.featuredImageWrap} ${getAnimClass(imageAnim, imageAnimDelay)}`}
          >
            <img
              src={photo}
              alt={property.photos?.[0]?.alt ?? property.title ?? ''}
              className={styles.featuredImage}
            />
          </SmartLink>
        )}

        <div className={`${styles.featuredBody} ${getAnimClass(bodyAnim, bodyAnimDelay)}`}>
          {property.sale_status && (
            <span className={styles.featuredBadge} style={bodyStyle}>
              {property.sale_status.replace(/_/g, ' ')}
            </span>
          )}

          <h2 className={styles.featuredTitle} style={headingStyle}>{property.title}</h2>

          {address && (
            <p className={styles.featuredAddress} style={{ ...bodyStyle, opacity: 0.55 }}>
              {address}
            </p>
          )}

          <div className={styles.featuredSpecs}>
            {specs.beds    != null && (
              <span className={styles.featuredSpec} style={specStyle}>
                <Icon name="bed"    size={15} color={resolvedIconColor} />
                {specs.beds} bed
              </span>
            )}
            {specs.baths   != null && (
              <span className={styles.featuredSpec} style={specStyle}>
                <Icon name="bath"   size={15} color={resolvedIconColor} />
                {specs.baths} bath
              </span>
            )}
            {specs.garages != null && (
              <span className={styles.featuredSpec} style={specStyle}>
                <Icon name="garage" size={15} color={resolvedIconColor} />
                {specs.garages} garage
              </span>
            )}
            {specs.area    != null && (
              <span className={styles.featuredSpec} style={specStyle}>
                <Icon name="area"   size={15} color={resolvedIconColor} />
                {specs.area}m²
              </span>
            )}
          </div>

          {price && <p className={styles.featuredPrice} style={headingStyle}>{price}</p>}

          {ctaText && (
            <SmartLink
              href={`property/${property.meta_handle}`}
              username={store?.username}
              className={styles.featuredCta}
              style={{ ...bodyStyle, background: buttonColor, color: buttonTextColor }}
            >
              {ctaText}
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