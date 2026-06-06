

// --------------------------------------------------
// SECTION LIBRARY
// Renderable versions of sections — no scope/scope_id needed
// sections[]: { id, props }
// --------------------------------------------------

export const sectionLibrary = [
  {
    id: 'nav-simple-light',
    title: 'Simple Nav - Light',
    category: 'NAVS',
    required_scopes: null,
    sections: [
      { id: 'nav-simple', props: {} },
    ],
  },
  {
    id: 'nav-simple-dark',
    title: 'Simple Nav - Dark',
    category: 'NAVS',
    required_scopes: null,
    sections: [
      { id: 'nav-simple', props: { dark: true } },
    ],
  },
  {
    id: 'footer-simple-default',
    title: 'Simple Footer - Default',
    category: 'FOOTERS',
    required_scopes: null,
    sections: [
      { id: 'footer-simple', props: {} },
    ],
  },
  {
    id: 'hero-home-default',
    title: 'Home Hero - Default',
    category: 'HEROES',
    required_scopes: null,
    sections: [
      { id: 'hero-home', props: {} },
    ],
  },
  {
    id: 'property-hero-default',
    title: 'Property Hero - Default',
    category: 'PROPERTY',
    required_scopes: ['PROPERTY'],
    sections: [
      { id: 'property-hero', props: {} },
    ],
  },
  {
    id: 'property-featured-default',
    title: 'Property Featured - Default',
    category: 'PROPERTY',
    required_scopes: ['PROPERTY'],
    sections: [
      { id: 'property-featured', props: {} },
    ],
  },
  {
    id: 'collection-grid-default',
    title: 'Collection Grid - Default',
    category: 'COLLECTION',
    required_scopes: ['COLLECTION'],
    sections: [
      { id: 'collection-grid', props: {} },
    ],
  },
  {
    id: 'agent-card-default',
    title: 'Agent Card - Default',
    category: 'AGENTS',
    required_scopes: null,
    sections: [
      { id: 'agent-card', props: {} },
    ],
  },
]

export const getSectionLibraryById       = (id)       => sectionLibrary.find(s => s.id === id) ?? null
export const getSectionLibraryByCategory = (category) => sectionLibrary.filter(s => s.category === category)