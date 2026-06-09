export function Icon({ name, size = 16, color = 'currentColor' }) {
  switch (name) {

    // ─── Specs ──────────────────────────────────────────────────────────────────

    case 'bed':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="6" width="20" height="14" rx="2"/>
          <path d="M2 12h20"/>
          <rect x="5" y="8" width="5" height="4" rx="1"/>
          <rect x="14" y="8" width="5" height="4" rx="1"/>
        </svg>
      )

    case 'bath':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14v4a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5v-4z"/>
          <path d="M5 12V8a2 2 0 0 1 4 0"/>
          <path d="M4 21H2M20 21h2"/>
        </svg>
      )

    case 'garage':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 10.5L12 4l9 6.5V21H3V10.5z"/>
          <rect x="8" y="13" width="8" height="8"/>
          <path d="M8 16h8M8 19h8"/>
        </svg>
      )

    case 'area':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 8V4h4"/>
          <path d="M20 8V4h-4"/>
          <path d="M4 16v4h4"/>
          <path d="M20 16v4h-4"/>
        </svg>
      )

    case 'stairs':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 20h4v-4h4v-4h4v-4h4V4"/>
        </svg>
      )

    case 'calendar':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2"/>
          <path d="M16 2v4M8 2v4M3 10h18"/>
        </svg>
      )

    // ─── Amenities ──────────────────────────────────────────────────────────────

    case 'gym':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 8H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2"/>
          <path d="M18 8h2a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-2"/>
          <path d="M6 9v6M18 9v6"/>
          <path d="M6 12h12"/>
        </svg>
      )

    case 'pool':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 17c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2"/>
          <path d="M2 21c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2"/>
          <path d="M7 13V7l5-3 5 3v6"/>
        </svg>
      )

    case 'terrace':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18"/>
          <path d="M5 21V10l7-7 7 7v11"/>
          <path d="M9 21v-6h6v6"/>
          <path d="M3 10h18"/>
        </svg>
      )

    case 'concierge':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a7 7 0 0 1 7 7H5a7 7 0 0 1 7-7z"/>
          <path d="M3 9h18"/>
          <path d="M3 12h18"/>
          <rect x="5" y="12" width="14" height="9" rx="1"/>
        </svg>
      )

    case 'ac':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="8" rx="2"/>
          <path d="M7 12v2a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-2"/>
          <path d="M12 16v4M8 20h8"/>
        </svg>
      )

    case 'intercom':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2"/>
          <circle cx="12" cy="15" r="2"/>
          <path d="M9 7h6M9 10h6"/>
        </svg>
      )

    case 'wardrobe':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="19" rx="1"/>
          <path d="M12 3v19"/>
          <circle cx="9" cy="12" r="1"/>
          <circle cx="15" cy="12" r="1"/>
        </svg>
      )

    case 'dishwasher':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="2" width="18" height="20" rx="2"/>
          <path d="M3 8h18"/>
          <circle cx="12" cy="14" r="3"/>
          <path d="M7 5h2"/>
        </svg>
      )

    case 'balcony':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18"/>
          <path d="M3 12h18"/>
          <path d="M6 12v9M10 12v9M14 12v9M18 12v9"/>
          <path d="M5 12V7h14v5"/>
        </svg>
      )

    case 'garden':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22V12"/>
          <path d="M12 12C12 8 8 5 4 6c0 4 3 7 8 6z"/>
          <path d="M12 12c0-4 4-7 8-6-1 4-4 7-8 6z"/>
          <path d="M5 22h14"/>
        </svg>
      )

    case 'lake':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 16c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2"/>
          <path d="M2 20c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2"/>
          <path d="M12 4a3 3 0 0 1 3 3c0 2-3 5-3 5S9 9 9 7a3 3 0 0 1 3-3z"/>
        </svg>
      )

    case 'ocean':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 14c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2"/>
          <path d="M2 18c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2"/>
          <path d="M4 10l4-6h8l4 6"/>
        </svg>
      )

    case 'city':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18"/>
          <path d="M5 21V7l7-4 7 4v14"/>
          <path d="M9 21v-4h6v4"/>
          <path d="M9 11h1m4 0h1M9 15h1m4 0h1"/>
        </svg>
      )

    case 'solar':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="10" width="9" height="7" rx="1"/>
          <rect x="13" y="10" width="9" height="7" rx="1"/>
          <path d="M6 10V7M18 10V7M12 10V5"/>
          <path d="M2 14h20"/>
          <path d="M6 17v2M18 17v2M12 17v2"/>
        </svg>
      )

    case 'ev':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 17H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h11l4 4v6h-2"/>
          <circle cx="7" cy="17" r="2"/>
          <circle cx="17" cy="17" r="2"/>
          <path d="M13 7v4h4"/>
          <path d="M19 5v4M17 7h4"/>
        </svg>
      )

    case 'theatre':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="14" rx="2"/>
          <path d="M8 20h8M12 18v2"/>
          <path d="M7 9l3 3-3 3M13 15h4"/>
        </svg>
      )

    case 'wine':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 22h8M12 11v11"/>
          <path d="M7 2h10l1 7a5 5 0 0 1-10 0l-1-7z"/>
        </svg>
      )

    case 'sauna':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 6c0 1-1 2-1 3s1 2 1 3-1 2-1 3"/>
          <path d="M13 6c0 1-1 2-1 3s1 2 1 3-1 2-1 3"/>
          <path d="M17 6c0 1-1 2-1 3s1 2 1 3-1 2-1 3"/>
          <rect x="2" y="18" width="20" height="3" rx="1"/>
        </svg>
      )

    case 'bbq':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 11h16"/>
          <path d="M6 11l-2 9h16l-2-9"/>
          <path d="M12 2c0 1-1 2-1 3s1 2 1 3"/>
          <path d="M12 11V8"/>
          <path d="M9 20l-1 2M15 20l1 2"/>
        </svg>
      )

    case 'coworking':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2"/>
          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
          <path d="M2 13h20"/>
          <path d="M12 13v4"/>
        </svg>
      )

    case 'grocery':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
          <path d="M3 6h18"/>
          <path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
      )

    case 'dining':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 2v7c0 2 2 3 2 3v10"/>
          <path d="M7 2v20"/>
          <path d="M17 2a5 5 0 0 1 0 10v10"/>
        </svg>
      )

    case 'fireplace':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18"/>
          <path d="M5 21V5h14v16"/>
          <path d="M9 21v-6h6v6"/>
          <path d="M12 6c0 2-2 3-2 5s2 3 2 3 2-1 2-3-2-3-2-5z"/>
        </svg>
      )

    case 'storage':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="5" rx="1"/>
          <rect x="2" y="10" width="20" height="5" rx="1"/>
          <rect x="2" y="17" width="20" height="5" rx="1"/>
          <path d="M6 5.5h.01M6 12.5h.01M6 19.5h.01"/>
        </svg>
      )

    case 'laundry':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="2"/>
          <circle cx="12" cy="13" r="4"/>
          <path d="M7 6h.01M10 6h3"/>
        </svg>
      )

    case 'pet':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 5.172C10 3.443 8.657 2 7 2S4 3.443 4 5.172c0 1.644 1 3.072 2.5 4.328C8 10.756 9 12 9 12"/>
          <path d="M14 5.172C14 3.443 15.343 2 17 2s3 1.443 3 3.172c0 1.644-1 3.072-2.5 4.328C16 10.756 15 12 15 12"/>
          <path d="M9 12c0 3 1.5 5 3 6.5C13.5 17 15 15 15 12H9z"/>
          <path d="M8 21c0-1.5 4-1.5 4-3s4 1.5 4 3"/>
        </svg>
      )

    case 'accessibility':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="4" r="1.5"/>
          <path d="M9 9h6l1 7h-2l-1-4H11l-1 4H8l1-7z"/>
          <path d="M9 16l-1.5 5M15 16l1.5 5"/>
        </svg>
      )

    default:
      return null
  }
}