
// ---------------------------------------------------------------------------
// NAV
import styles from './_styles/layout.module.css'

import { getFontVariables } from "@/lib/fonts"
import { resolveFonts } from './section-library'
import Link from 'next/link'


export function resolveHref(href, username) {
  if (!href) return '/'
  if (href.startsWith('http') || href.startsWith('//')) return href
  
  const isSubdomain = typeof window !== 'undefined' && 
    window.location.hostname.includes(`.`) &&
    !window.location.hostname.startsWith('localhost')

  const path = href.startsWith('/') ? href : `/${href}`
  return isSubdomain ? path : `/${username}${path}`
}

export function SmartLink({ href, username, children, ...props }) {
  const isExternal = href?.startsWith('http') || href?.startsWith('//')
  const resolved   = resolveHref(href, username)

  if (isExternal) {
    return <a href={resolved} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>
  }
  return <Link href={resolved} {...props}>{children}</Link>
}

export function NavSimple({
  // null means "not set" — triggers cascade below
  headingFont   = null,
  headingWeight = null,
  bodyFont      = null,
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
  const hFont = headingFont === false ? 'plus-jakarta-sans' : (headingFont ?? store?.fonts?.heading ?? 'plus-jakarta-sans')
  const bFont = bodyFont    === false ? 'plus-jakarta-sans'    : (bodyFont    ?? store?.fonts?.body    ?? 'plus-jakarta-sans')
  const hWght  = headingWeight ?? store?.fonts?.headingWeight ?? 600
  const bWght  = bodyWeight    ?? store?.fonts?.bodyWeight    ?? 400

  const fontVars     = getFontVariables([hFont, bFont])
  const brand        = store?.name ?? store?.username ?? 'Brand'
  const headingStyle = { fontFamily: `var(--font-${hFont})`, fontWeight: hWght, color }
  const bodyStyle    = { fontFamily: `var(--font-${bFont})`, fontWeight: bWght, color }

  return (
    <nav className={`${fontVars} ${styles.nav}`} style={{ background: bg }}>
    <SmartLink href="home" username={store?.username} className={styles.brand} style={headingStyle}>
      {brand}
    </SmartLink>
      {links.length > 0 && (
        <ul className={styles.links}>
          {links.map((link, i) => (
            <li key={i}>
             <SmartLink
      href={link.href}
      username={store?.username}
      className={styles.link}
      style={bodyStyle}
    >
      {link.label}
    </SmartLink>
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
export function FooterSimple({
  bodyFont   = null,
  bodyWeight = null,
  bg         = '#f9f9f9',
  color      = '#999',
  text       = null,
  store,
  profile,
}) {
  const bFont    = resolveFonts(bodyFont, store?.fonts?.body, 'dm-sans')
  const bWght    = bodyWeight ?? store?.fonts?.bodyWeight ?? 400
  const fontVars = getFontVariables([bFont])
  const fallback = [profile?.name ?? store?.username, profile?.email, profile?.phone]
    .filter(Boolean)
    .join('  ·  ')

  return (
    <footer
      className={`${fontVars} ${styles.footer}`}
      style={{ background: bg, color, fontFamily: `var(--font-${bFont})`, fontWeight: bWght }}
    >
      {text ?? fallback}
    </footer>
  )
}