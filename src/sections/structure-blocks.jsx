// ─── Layout Blocks ─────────────────────────────────────────────────────────────

import { animationDataAttrs, hoverDataAttrs, withBaseProps } from "@/lib/render"
import Image from "next/image"
import { Children, cloneElement, isValidElement, useId } from 'react'
import { skeletonURL } from '@/components/img'






// ─── Content Block  ───────────────────────────────────────────────────────────────────

export const ContentBlock = withBaseProps(function ContentBlock({
  children,
  gap,
  align,
  justify,
  backgroundImage,
  backgroundImageSizes,
  backgroundImagePriority = false,
  backgroundImageOpacity  = 1,
  style,
  anim,
  hover,
}) {
  const flexStyle = {
    display:       'flex',
    flexDirection: 'column',
    ...(gap     && { gap }),
    ...(align   && { alignItems: align }),
    ...(justify && { justifyContent: justify }),
  }
  return (
    <div
      suppressHydrationWarning
      style={{ ...flexStyle, position: 'relative', 
        // overflow: 'hidden',
         ...style }}
      {...animationDataAttrs(anim)}
      {...hoverDataAttrs(hover)}
    >
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt=""
          fill
          placeholder="blur"
          blurDataURL={skeletonURL(1600, 900)}
          priority={backgroundImagePriority}
          sizes={backgroundImageSizes ?? '100vw'}
          style={{ objectFit: 'cover', opacity: backgroundImageOpacity, zIndex: 0 }}
        />
      )}
      {backgroundImage ? (
        <div style={{ ...flexStyle, position: 'relative', zIndex: 1 }}>
          {children}
        </div>
      ) : children}
    </div>
  )
})






// ─── Content Block ───────────────────────────────────────────────────────────────────

export const ColumnBlock = withBaseProps(function ColumnBlock({
  children,
  widths      = [],
  breakpoints = [],
  gap         = '1rem',
  align       = 'stretch',
  justify     = 'start',
  style,
  anim,
  hover,
}) {
  const uid = useId()
  const cls = `col-${uid.replace(/:/g, '')}`
  return (
    <div
      className={cls}
      suppressHydrationWarning
      style={{
        display:             'grid',
        gridTemplateColumns: widths.length ? widths.join(' ') : '1fr',
        gap,
        alignItems:          align,
        justifyContent:      justify,
        position:            'relative',
        // overflow:            'hidden',
        ...style,
      }}
      {...animationDataAttrs(anim)}
      {...hoverDataAttrs(hover)}
    >
      {breakpoints.length > 0 && (
        <style>{breakpoints
          .map(({ screen, widths }) =>
            `@media (max-width: ${screen}) { .${cls} { grid-template-columns: ${widths.join(' ')} !important; } }`
          ).join('\n')}
        </style>
      )}
      {children}
    </div>
  )
})






// ─── Scope Block ───────────────────────────────────────────────────────────────────

export const ScopeBlock = withBaseProps(function ScopeBlock({
  children,
  gap,
  align,
  justify,
  style,
  anim,
  hover,
  property,
  collection,
}) {
  const flexStyle = {
    display: 'flex',
    flexDirection: 'column',
    ...(gap     && { gap }),
    ...(align   && { alignItems: align }),
    ...(justify && { justifyContent: justify }),
  }

const injected = Children.map(children, child =>
  isValidElement(child)
    ? cloneElement(child, {
        ...(property   && { property }),
        ...(collection && { collection }),
      })
    : child
)
  return (
    <div
      suppressHydrationWarning
      style={{ ...flexStyle, position: 'relative', overflow: 'hidden', ...style }}
      {...animationDataAttrs(anim)}
      {...hoverDataAttrs(hover)}
    >
      {injected}
    </div>
  )
})
