
// ---------------------------------------------------------------------------
// NAV
import styles from './_styles/layout.module.css'

import { getFontVariables } from "@/lib/fonts"

// ---------------------------------------------------------------------------
const FONT_DEFAULTS = {
  headingFont   : 'plus-jakarta-sans',
  bodyFont      : 'plus-jakarta-sans',
  headingWeight : 600,
  bodyWeight    : 400,
}

export function NavSimple({
  // null means "not set" — triggers cascade below
  headingFont   = null,
  bodyFont      = null,
  headingWeight = null,
  bodyWeight    = null,
  // colours
  bg       = '#ffffff',
  color    = '#111111',
  ctaBg    = '#111111',
  ctaColor = '#ffffff',
  // content
  links   = [],
  ctaText = null,
  ctaHref = '/',
  // injected
  store,
  profile,
}) {
  // cascade: section prop → store global → component fallback
  const hFont = headingFont === false ? FONT_DEFAULTS.headingFont : (headingFont ?? store?.fonts?.heading ?? FONT_DEFAULTS.headingFont)
  const bFont = bodyFont    === false ? FONT_DEFAULTS.bodyFont    : (bodyFont    ?? store?.fonts?.body    ?? FONT_DEFAULTS.bodyFont)
  const hWght  = headingWeight ?? store?.fonts?.headingWeight ?? FONT_DEFAULTS.headingWeight
  const bWght  = bodyWeight    ?? store?.fonts?.bodyWeight    ?? FONT_DEFAULTS.bodyWeight

  const fontVars     = getFontVariables([hFont, bFont])
  const brand        = store?.name ?? store?.username ?? 'Brand'
  const headingStyle = { fontFamily: `var(--font-${hFont})`, fontWeight: hWght, color }
  const bodyStyle    = { fontFamily: `var(--font-${bFont})`, fontWeight: bWght, color }

  return (
    <nav className={`${fontVars} ${styles.nav}`} style={{ background: bg }}>
      <a href="/" className={styles.brand} style={headingStyle}>{brand}</a>
      {links.length > 0 && (
        <ul className={styles.links}>
          {links.map((link, i) => (
            <li key={i}>
              <a href={link.href} className={styles.link} style={bodyStyle}>{link.label}</a>
            </li>
          ))}
        </ul>
      )}
      {ctaText && (
        <a href={ctaHref} className={styles.cta} style={{ ...bodyStyle, background: ctaBg, color: ctaColor }}>
          {ctaText}
        </a>
      )}
    </nav>
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
