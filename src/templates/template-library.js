import { SCOPES } from '@/lib/componentRegistry'

// ─── Categories ────────────────────────────────────────────────────────────────
export const TEMPLATE_CATEGORIES = {
  NAVS:         'NAVS',
  HEROES:       'HEROES',
  FEATURES:     'FEATURES',
  CTA:          'CTA',
  TESTIMONIALS: 'TESTIMONIALS',
  PRICING:      'PRICING',
  CONTACT:      'CONTACT',
  FOOTERS:      'FOOTERS',
  PROPERTY:     'PROPERTY',
  COLLECTION:   'COLLECTION',
  AGENTS:       'AGENTS',
}

// ─── Navs ──────────────────────────────────────────────────────────────────────
const navTemplates = [
  {
    id:      'nav-simple-light',
    title:   'Simple Nav - Light',
    category: TEMPLATE_CATEGORIES.NAVS,
    scope:    SCOPES.NONE,
    image: "",
    sections: [
      { id: 'nav-simple', props: {} },
    ],
  },
]

// ─── Heroes ────────────────────────────────────────────────────────────────────
const heroTemplates = [
  {
    id:      'hero-home-default',
    title:   'Home Hero',
    category: TEMPLATE_CATEGORIES.HEROES,
    scope:    SCOPES.NONE,
    image: "",

    sections: [
      { id: 'hero-home', props: {} },
    ],
  },
]

// ─── Property ──────────────────────────────────────────────────────────────────
const propertyTemplates = [
  {
    id:      'featured-property',
    title:   'Featured Property',
    category: TEMPLATE_CATEGORIES.PROPERTY,
    scope:    SCOPES.PROPERTY,
        image: "",

    sections: [
      {
        id:    'scope-block',
        scope: 'PROPERTY',
        props: { gap: '1rem', padding: '2rem', background: '#f9f8f6', borderRadius: 'lg' },
        children: [
          { id: 'property-image', props: {} },
          { id: 'property-title', props: {} },
          { id: 'property-specs', props: {} },
        ],
      },
    ],
  },
]

// ─── Registry ──────────────────────────────────────────────────────────────────
export const templateRegistry = [
  ...navTemplates,
  ...heroTemplates,
  ...propertyTemplates,
]

export const getTemplateById        = (id)       => templateRegistry.find(t => t.id === id) ?? null
export const getTemplatesByCategory = (category) => templateRegistry.filter(t => t.category === category)
export const getTemplatesByScope    = (scope)    => templateRegistry.filter(t => t.scope === scope)