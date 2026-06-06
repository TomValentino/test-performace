import { getFontVariables } from '@/lib/fonts'
import styles from './_styles/sections.module.css'
import { resolveFonts } from './section-library'
import Link from 'next/link'
import { SmartLink } from './layout-components'


// ─── PropertyHero ────────────────────────────────────────────────────────────
export function PropertyHero({
  headingFont   = null,
  headingWeight = null,
  bodyFont      = null,
  bodyWeight    = null,
  color         = '#ffffff',
  overlayOpacity = 0.5,
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

  const photo = property.photos?.[0] ?? null
  const price = property.price ? `$${Number(property.price).toLocaleString()}` : null
  const addr  = property.address ?? {}
  const line  = [addr.street, addr.suburb, addr.state].filter(Boolean).join(', ')
  const specs = property.specs ?? {}

  return (
    <section className={`${fontVars} ${styles.hero}`}>

      {photo && (
        <img src={photo} alt={property.title ?? ''} className={styles.heroImage} />
      )}
      <div className={styles.heroOverlay} style={{ opacity: overlayOpacity }} />

      <div className={styles.heroContent}>
        {property.sale_status && (
          <span className={styles.heroBadge} style={bodyStyle}>{property.sale_status}</span>
        )}
        <h1 className={styles.heroTitle} style={headingStyle}>{property.title}</h1>
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

  return (
    <section className={`${fontVars} ${styles.collection}`} style={{ background: bg }}>

      <h2 className={styles.collectionTitle} style={headingStyle}>{collection.name}</h2>
      <p  className={styles.collectionCount} style={bodyStyle}>
        {properties.length} {properties.length === 1 ? 'property' : 'properties'}
      </p>

      {properties.length === 0 && (
        <p className={styles.collectionEmpty} style={bodyStyle}>No properties yet.</p>
      )}

      <div className={styles.collectionGrid} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {properties.map(p => {
          const photo  = p.photos?.[0] ?? null
          const price  = p.price ? `$${Number(p.price).toLocaleString()}` : null
          const addr   = p.address ?? {}
          const line   = [addr.street, addr.suburb, addr.state].filter(Boolean).join(', ')
          const specs  = p.specs ?? {}
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
                  <img src={photo} alt={p.title ?? ''} className={styles.cardImage} />
                </div>
              )}
              <div className={styles.cardBody}>
                {p.sale_status && <span className={styles.cardStatus} style={bodyStyle}>{p.sale_status}</span>}
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