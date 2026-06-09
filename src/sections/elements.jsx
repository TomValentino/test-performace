import { animationDataAttrs, hoverDataAttrs, withBaseProps } from "@/lib/render"

import { FONT_MAP, getFontVariables } from "@/lib/fonts"








// ─── Button Element ───────────────────────────────────────────────────────────

export const TextElement = withBaseProps(function TextElement({
  fontFamily = 'plus-jakarta-sans',
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  color,
  as: Tag = 'p',
  text,
  style,
  anim,
  hover,
}) {
  if (!text) return null

  const resolvedKey = FONT_MAP[fontFamily] ? fontFamily : null
  const fontVars    = resolvedKey ? getFontVariables([resolvedKey]) : ''

  return (
    <Tag
      suppressHydrationWarning
      className={fontVars || undefined}
      style={{
        margin: 0,
        fontFamily: resolvedKey ? `var(--font-${resolvedKey})` : 'var(--font-body)',
        ...(fontSize      && { fontSize }),
        ...(fontWeight    && { fontWeight }),
        ...(lineHeight    && { lineHeight }),
        ...(letterSpacing && { letterSpacing }),
        ...(color         && { color }),
        ...style,
      }}
      {...animationDataAttrs(anim)}
      {...hoverDataAttrs(hover)}
    >
      {text}
    </Tag>
  )
})