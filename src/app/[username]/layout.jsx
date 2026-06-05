import { notFound }           from 'next/navigation'
import { getStore, getProfile } from '@/_db/read'
import { renderSections }       from '@/lib/render'
import { getFontVariables }     from '@/lib/fonts'

const DEFAULT_HEADER = { sections: [{ id: 'nav-simple',    scope: null, scope_id: null, props: {} }] }
const DEFAULT_FOOTER = { sections: [{ id: 'footer-simple', scope: null, scope_id: null, props: {} }] }

export default async function RootLayout({ children, params }) {
  const { username } = await params

  // const store = await getStore(username)
  // if (!store) return notFound()

  // const profile = await getProfile(store.profile_id)

  // const header = store.layout_header ?? DEFAULT_HEADER
  // const footer = store.layout_footer ?? DEFAULT_FOOTER

  // const fontVariables = getFontVariables(store.fonts ?? [])
  // console.log('fontVariables', fontVariables)
  // const ctx = { store, profile }

  return (
    // <html lang="en" className={fontVariables}>
    <html lang="en">
      <body>
        {/* {renderSections(header.sections, ctx)} */}
        {children}
        {/* {renderSections(footer.sections, ctx)} */}
      </body>
    </html>
  )
}