import { notFound }                              from 'next/navigation'
import { getStore, getProfile, getCollection, supabase, fetchSectionData }   from '@/db/read'
import { renderPage, renderSections }                        from '@/lib/render'

export const dynamic    = 'force-static'
export const revalidate = 86400


export async function generateStaticParams() {
  const { data: stores }      = await supabase.from('stores').select('username, id')
  const { data: collections } = await supabase.from('collections').select('meta_handle, store_id').eq('status', 'published')

  if (!stores || !collections) return []

  return stores.flatMap(store =>
    collections
      .filter(c => c.store_id === store.id)
      .map(c => ({ username: store.username, handle: c.meta_handle }))
  )
}

export default async function CollectionPage({ params }) {
  const { username, handle } = await params

  const store = await getStore(username)
  if (!store) return notFound()

  const [profile, collection] = await Promise.all([
    getProfile(store.profile_id),
    getCollection(handle, store.id),
  ])
  if (!collection) return notFound()

  // default template if no custom layout set on collection
  const template = collection.content_published 

  // Support both new { items: [] } and legacy { sections: [] } shapes
  const components = template?.components ?? []
  if (!components.length) {
    return <main><p>No content published yet.</p></main>
  }
  console.log('itme', components)

  const { propertiesMap, collectionsMap } = await fetchSectionData(components,
    { currentCollectionId: collection.id }
  )


const ctx = {
  store,
  profile,
  propertiesMap,
  collectionsMap,
  currentCollectionId: collection.id, 
}

  return renderPage(components, ctx)
}

export async function generateMetadata({ params }) {
  const { username, handle } = await params
  const store      = await getStore(username)
  if (!store) return {}
  const collection = await getCollection(handle, store.id)
  if (!collection) return {}

  const image = collection.photos?.[0]?.trim() ?? store.image?.trim() ?? null

  return {
    title:       collection.name,
    description: collection.description?.slice(0, 160) ?? null,
    openGraph: {
      title:       collection.name,
      description: collection.description?.slice(0, 160) ?? null,
      images:      image ? [{ url: image, width: 1200, height: 630 }] : [],
    },
  }
}