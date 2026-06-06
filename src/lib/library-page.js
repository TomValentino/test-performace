// --------------------------------------------------
// PAGE LIBRARY
// Full pages made of sections
// sections[]: { id, props, scope, scope_id }
//   scope    — PROPERTY | COLLECTION | null
//   scope_id — uuid of specific record, or '' for route-driven
// --------------------------------------------------

export const pageLibrary = [
  {
    id: 'homepage-simple',
    title: 'Simple Homepage',
    category: 'HOMEPAGE',
    required_scopes: null,
    sections: [
      { id: 'nav-simple',      props: {}, scope: null,         scope_id: '' },
      { id: 'hero-home',       props: {}, scope: null,         scope_id: '' },
      { id: 'collection-grid', props: {}, scope: 'COLLECTION', scope_id: '' },
      { id: 'footer-simple',   props: {}, scope: null,         scope_id: '' },
    ],
  },
  {
    id: 'property-page',
    title: 'Property Page',
    category: 'PROPERTY',
    required_scopes: 'PROPERTY',
    sections: [
      { id: 'nav-simple',        props: {}, scope: null,       scope_id: '' },
      { id: 'property-hero',     props: {}, scope: 'PROPERTY', scope_id: '' },
      { id: 'property-featured', props: {}, scope: 'PROPERTY', scope_id: '' },
      { id: 'agent-card',        props: {}, scope: null,       scope_id: '' },
      { id: 'footer-simple',     props: {}, scope: null,       scope_id: '' },
    ],
  },
]

export const getPageById        = (id)       => pageLibrary.find(p => p.id === id) ?? null
export const getPagesByCategory = (category) => pageLibrary.filter(p => p.category === category)