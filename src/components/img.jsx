import Image from 'next/image'

// ---------------------------------------------------------------------------
// Animated shimmer skeleton — base64-inlined SVG, zero network cost.
// Shows on FIRST load. On reload: /_next/image serves from cache → instant,
// no flash, no skeleton flicker because the image is already in browser cache.
// ---------------------------------------------------------------------------
function shimmerSVG(w, h) {
  return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="base" x1="0" x2="1">
        <stop offset="0%"   stop-color="#e8e8e8"/>
        <stop offset="50%"  stop-color="#d4d4d4"/>
        <stop offset="100%" stop-color="#e8e8e8"/>
      </linearGradient>
      <linearGradient id="shine" gradientUnits="userSpaceOnUse"
        x1="-${w}" y1="0" x2="${w}" y2="0">
        <stop offset="0%"   stop-color="transparent"/>
        <stop offset="50%"  stop-color="rgba(255,255,255,0.45)"/>
        <stop offset="100%" stop-color="transparent"/>
        <animateTransform attributeName="gradientTransform" type="translate"
          values="-${w * 2} 0;${w * 2} 0" dur="1.4s" repeatCount="indefinite"/>
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#base)"/>
    <rect width="${w}" height="${h}" fill="url(#shine)"/>
  </svg>`
}

const b64 = (str) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

export const skeletonURL = (w, h) =>
  `data:image/svg+xml;base64,${b64(shimmerSVG(w, h))}`

// ---------------------------------------------------------------------------
// PropImage
//
// fill=true   → parent MUST have position:relative + defined dimensions
// fill=false  → renders at width/height (default 1200×800)
//
// priority=true  → <link rel="preload"> injected in <head> by Next.js
//                  USE THIS on hero / LCP images (above the fold)
// priority=false → lazy loads (cards, below fold)
//
// sizes       → pass a real sizes string for best bandwidth savings
//               e.g. "(max-width: 768px) 100vw, 50vw"
// ---------------------------------------------------------------------------
export function PropImage({
  src,
  alt = '',
  fill = false,
  priority = false,
  sizes,
  width,
  height,
  aspectRatio = '16 / 10',
  style,
  className,
}) {
  if (!src) return null

  const blur = skeletonURL(width ?? 800, height ?? 600)

  if (fill) {
    return (
      <div style={{ position: 'relative', width: '100%', aspectRatio }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes ?? '100vw'}
          priority={priority}
          placeholder="blur"
          blurDataURL={blur}
          style={{ objectFit: 'cover', ...style }}
          className={className}
        />
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 1200}
      height={height ?? 800}
      sizes={sizes ?? '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
      priority={priority}
      placeholder="blur"
      blurDataURL={blur}
      style={{ objectFit: 'cover', ...style }}
      className={className}
    />
  )
}