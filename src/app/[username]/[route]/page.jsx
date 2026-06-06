import { notFound }                          from 'next/navigation'
import { getStore, getProfile, getPage }     from '@/lib/db/read'
import { renderSections }                    from '@/lib/render'
import { fetchSectionData }                  from '@/lib/fetch-section-data'
import { createClient }                      from '@supabase/supabase-js'

export const dynamic    = 'force-static'
export const revalidate = 86400

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
)

export async function generateStaticParams() {
  const { data: stores } = await supabase
    .from('stores')
    .select('username, id')

  const { data: pages } = await supabase
    .from('pages')
    .select('meta_handle, store_id')
    .eq('status', 'published')
    .neq('meta_handle', '/')           // homepage is handled by /[username]/page.tsx
    .neq('meta_handle', '')

  if (!stores || !pages) return []

  return stores.flatMap(store =>
    pages
      .filter(p => p.store_id === store.id)
      .map(p => ({ username: store.username, route: p.meta_handle }))
  )
}

export default async function RoutePage({ params }) {
  const { username, route } = await params
  console.log('>>>', { username, route })

const store = await getStore(username)
console.log('>>> store', store?.id)

const [profile, page] = await Promise.all([
  getProfile(store.profile_id),
  getPage(route, store.id),
])
console.log('>>> page', page)
  if (!page) return notFound()

  const template = page.content_published
  if (!template?.sections?.length) {
    return <main><p>No content published yet.</p></main>
  }

  // Reuse fetchSectionData so any property/collection sections are hydrated
  const { propertiesMap, collectionsMap } = await fetchSectionData(template.sections, {})

  return (
    <main>
      {renderSections(template.sections, {
        store,
        profile,
        propertiesMap,
        collectionsMap,
      })}
    </main>
  )
}

export async function generateMetadata({ params }) {
  const { username, route } = await params
  const store = await getStore(username)
  if (!store) return {}
  const page  = await getPage(route, store.id)
  if (!page) return {}
  return {
    title:       page.meta_title       ?? store.username,
    description: page.meta_description ?? null,
    openGraph:   { images: page.meta_image ? [page.meta_image] : [] },
  }
}