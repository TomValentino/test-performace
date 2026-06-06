import { notFound }                              from 'next/navigation'
import { getStore, getProfile, getCollection }   from '@/lib/db/read'
import { renderSections }                        from '@/lib/render'
import { createClient }                          from '@supabase/supabase-js'

export const dynamic    = 'force-static'
export const revalidate = 86400

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
)

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

const ctx = {
  store,
  profile,
  collectionsMap:      { [collection.id]: collection },
  currentCollectionId: collection.id,   // ← this was missing
}
  // default template if no custom layout set on collection
  const template = collection.content_published ?? {
    sections: [{ id: 'collection-grid', scope: 'COLLECTION', scope_id: collection.id, props: {} }]
  }

  return renderSections(template.sections, ctx)
}

export async function generateMetadata({ params }) {
  const { username, handle } = await params
  const store      = await getStore(username)
  if (!store) return {}
  const collection = await getCollection(handle, store.id)
  if (!collection) return {}
  return {
    title:       collection.name,
    description: collection.description?.slice(0, 160) ?? null,
    openGraph:   { images: collection.photos?.[0] ? [collection.photos[0]] : [] },
  }
}