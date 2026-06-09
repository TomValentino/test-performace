import { unstable_cache } from 'next/cache'
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
)

const cache = process.env.NODE_ENV === 'development'
  ? (fn) => fn
  : unstable_cache

export const getStore = cache(
  async (username) => {
    const { data, error } = await supabase
      .from('stores').select('*').eq('username', username).maybeSingle()
    if (error) console.error('[getStore]', error.message, { username })
    return data ?? null
  },
  ['get-store'],
  { tags: ['stores'], revalidate: 86400 }
)

export const getProfile = cache(
  async (profileId) => {
    if (!profileId) return null
    const { data, error } = await supabase
      .from('profiles').select('*').eq('id', profileId).maybeSingle()
    if (error) console.error('[getProfile]', error.message, { profileId })
    return data ?? null
  },
  ['get-profile'],
  { tags: ['profiles'], revalidate: 86400 }
)

export const getProperty = cache(
  async (handle, accountId) => {
    const { data, error } = await supabase
      .from('properties').select('*')
      .eq('meta_handle', handle).eq('account_id', accountId).eq('status', 'published').maybeSingle()
    if (error) console.error('[getProperty]', error.message, { handle, accountId })
    return data ?? null
  },
  ['get-property'],
  { tags: ['properties'], revalidate: 86400 }
)

export const getCollection = cache(
  async (handle, storeId) => {
    const { data, error } = await supabase
      .from('collections')
      .select(`*, collection_properties ( property:properties (*) )`)
      .eq('meta_handle', handle).eq('store_id', storeId).eq('status', 'published').maybeSingle()
    if (error) console.error('[getCollection]', error.message, { handle, storeId })
    if (!data) return null
    return { ...data, properties: data.collection_properties.map((cp) => cp.property) }
  },
  ['get-collection'],
  { tags: ['collections'], revalidate: 86400 }
)

export const getPropertiesByIds = cache(
  async (ids) => {
    if (!ids.length) return []
    const { data, error } = await supabase
      .from('properties').select('*').in('id', ids)
    if (error) console.error('[getPropertiesByIds]', error.message, { ids })
    return data ?? []
  },
  ['get-properties-by-ids'],
  { tags: ['properties'], revalidate: 86400 }
)

export const getCollectionsByIds = cache(
  async (ids) => {
    if (!ids.length) return []
    const { data, error } = await supabase
      .from('collections')
      .select(`*, collection_properties ( property:properties (*) )`)
      .in('id', ids)
    console.log('[getCollectionsByIds] raw data:', data, 'error:', error)
    if (error) console.error('[getCollectionsByIds]', error.message, { ids })
    if (!data) return []
    return data.map((c) => ({ ...c, properties: c.collection_properties.map((cp) => cp.property) }))
  },
  ['get-collections-by-ids'],
  { tags: ['collections'], revalidate: 86400 }
)


export const getPage = cache(
  async (handle, storeId) => {
    const { data, error } = await supabase
      .from('pages').select('*')
      .eq('meta_handle', handle).eq('store_id', storeId).eq('status', 'published').maybeSingle()
    console.log('[getPage]', { handle, storeId, data, error })
    if (error) console.error('[getPage]', error.message, { handle, storeId })
    return data ?? null
  },
  ['get-page'],
  { tags: ['pages'], revalidate: 86400 }
)



export async function fetchSectionData(sections = [], ctx = {}) {
  const { currentPropertyId = null, currentCollectionId = null } = ctx
  const propertyIds   = new Set()
  const collectionIds = new Set()

  function collectIds(nodes) {
    for (const s of nodes) {
      if (s.scope === 'PROPERTY') {
        const id = s.scope_id ?? currentPropertyId
        if (id) propertyIds.add(id)
      }
      if (s.scope === 'COLLECTION') {
        const id = s.scope_id ?? currentCollectionId
        if (id) collectionIds.add(id)
      }
      if (Array.isArray(s.children) && s.children.length) {
        collectIds(s.children)          // recurse into children
      }
    }
  }

  collectIds(sections)

  console.log('collectionIds', collectionIds)

  const [properties, collections] = await Promise.all([
    getPropertiesByIds([...propertyIds]),
    getCollectionsByIds([...collectionIds]),
  ])

  return {
    propertiesMap:  Object.fromEntries(properties.map(p => [p.id, p])),
    collectionsMap: Object.fromEntries(collections.map(c => [c.id, c])),
  }
}