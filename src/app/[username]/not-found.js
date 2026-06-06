export default function NotFound() {
  return (
    <main style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', minHeight: '100vh', gap: '12px',
      padding: '40px', textAlign: 'center'
    }}>
      <p style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.35 }}>404</p>
      <h1 style={{ fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 500 }}>Page not found</h1>
      <p style={{ fontSize: '15px', opacity: 0.5 }}>This page doesn't exist or may have been removed.</p>
      <a href="/" style={{
        marginTop: '8px', fontSize: '14px', padding: '10px 24px',
        borderRadius: '8px', border: '1px solid currentColor', opacity: 0.6
      }}>
        Go home
      </a>
    </main>
  )
}