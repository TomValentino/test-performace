import { SECTIONS } from '@/lib/sections'

export function renderSections(sections = [], ctx = {}) {
  const {
    store               = null,
    profile             = null,
    propertiesMap       = {},
    collectionsMap      = {},
    currentPropertyId   = null,
    currentCollectionId = null,
  } = ctx

  return sections.map((s, i) => {
    const Component = SECTIONS[s.id]
    if (!Component) return null

    const scoped = {}

    if (s.scope === 'PROPERTY') {
      const id = s.scope_id ?? currentPropertyId
      scoped.property = id ? (propertiesMap[id] ?? null) : null
    }

    if (s.scope === 'COLLECTION') {
      const id = s.scope_id ?? currentCollectionId
      console.warn('id', id, collectionsMap)
      scoped.collection = id ? (collectionsMap[id] ?? null) : null
    }

    return (
      <Component
        key={`${s.id}-${i}`}
        {...(s.props ?? {})}
        {...scoped}
        store={store}
        profile={profile}
      />
    )
  })
}