import { notFound }             from 'next/navigation'
import { getStore, getProfile } from '@/lib/db/read'
import { renderSections }       from '@/lib/render'
import { getFontVariables }     from '@/lib/fonts'
import "@/_styles/global.css"

export const dynamic    = 'force-static'
export const revalidate = 86400

const DEFAULT_HEADER = { sections: [{ id: 'nav-simple',    scope: null, scope_id: null, props: {} }] }
const DEFAULT_FOOTER = { sections: [{ id: 'footer-simple', scope: null, scope_id: null, props: {} }] }

export default async function RootLayout({ children, params }) {
  const { username } = await params

  const store = await getStore(username)
  if (!store) return notFound()

  const profile = await getProfile(store.profile_id)

  const header = store.layout_header ?? DEFAULT_HEADER
  const footer = store.layout_footer ?? DEFAULT_FOOTER

const fonts = store?.fonts ?? {}
const fontVariables = getFontVariables([fonts.heading, fonts.body].filter(Boolean))
  const ctx = { store, profile }

  return (
    <html lang="en" className={fontVariables}>
      <body>
        {renderSections(header.sections, ctx)}
        {children}
        {renderSections(footer.sections, ctx)}
      </body>
    </html>
  )
}