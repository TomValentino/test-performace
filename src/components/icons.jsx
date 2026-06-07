
export function Icon({ name, size = 16, color = 'currentColor' }) {
  switch (name) {

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

    default:
      return null
  }
}