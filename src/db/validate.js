const SECTION_SCOPES = ['property', 'collection']

// Shape references — these are the source of truth
export const shapes = {
  photos:         [{ url: '', alt: '' }],
  address:        { street: '', city: '', state: '', zip: '', country: '', lat: 0, lng: 0 },
  specs:          { beds: 0, baths: 0, garages: 0, stories: 0, area: 0, lot_size: 0, year_built: 0 },
  amenities:      [''],
  fonts:          { body: '', heading: '' },
  socials:        { instagram: '', facebook: '', linkedin: '', twitter: '' },
  content:        { sections: [{ id: '', scope: null, scope_id: null, props: {} }] },
  content_header: { sections: [{ id: '', scope: null, scope_id: null, props: {} }] },
  content_footer: { sections: [{ id: '', scope: null, scope_id: null, props: {} }] },
}

function err(field, msg) {
  throw new Error(`[${field}] ${msg}`)
}

function validateSections(field, v) {
  if (!Array.isArray(v?.sections)) err(field, 'must have a sections array')
  v.sections.forEach((s, i) => {
    if (!s.id) err(field, `section ${i} missing id`)
    if (s.scope && !SECTION_SCOPES.includes(s.scope)) err(field, `section ${i} invalid scope: ${s.scope}`)
    if (s.scope && !s.scope_id) err(field, `section ${i} has scope but missing scope_id`)
    if (!s.props) err(field, `section ${i} missing props`)
  })
}

const validators = {
  photos(v) {
    if (!Array.isArray(v)) err('photos', 'must be an array')
    v.forEach((item, i) => {
      if (typeof item?.url !== 'string' || !item.url) err('photos', `item ${i} missing url`)
    })
  },

  address(v) {
    const required = ['street', 'city', 'state', 'zip', 'country']
    required.forEach(k => {
      if (!v?.[k]) err('address', `missing ${k}`)
    })
    if (typeof v.lat !== 'number') err('address', 'lat must be a number')
    if (typeof v.lng !== 'number') err('address', 'lng must be a number')
  },

  specs(v) {
    const required = ['beds', 'baths', 'area', 'year_built']
    required.forEach(k => {
      if (typeof v?.[k] !== 'number') err('specs', `${k} must be a number`)
    })
  },

  amenities(v) {
    if (!Array.isArray(v)) err('amenities', 'must be an array')
    v.forEach((item, i) => {
      if (typeof item !== 'string') err('amenities', `item ${i} must be a string`)
    })
  },

  fonts(v) {
    if (!('body' in v) || !('heading' in v)) err('fonts', 'must have body and heading keys')
  },

  socials(v) {
    const allowed = ['instagram', 'facebook', 'linkedin', 'twitter']
    allowed.forEach(k => {
      if (k in v && typeof v[k] !== 'string') err('socials', `${k} must be a string`)
    })
  },

  content:        (v) => validateSections('content', v),
  content_header: (v) => validateSections('content_header', v),
  content_footer: (v) => validateSections('content_footer', v),
}

// Call this before any save
export function validate(field, value) {
  if (!validators[field]) throw new Error(`No validator for field: ${field}`)
  validators[field](value)
}

// Validate multiple fields at once
export function validateAll(fields) {
  Object.entries(fields).forEach(([field, value]) => validate(field, value))
}