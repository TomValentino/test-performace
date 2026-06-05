import { getPropertiesByIds, getCollectionsByIds } from '@/_db/read'

export async function fetchSectionData(sections = [], ctx = {}) {
  const { currentPropertyId = null, currentCollectionId = null } = ctx

  const propertyIds   = new Set()
  const collectionIds = new Set()

  for (const s of sections) {
    if (s.scope === 'PROPERTY') {
      const id = s.scope_id ?? currentPropertyId
      if (id) propertyIds.add(id)
    }
    if (s.scope === 'COLLECTION') {
      const id = s.scope_id ?? currentCollectionId
      if (id) collectionIds.add(id)
    }
  }

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