import { getFontVariables } from '@/lib/fonts'
import { PropImage } from '@/components/img' // adjust path as needed

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
    <section className={fontVars} style={{ padding: '80px 32px' }}>
      <h1 style={{ fontFamily: `var(--font-${headingFont})`, fontSize: '48px', fontWeight: headlineWeight }}>
        Luxury Living, by {store.username ?? 'No username'}
      </h1>
      <p style={{ fontFamily: `var(--font-${bodyFont})`, fontSize: '16px' }}>
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
    <footer style={{
      padding: '40px 32px', background: bg, borderTop: '1px solid #eee',
      textAlign: 'center', color, fontSize: '13px',
    }}>
      {text ?? fallback}
    </footer>
  )
}

// ---------------------------------------------------------------------------
// PROPERTY HERO
// Full-bleed background image.
// priority=true → preloads as LCP image (above the fold)
// ---------------------------------------------------------------------------
export function PropertyHero({     headingFont = 'plus-jakarta-sans', overlayOpacity = 0.45, accentColor = '#fff', property }) {
  if (!property) return null
  const fontVars = getFontVariables([headingFont, bodyFont])

  const photo = property.photos?.[0] ?? null
  const price = property.price ? `$${Number(property.price).toLocaleString()}` : null
  const addr  = property.address ?? {}
  const line  = [addr.street, addr.suburb, addr.state].filter(Boolean).join(', ')
  const specs = property.specs ?? {}

  return (
    <section className={fontVars} style={{
      position: 'relative', minHeight: '520px',
      background: '#111', display: 'flex', alignItems: 'flex-end',
    }}>
      {/* Background photo — fill + priority = preloaded LCP, shimmer skeleton on first load */}
      {photo && (
        <PropImage
          src={photo}
          alt={property.title ?? ''}
          fill
          priority          // ← above the fold: inject <link rel="preload">
          sizes="100vw"
          style={{ opacity: overlayOpacity }}
        />
      )}

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, padding: '48px 32px', color: accentColor, width: '100%' }}>
        {property.sale_status && (
          <span style={{
            fontSize: '11px', fontWeight: 700, textTransform: 'uppercase',
            background: accentColor, color: '#111', padding: '3px 8px',
            borderRadius: '3px', marginBottom: '12px', display: 'inline-block',
          }}>
            {property.sale_status}
          </span>
        )}
        <h1 style={{ fontFamily: `var(--font-${headingFont})`, fontSize: 'clamp(24px, 4vw, 48px)', fontWeight: 700, margin: '8px 0 4px' }}>
          {property.title}
        </h1>
        {line && <p style={{ opacity: 0.75, margin: '0 0 20px', fontSize: '15px' }}>{line}</p>}

        {(specs.bedrooms != null || specs.bathrooms != null || specs.floor_size != null) && (
          <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
            {specs.bedrooms   != null && <Spec label="Beds"   value={specs.bedrooms} />}
            {specs.bathrooms  != null && <Spec label="Baths"  value={specs.bathrooms} />}
            {specs.garages    != null && <Spec label="Garage" value={specs.garages} />}
            {specs.floor_size != null && <Spec label="Floor"  value={`${specs.floor_size}m²`} />}
            {specs.land_size  != null && <Spec label="Land"   value={`${specs.land_size}m²`} />}
          </div>
        )}
        {price && <p style={{ fontSize: '32px', fontWeight: 700, margin: 0 }}>{price}</p>}
      </div>
    </section>
  )
}

function Spec({ label, value }) {
  return (
    <div style={{
      textAlign: 'center', background: 'rgba(255,255,255,0.15)',
      padding: '8px 16px', borderRadius: '6px',
    }}>
      <div style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>{value}</div>
      <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// COLLECTION GRID
// ---------------------------------------------------------------------------
export function CollectionGrid({ bg = '#f9f8f6', accentColor = '#1a1a1a', columns = 2, collection }) {
  if (!collection) return null

  const properties =
    collection.properties ??
    collection.collection_properties?.map((cp) => cp.property).filter(Boolean) ??
    []

  return (
    <section style={{ background: bg, padding: '64px 32px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '48px' }}>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: accentColor, margin: '0 0 8px' }}>
            {collection.name}
          </h1>
          <p style={{ color: '#888', fontSize: '14px', margin: 0 }}>
            {properties.length} {properties.length === 1 ? 'property' : 'properties'}
          </p>
        </div>

        {properties.length === 0 ? (
          <div style={{
            padding: '64px', textAlign: 'center',
            border: '2px dashed #ddd', borderRadius: '8px', color: '#aaa',
          }}>
            No properties yet.
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: '24px',
          }}>
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
    <div style={{
      background: '#fff', borderRadius: '10px',
      overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
    }}>
      {photo && (
        // position:relative required for fill mode
        <div style={{ position: 'relative', height: '220px' }}>
          <PropImage
            src={photo}
            alt={property.title ?? ''}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            // priority omitted → lazy loads (below fold cards)
          />
        </div>
      )}

      <div style={{ padding: '20px' }}>
        {property.sale_status && (
          <span style={{
            fontSize: '10px', fontWeight: 700, textTransform: 'uppercase',
            color: accentColor, letterSpacing: '0.08em',
          }}>
            {property.sale_status}
          </span>
        )}
        <h3 style={{ fontSize: '17px', fontWeight: 700, margin: '6px 0 4px', color: '#111' }}>
          {property.title}
        </h3>
        {line && <p style={{ fontSize: '13px', color: '#888', margin: '0 0 12px' }}>{line}</p>}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
          {specs.bedrooms   != null && <Chip label={`${specs.bedrooms} bed`} />}
          {specs.bathrooms  != null && <Chip label={`${specs.bathrooms} bath`} />}
          {specs.floor_size != null && <Chip label={`${specs.floor_size}m²`} />}
        </div>
        {price && (
          <p style={{ fontSize: '20px', fontWeight: 700, color: accentColor, margin: 0 }}>
            {price}
          </p>
        )}
      </div>
    </div>
  )
}

function Chip({ label }) {
  return (
    <span style={{
      fontSize: '11px', background: '#f3f3f3',
      padding: '4px 8px', borderRadius: '4px', color: '#555',
    }}>
      {label}
    </span>
  )
}

export const SECTIONS = {
  'nav-simple':      NavSimple,
  'footer-simple':   FooterSimple,
  'property-hero':   PropertyHero,
  'collection-grid': CollectionGrid,
}