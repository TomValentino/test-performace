import { unstable_cache } from 'next/cache'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
)

export const getStore = unstable_cache(
  async (username) => {
    const { data, error } = await supabase
      .from('stores').select('*').eq('username', username).single()
    if (error) console.error('[getStore]', error.message, { username })
    return data ?? null
  },
  ['get-store'],
  { tags: ['stores'], revalidate: 86400 }
)

export const getProfile = unstable_cache(
  async (profileId) => {
    if (!profileId) return null
    const { data, error } = await supabase
      .from('profiles').select('*').eq('id', profileId).single()
    if (error) console.error('[getProfile]', error.message, { profileId })
    return data ?? null
  },
  ['get-profile'],
  { tags: ['profiles'], revalidate: 86400 }
)

export const getProperty = unstable_cache(
  async (handle, accountId) => {
    const { data, error } = await supabase
      .from('properties').select('*')
      .eq('meta_handle', handle).eq('account_id', accountId).eq('status', 'published').single()
    if (error) console.error('[getProperty]', error.message, { handle, accountId })
    return data ?? null
  },
  ['get-property'],
  { tags: ['properties'], revalidate: 86400 }
)

export const getCollection = unstable_cache(
  async (handle, storeId) => {
    const { data, error } = await supabase
      .from('collections')
      .select(`*, collection_properties ( property:properties (*) )`)
      .eq('meta_handle', handle).eq('store_id', storeId).eq('status', 'published').single()
    if (error) console.error('[getCollection]', error.message, { handle, storeId })
    if (!data) return null
    return { ...data, properties: data.collection_properties.map((cp) => cp.property) }
  },
  ['get-collection'],
  { tags: ['collections'], revalidate: 86400 }
)

export const getPropertiesByIds = unstable_cache(
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

export const getCollectionsByIds = unstable_cache(
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