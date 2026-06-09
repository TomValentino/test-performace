import { animationDataAttrs, hoverDataAttrs, withBaseProps } from "@/lib/render"
import { SmartLink } from "./old/old-layouts"
import { FONT_MAP, getFontVariables } from "@/lib/fonts"






export function ButtonElement({
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  color,
  label  = 'Click here',
  action,
  style,
  anim,
  hover,
  store,
}) {
  const resolvedKey = FONT_MAP[fontFamily] ? fontFamily : null
  const fontVars    = resolvedKey ? getFontVariables([resolvedKey]) : ''

  const inlineStyle = {
    fontFamily: resolvedKey ? `var(--font-${resolvedKey})` : 'var(--font-body)',
    ...(fontSize      && { fontSize }),
    ...(fontWeight    && { fontWeight }),
    ...(lineHeight    && { lineHeight }),
    ...(letterSpacing && { letterSpacing }),
    ...(color         && { color }),
    ...style,
  }

  const isLink = action?.type === 'navigate-internal' || action?.type === 'navigate-external'
  const href   = isLink ? action.value : undefined
  const target = action?.target ?? (action?.type === 'navigate-external' ? '_blank' : undefined)

  function handleClick() {
    if (!action) return
    if (action.type === 'scroll-to') document.querySelector(action.value)?.scrollIntoView({ behavior: 'smooth' })
    if (action.type === 'overlay')   overlayState.open(action.value)
  }

  if (href) {
    return (
      <SmartLink
        href={href}
        target={target}
        className={`btn${fontVars ? ` ${fontVars}` : ''}`}
        username={store?.username}
        suppressHydrationWarning
        style={inlineStyle}
        {...animationDataAttrs(anim)}
        {...hoverDataAttrs(hover)}
      >
        {label}
      </SmartLink>
    )
  }

  return (
    <button
      className={`btn${fontVars ? ` ${fontVars}` : ''}`}
      suppressHydrationWarning
      style={inlineStyle}
      onClick={handleClick}
      {...animationDataAttrs(anim)}
      {...hoverDataAttrs(hover)}
    >
      {label}
    </button>
  )
}


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