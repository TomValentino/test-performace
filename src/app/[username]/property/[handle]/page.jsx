import { notFound }                          from 'next/navigation'
import { getStore, getProfile, getProperty, supabase, fetchSectionData } from '@/db/read'
import { renderSections }                    from '@/lib/render'

export const dynamic    = 'force-static'
export const revalidate = 86400


export async function generateStaticParams() {
  const { data: stores } = await supabase
    .from('stores')
    .select('username, account_id')

  const { data: props } = await supabase
    .from('properties')
    .select('meta_handle, account_id')
    .eq('status', 'published')

  if (!stores || !props) return []

  return stores.flatMap(store =>
    props
      .filter(p => p.account_id === store.account_id)
      .map(p => ({ username: store.username, handle: p.meta_handle }))
  )
}

export default async function PropertyPage({ params }) {
  const { username, handle } = await params

  const store = await getStore(username)
  if (!store) return notFound()

  const [profile, property] = await Promise.all([
    getProfile(store.profile_id),
    getProperty(handle, store.account_id),
  ])
  if (!property) return notFound()

  const template = property.content_published
  if (!template?.sections?.length) {
    return <main><p>No content published yet.</p></main>
  }

  const { propertiesMap, collectionsMap } = await fetchSectionData(
    template.sections,
    { currentPropertyId: property.id }
  )

  return (
    <main>
      {renderSections(template.sections, {
        store,
        profile,
        propertiesMap,
        collectionsMap,
        currentPropertyId: property.id,
      })}
    </main>
  )
}

export async function generateMetadata({ params }) {
  const { username, handle } = await params
  const store    = await getStore(username)
  if (!store) return {}
  const property = await getProperty(handle, store.account_id)
  if (!property) return {}

  const image = property.photos?.[0]?.trim() ?? store.image?.trim() ?? null

  return {
    title:       property.title,
    description: property.description_short ?? property.description?.slice(0, 160),
    openGraph: {
      title:       property.title,
      description: property.description_short ?? property.description?.slice(0, 160),
      images:      image ? [{ url: image, width: 1200, height: 630 }] : [],
    },
  }
}

