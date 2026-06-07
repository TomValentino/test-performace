const COMPONENT_SCOPES = ['property', 'collection']

// Shape references — these are the source of truth
export const shapes = {
  photos:         [{ url: '', alt: '' }],
  address:        { street: '', city: '', state: '', zip: '', country: '', lat: 0, lng: 0 },
  specs:          { beds: 0, baths: 0, garages: 0, stories: 0, area: 0, lot_size: 0, year_built: 0 },
  amenities:      [''],
  fonts:          { body: '', heading: '' },
  colors: [{ name: '', value: '' }],
  socials:        { instagram: '', facebook: '', linkedin: '', twitter: '' },
  currency: 'USD',

  content:        { components: [{ id: '', scope: null, scope_id: null, props: {} }], slots: [] }, // Slots only on layout block
  content_header: { components: [{ id: '', scope: null, scope_id: null, props: {} }], slots: [] }, // Slots only on layout block
  content_footer: { components: [{ id: '', scope: null, scope_id: null, props: {} }], slots: [] }, // Slots only on layout block
}

function err(field, msg) {
  throw new Error(`[${field}] ${msg}`)
}

function validateComponents(field, v) {
  if (!Array.isArray(v?.components)) err(field, 'must have a components array')
  v.components.forEach((s, i) => {
    if (!s.id) err(field, `component ${i} missing id`)
    if (s.scope && !COMPONENT_SCOPES.includes(s.scope)) err(field, `component ${i} invalid scope: ${s.scope}`)
    if (s.scope && !s.scope_id) err(field, `component ${i} has scope but missing scope_id`)
    if (!s.props) err(field, `component ${i} missing props`)
  })
}

const validators = {
  photos(v) {
    if (!Array.isArray(v)) err('photos', 'must be an array')
    v.forEach((item, i) => {
      if (typeof item?.url !== 'string' || !item.url) err('photos', `item ${i} missing url`)
    })
  },

  colors(v) {
  if (!Array.isArray(v)) err('colors', 'must be an array')
  v.forEach((item, i) => {
    if (typeof item?.name !== 'string' || !item.name) err('colors', `item ${i} missing name`)
    if (typeof item?.value !== 'string' || !item.value) err('colors', `item ${i} missing value`)
    if (!/^#[0-9a-fA-F]{3,8}$/.test(item.value)) err('colors', `item ${i} invalid hex color`)
  })
},

currency(v) {
  if (typeof v !== 'string') err('currency', 'must be a string')
  if (!/^[A-Z]{3}$/.test(v)) err('currency', 'must be a valid 3-letter ISO 4217 code (e.g. USD, EUR, THB)')
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

  content:        (v) => validateComponents('content', v),
  content_header: (v) => validateComponents('content_header', v),
  content_footer: (v) => validateComponents('content_footer', v),
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