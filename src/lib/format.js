

export function formatPrice(amount, currency, { locale, compact = false } = {}) {
  if (amount == null || isNaN(amount)) return '—'

  return new Intl.NumberFormat(locale ?? undefined, {
    style:                 'currency',
    currency,
    notation:              compact ? 'compact' : 'standard',
    maximumFractionDigits: compact ? 1 : 0,  // No cents on property prices
  }).format(amount)
}





/**
 * Format an address object into a human-readable string.
 *
 * Formats:
 *   'short'   → "City, State"                           e.g. "Austin, TX"
 *   'default' → "Street, City, State"                   e.g. "123 Oak St, Austin, TX"
 *   'long'    → "Street, City, State ZIP, Country"      e.g. "123 Oak St, Austin, TX 78701, USA"
 *

 */
export function formatAddress(addr, format = 'default') {
  if (!addr) return ''

  const { street, city, state, zip, country } = addr

  if (format === 'short') {
    return [city, state].filter(Boolean).join(', ')
  }

  if (format === 'long') {
    const stateZip    = [state, zip].filter(Boolean).join(' ')
    const cityStatZip = [city, stateZip].filter(Boolean).join(', ')
    return [street, cityStatZip, country].filter(Boolean).join(', ')
  }

  // 'default'
  return [street, city, state].filter(Boolean).join(', ')
}