
// ---------------------------------------------------------------------------
// NAV
import styles from './_styles/layout.module.css'

import { getFontVariables } from "@/lib/fonts"

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
