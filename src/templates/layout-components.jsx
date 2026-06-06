
// ---------------------------------------------------------------------------
// NAV
import styles from './_styles/layout.module.css'

import { getFontVariables } from "@/lib/fonts"

// ---------------------------------------------------------------------------
// ─── Shared font defaults ────────────────────────────────────────────────────
const FONT_DEFAULTS = {
  headingFont   : 'plus-jakarta-sans',
  bodyFont      : 'dm-sans',
  headingWeight : 600,
  bodyWeight    : 400,
}

// ─── NavSimple ───────────────────────────────────────────────────────────────
export function NavSimple({
  // fonts (fall back to shared defaults)
  headingFont   = FONT_DEFAULTS.headingFont,
  bodyFont      = FONT_DEFAULTS.bodyFont,
  headingWeight = FONT_DEFAULTS.headingWeight,
  bodyWeight    = FONT_DEFAULTS.bodyWeight,
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
  const fontVars = getFontVariables([headingFont, bodyFont])
  const brand    = store?.name ?? store?.username ?? 'Brand'

  // resolved CSS values — keeps JSX clean
  const headingStyle = { fontFamily: `var(--font-${headingFont})`, fontWeight: headingWeight, color }
  const bodyStyle    = { fontFamily: `var(--font-${bodyFont})`,    fontWeight: bodyWeight,    color }

  return (
    <nav className={`${fontVars} ${styles.nav}`} style={{ background: bg }}>

      <a href="/" className={styles.brand} style={headingStyle}>
        {brand}
      </a>

      {links.length > 0 && (
        <ul className={styles.links}>
          {links.map((link, i) => (
            <li key={i}>
              <a href={link.href} className={styles.link} style={bodyStyle}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}

      {ctaText && (
        <a href={ctaHref} className={styles.cta}
          style={{ ...bodyStyle, background: ctaBg, color: ctaColor }}>
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
