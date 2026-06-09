import { getFontVariables, resolveFonts } from '@/lib/fonts'
import styles from './property-old.module.css'
import { formatPrice } from '@/lib/format'


// ─── PropertyDescription ──────────────────────────────────────────────────────
// Editorial description block. Two-column desktop: copy left, sidebar right.
// Sidebar surfaces key specs, amenities, agent card, and tax info.
// Scope: PROPERTY
// Props: heading, tagline, bg, color, accentColor, showAmenities,
//        showAgent, showTax, showSpecs, ctaText, ctaHref

export function PropertyDescription({
  headingFont   = null,
  headingWeight = null,
  bodyFont      = null,
  bodyWeight    = null,
  bg            = '#f9f7f4',
  color         = '#1a1a18',
  accentColor   = '#1a7a5e',
  heading       = null,
  tagline       = null,
  showAmenities = true,
  showAgent     = true,
  showTax       = true,
  showSpecs     = true,
  ctaText       = 'Enquire Now',
  ctaHref       = null,
  property,
  store,
  profile,
}) {
  if (!property) return null

  const hFont = resolveFonts(headingFont, store?.fonts?.heading, 'plus-jakarta-sans')
  const bFont = resolveFonts(bodyFont,    store?.fonts?.body,    'dm-sans')
  const hWght = headingWeight ?? store?.fonts?.headingWeight ?? 500
  const bWght = bodyWeight    ?? store?.fonts?.bodyWeight    ?? 400
  const fontVars = getFontVariables([hFont, bFont])

  const headingStyle = { fontFamily: `var(--font-${hFont})`, fontWeight: hWght, color }
  const bodyStyle    = { fontFamily: `var(--font-${bFont})`, fontWeight: bWght, color }
  const accentStyle  = { ...bodyStyle, color: accentColor }

  const specs     = property.specs     ?? {}
  const amenities = property.amenities ?? []
  const addr      = property.address   ?? {}

  const resolvedHeading = heading ?? property.title
  const resolvedTagline = tagline ?? property.description_short ?? null
  const description     = property.description ?? null
  const resolvedCta     = ctaHref ?? (profile?.email ? `mailto:${profile.email}` : null)

  const specItems = [
    { label: 'Bedrooms',   value: specs.bedrooms,   unit: '' },
    { label: 'Bathrooms',  value: specs.bathrooms,  unit: '' },
    { label: 'Garages',    value: specs.garages,    unit: '' },
    { label: 'Floor area', value: specs.floor_size, unit: 'm²' },
    { label: 'Land size',  value: specs.land_size,  unit: 'm²' },
  ].filter(s => s.value != null)

  return (
    <section
      className={`${fontVars} ${styles.desc}`}
      style={{ background: bg }}
    >
      <div className={styles.descInner}>

        {/* ── LEFT: Copy ── */}
        <div className={styles.descMain}>

          {/* Eyebrow */}
          {addr.suburb && (
            <p className={styles.descEyebrow} style={{ ...bodyStyle, color: accentColor }}>
              {[addr.suburb, addr.state].filter(Boolean).join(', ')}
            </p>
          )}

          {/* Heading */}
          <h2 className={styles.descHeading} style={headingStyle}>
            {resolvedHeading}
          </h2>

          {/* Tagline */}
          {resolvedTagline && (
            <p className={styles.descTagline} style={headingStyle}>
              {resolvedTagline}
            </p>
          )}

          {/* Divider */}
          <div className={styles.descDivider} style={{ background: accentColor }} />

          {/* Long description */}
          {description && (
            <div className={styles.descBody} style={bodyStyle}>
              {description.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          )}

          {/* Amenities */}
          {showAmenities && amenities.length > 0 && (
            <div className={styles.descAmenities}>
              <p className={styles.descSectionLabel} style={{ ...bodyStyle, color: accentColor }}>
                Features &amp; Amenities
              </p>
              <ul className={styles.descAmenityList}>
                {amenities.map((a, i) => (
                  <li key={i} className={styles.descAmenityItem} style={bodyStyle}>
                    <span className={styles.descAmenityDot} style={{ background: accentColor }} />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* ── RIGHT: Sidebar ── */}
        <aside className={styles.descSidebar}>

          {/* Specs card */}
          {showSpecs && specItems.length > 0 && (
            <div className={styles.sideCard} style={{ borderColor: `${accentColor}22` }}>
              <p className={styles.sideCardLabel} style={{ ...bodyStyle, color: accentColor }}>
                Property Details
              </p>
              <dl className={styles.specList}>
                {specItems.map(({ label, value, unit }) => (
                  <div key={label} className={styles.specRow}>
                    <dt className={styles.specLabel} style={bodyStyle}>{label}</dt>
                    <dd className={styles.specValue} style={headingStyle}>
                      {value}{unit}
                    </dd>
                  </div>
                ))}
                {property.property_type && (
                  <div className={styles.specRow}>
                    <dt className={styles.specLabel} style={bodyStyle}>Type</dt>
                    <dd className={styles.specValue} style={headingStyle}>
                      {property.property_type}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          )}

          {/* Tax / financials card */}
          {showTax && property.property_tax != null && (
            <div className={styles.sideCard} style={{ borderColor: `${accentColor}22` }}>
              <p className={styles.sideCardLabel} style={{ ...bodyStyle, color: accentColor }}>
                Financials
              </p>
              <dl className={styles.specList}>
                {property.price != null && (
                  <div className={styles.specRow}>
                    <dt className={styles.specLabel} style={bodyStyle}>Asking price</dt>
                    <dd className={styles.specValue} style={headingStyle}>
                      {formatPrice(property.price, store.currency)}
                    </dd>
                  </div>
                )}
                <div className={styles.specRow}>
                  <dt className={styles.specLabel} style={bodyStyle}>Property tax</dt>
                  <dd className={styles.specValue} style={headingStyle}>
                   {formatPrice(property.property_tax, store.currency)}/yr
                  </dd>
                </div>
              </dl>
            </div>
          )}

          {/* Agent card */}
          {showAgent && profile && (
            <div className={styles.agentCard} style={{ borderColor: `${accentColor}22` }}>
              {profile.photo && (
                <img
                  src={profile.photo}
                  alt={profile.name ?? ''}
                  className={styles.agentPhoto}
                />
              )}
              <div className={styles.agentInfo}>
                <p className={styles.agentName} style={headingStyle}>
                  {profile.name ?? store?.username}
                </p>
                {profile.title && (
                  <p className={styles.agentTitle} style={{ ...bodyStyle, opacity: 0.55 }}>
                    {profile.title}
                  </p>
                )}
                {profile.license && (
                  <p className={styles.agentLicense} style={{ ...bodyStyle, color: accentColor }}>
                    Lic. {profile.license}
                  </p>
                )}
                <div className={styles.agentContacts}>
                  {profile.phone && (
                    <a
                      href={`tel:${profile.phone}`}
                      className={styles.agentContact}
                      style={bodyStyle}
                    >
                      {profile.phone}
                    </a>
                  )}
                  {profile.email && (
                    <a
                      href={`mailto:${profile.email}`}
                      className={styles.agentContact}
                      style={bodyStyle}
                    >
                      {profile.email}
                    </a>
                  )}
                </div>
              </div>
              {ctaText && resolvedCta && (
                <a
                  href={resolvedCta}
                  className={styles.agentCta}
                  style={{ background: accentColor, color: bg, fontFamily: `var(--font-${bFont})`, fontWeight: 500 }}
                >
                  {ctaText}
                </a>
              )}
            </div>
          )}

        </aside>
      </div>
    </section>
  )
}