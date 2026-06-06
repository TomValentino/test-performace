// --------------------------------------------------
// TEMPLATE LIBRARY
//
// template_type:     PAGE | HEADER | FOOTER
// template_category: HOMEPAGE | PROPERTY | COLLECTION | CTA
//
// Each section:
//   id       — maps to a component in sectionLibrary
//   scope    — PROPERTY | COLLECTION | null
//   scope_id — uuid of the specific record, or '' if driven by route context
// --------------------------------------------------
export function resolveFonts(prop, storeFont, fallback) {
  return prop === false ? fallback : (prop ?? storeFont ?? fallback)
}

export const templateLibrary = [

  // ------------------------------------------------
  // LAYOUT 1 — "Classic"
  // Simple, clean. Hero → featured property → collection grid.
  // ------------------------------------------------
  {
    id: 'layout-classic-header',
    label: 'Classic Header',
    template_type: 'HEADER',
    template_category: 'GLOBAL',
    sections: [
      { id: 'nav-simple', scope: null, scope_id: '' },
    ]
  },

  {
    id: 'layout-classic-footer',
    label: 'Classic Footer',
    template_type: 'FOOTER',
    template_category: 'GLOBAL',
    sections: [
      { id: 'footer-simple', scope: null, scope_id: '' },
    ]
  },

  {
    id: 'layout-classic-homepage',
    label: 'Classic Homepage',
    template_type: 'PAGE',
    template_category: 'HOMEPAGE',
    sections: [
      { id: 'hero-basic',          scope: null,         scope_id: '' },
      { id: 'property-featured',   scope: 'PROPERTY',   scope_id: '' }, // '' = use route context
      { id: 'collection-grid',     scope: 'COLLECTION', scope_id: '' }, // '' = use route context
    ]
  },

  {
    id: 'layout-classic-property',
    label: 'Classic Property Page',
    template_type: 'PAGE',
    template_category: 'PROPERTY',
    sections: [
      { id: 'property-hero',       scope: 'PROPERTY',   scope_id: '' },
      { id: 'property-details',    scope: 'PROPERTY',   scope_id: '' },
      { id: 'cta-contact',         scope: null,         scope_id: '' },
    ]
  },

  // ------------------------------------------------
  // LAYOUT 2 — "Editorial"
  // Richer layout. Full-bleed hero, property spotlight, collection strip, CTA.
  // ------------------------------------------------
  {
    id: 'layout-editorial-header',
    label: 'Editorial Header',
    template_type: 'HEADER',
    template_category: 'GLOBAL',
    sections: [
      { id: 'nav-editorial', scope: null, scope_id: '' },
    ]
  },

  {
    id: 'layout-editorial-footer',
    label: 'Editorial Footer',
    template_type: 'FOOTER',
    template_category: 'GLOBAL',
    sections: [
      { id: 'footer-editorial', scope: null, scope_id: '' },
    ]
  },

  {
    id: 'layout-editorial-homepage',
    label: 'Editorial Homepage',
    template_type: 'PAGE',
    template_category: 'HOMEPAGE',
    sections: [
      { id: 'hero-fullbleed',      scope: null,         scope_id: '' },
      { id: 'property-spotlight',  scope: 'PROPERTY',   scope_id: '' },
      { id: 'collection-strip',    scope: 'COLLECTION', scope_id: '' },
      { id: 'cta-contact',         scope: null,         scope_id: '' },
    ]
  },

  {
    id: 'layout-editorial-property',
    label: 'Editorial Property Page',
    template_type: 'PAGE',
    template_category: 'PROPERTY',
    sections: [
      { id: 'property-hero',       scope: 'PROPERTY',   scope_id: '' },
      { id: 'property-details',    scope: 'PROPERTY',   scope_id: '' },
      { id: 'collection-strip',    scope: 'COLLECTION', scope_id: '' }, // related listings
      { id: 'cta-contact',         scope: null,         scope_id: '' },
    ]
  },

]

// --------------------------------------------------
// HELPERS
// --------------------------------------------------

export function getTemplateById(id) {
  return templateLibrary.find(t => t.id === id) ?? null
}

export function getTemplatesByType(type) {
  return templateLibrary.filter(t => t.template_type === type)
}

export function getTemplatesByCategory(category) {
  return templateLibrary.filter(t => t.template_category === category)
}