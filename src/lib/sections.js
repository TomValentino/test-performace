import { getFontVariables } from '@/lib/fonts'
import { PropImage } from '@/components/img'
import styles from './sections.module.css'

// ---------------------------------------------------------------------------
// NAV
// ---------------------------------------------------------------------------
export function NavSimple({
  headingFont = 'plus-jakarta-sans',
  headlineWeight = 300,
  bodyFont = 'dm_sans',
  store,
  profile,
}) {
  const fontVars = getFontVariables([headingFont, bodyFont])
  return (
    <section className={`${fontVars} ${styles.nav}`}>
      <h1
        className={styles.navHeading}
        style={{ fontFamily: `var(--font-${headingFont})`, fontWeight: headlineWeight }}
      >
        Luxury Living, by {store.username ?? 'No username'}
      </h1>
      <p className={styles.navBody} style={{ fontFamily: `var(--font-${bodyFont})` }}>
        Discover premium properties — {profile.title ?? 'Unknown person'}
      </p>
    </section>
  )
}

// ---------------------------------------------------------------------------
// FOOTER
// ---------------------------------------------------------------------------
export function FooterSimple({ bg = '#f9f9f9', color = '#999', text, store, profile }) {
  const fallback = [profile?.name ?? store?.username, profile?.email, profile?.phone]
    .filter(Boolean)
    .join('  ·  ')
  return (
    <footer className={styles.footer} style={{ background: bg, color }}>
      {text ?? fallback}
    </footer>
  )
}

// ---------------------------------------------------------------------------
// PROPERTY HERO
// ---------------------------------------------------------------------------
export function PropertyHero({
  headingFont = 'plus-jakarta-sans',
  overlayOpacity = 0.45,
  accentColor = '#fff',
  property,
}) {
  if (!property) return null
  const fontVars = getFontVariables([headingFont])
  const photo = property.photos?.[0] ?? null
  const price = property.price ? `$${Number(property.price).toLocaleString()}` : null
  const addr  = property.address ?? {}
  const line  = [addr.street, addr.suburb, addr.state].filter(Boolean).join(', ')
  const specs = property.specs ?? {}
  return (
    <section className={`${fontVars} ${styles.hero}`}>
      {photo && (
        <PropImage
          src={photo}
          alt={property.title ?? ''}
          fill
          priority
          sizes="100vw"
          style={{ opacity: overlayOpacity }}
        />
      )}
      <div className={styles.heroOverlay} />
      <div className={styles.heroContent} style={{ color: accentColor }}>
        {property.sale_status && (
          <span
            className={styles.heroStatusBadge}
            style={{ background: accentColor, color: '#111' }}
          >
            {property.sale_status}
          </span>
        )}
        <h1
          className={styles.heroTitle}
          style={{ fontFamily: `var(--font-${headingFont})` }}
        >
          {property.title}
        </h1>
        {line && <p className={styles.heroAddress}>{line}</p>}
        {(specs.bedrooms != null || specs.bathrooms != null || specs.floor_size != null) && (
          <div className={styles.heroSpecs}>
            {specs.bedrooms   != null && <Spec label="Beds"   value={specs.bedrooms} />}
            {specs.bathrooms  != null && <Spec label="Baths"  value={specs.bathrooms} />}
            {specs.garages    != null && <Spec label="Garage" value={specs.garages} />}
            {specs.floor_size != null && <Spec label="Floor"  value={`${specs.floor_size}m²`} />}
            {specs.land_size  != null && <Spec label="Land"   value={`${specs.land_size}m²`} />}
          </div>
        )}
        {price && <p className={styles.heroPrice}>{price}</p>}
      </div>
    </section>
  )
}

function Spec({ label, value }) {
  return (
    <div className={styles.spec}>
      <div className={styles.specValue}>{value}</div>
      <div className={styles.specLabel}>{label}</div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// COLLECTION GRID
// ---------------------------------------------------------------------------
export function CollectionGrid({
  headingFont  = 'libre-baskerville',
  bodyFont     = 'josefin-sans',
  bg           = '#f9f8f6',
  accentColor  = '#1a1a1a',
  columns      = 2,
  collection,
}) {
  if (!collection) return null
  const fontVars = getFontVariables([headingFont, bodyFont])
  const properties =
    collection.properties ??
    collection.collection_properties?.map((cp) => cp.property).filter(Boolean) ??
    []
  return (
    <section className={`${fontVars} ${styles.collection}`} style={{ background: bg }}>
      <div className={styles.collectionInner}>
        <div className={styles.collectionHeader}>
          <h1
            className={styles.collectionTitle}
            style={{ fontFamily: `var(--font-${headingFont})`, color: accentColor }}
          >
            {collection.name}
          </h1>
          <p className={styles.collectionCount} style={{ fontFamily: `var(--font-${bodyFont})` }}>
            {properties.length} {properties.length === 1 ? 'property' : 'properties'}
          </p>
        </div>
        {properties.length === 0 ? (
          <div className={styles.collectionEmpty}>No properties yet.</div>
        ) : (
          <div
            className={styles.collectionGrid}
            style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
          >
            {properties.map((p) => (
              <PropertyCard key={p.id} property={p} accentColor={accentColor} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function PropertyCard({ property, accentColor }) {
  const photo = property.photos?.[0] ?? null
  const price = property.price ? `$${Number(property.price).toLocaleString()}` : null
  const addr  = property.address ?? {}
  const line  = [addr.street, addr.suburb, addr.state].filter(Boolean).join(', ')
  const specs = property.specs ?? {}
  return (
    <div className={styles.card}>
      {photo && (
        <div className={styles.cardImageWrap}>
          <PropImage
            src={photo}
            alt={property.title ?? ''}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className={styles.cardBody}>
        {property.sale_status && (
          <span className={styles.cardStatus} style={{ color: accentColor }}>
            {property.sale_status}
          </span>
        )}
        <h3 className={styles.cardTitle}>{property.title}</h3>
        {line && <p className={styles.cardAddress}>{line}</p>}
        <div className={styles.cardChips}>
          {specs.bedrooms   != null && <Chip label={`${specs.bedrooms} bed`} />}
          {specs.bathrooms  != null && <Chip label={`${specs.bathrooms} bath`} />}
          {specs.floor_size != null && <Chip label={`${specs.floor_size}m²`} />}
        </div>
        {price && (
          <p className={styles.cardPrice} style={{ color: accentColor }}>
            {price}
          </p>
        )}
      </div>
    </div>
  )
}

function Chip({ label }) {
  return <span className={styles.chip}>{label}</span>
}

export const SECTIONS = {
  'nav-simple':      NavSimple,
  'footer-simple':   FooterSimple,
  'property-hero':   PropertyHero,
  'collection-grid': CollectionGrid,
}