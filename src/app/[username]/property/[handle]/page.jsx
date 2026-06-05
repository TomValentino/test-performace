import { notFound } from 'next/navigation'
import { getAllStores, getStore, getProperty } from '@/_db/read'
import { renderSections } from '@/lib/render'
import { fetchSectionData } from '@/lib/fetch-section-data'

export const revalidate = 86400

export async function generateStaticParams() {
  const stores = await getAllStores()

  return stores.flatMap(store =>
    store.properties.map(p => ({
      username: store.username,
      handle: p.handle,
    }))
  )
}

export default async function PropertyPage({ params }) {
  const { username, handle } = params

  const store = await getStore(username)
  if (!store) return notFound()

  const property = await getProperty(handle, store.account_id)
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
        profile: null,
        propertiesMap,
        collectionsMap,
        currentPropertyId: property.id,
      })}
    </main>
  )
}

export async function generateMetadata({ params }) {
  const { username, handle } = params

  const store = await getStore(username)
  if (!store) return {}

  const property = await getProperty(handle, store.account_id)
  if (!property) return {}

  return {
    title: property.title,
    description:
      property.description_short ??
      property.description?.slice(0, 160),
    openGraph: {
      images: property.photos?.[0] ? [property.photos[0]] : [],
    },
  }
}