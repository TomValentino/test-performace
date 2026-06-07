

export function formatPrice(amount, currency, { locale, compact = false } = {}) {
  if (amount == null || isNaN(amount)) return '—'

  return new Intl.NumberFormat(locale ?? undefined, {
    style:                 'currency',
    currency,
    notation:              compact ? 'compact' : 'standard',
    maximumFractionDigits: compact ? 1 : 0,  // No cents on property prices
  }).format(amount)
}




