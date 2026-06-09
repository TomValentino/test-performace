import { animationDataAttrs, hoverDataAttrs, withBaseProps } from "@/lib/render"




// ─── Agent Name  ───────────────────────────────────────────────────────────────────

export const AgentName = withBaseProps(function AgentName({
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  color   = '#111111',
  as: Tag = 'h2',
  style,
  anim,
  hover,
  store,
  profile,
}) {
  if (!profile?.name) return null
  const resolvedFamily = fontFamily ?? (store?.fonts?.heading ? `var(--font-${store.fonts.heading})` : undefined)
  return (
    <Tag
      suppressHydrationWarning
      style={{
        margin: 0,
        ...(resolvedFamily && { fontFamily: resolvedFamily }),
        ...(fontSize       && { fontSize }),
        ...(fontWeight     && { fontWeight }),
        ...(lineHeight     && { lineHeight }),
        ...(letterSpacing  && { letterSpacing }),
        color,
        ...style,
      }}
      {...animationDataAttrs(anim)}
      {...hoverDataAttrs(hover)}
    >
      {profile.name}
    </Tag>
  )
})








// ─── Agent About  ───────────────────────────────────────────────────────────────────

export const AgentAbout = withBaseProps(function AgentAbout({
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  color   = '#111111',
  as: Tag = 'h2',
  style,
  anim,
  hover,
  store,
  profile,
}) {
  if (!profile?.about) return null
  const resolvedFamily = fontFamily ?? (store?.fonts?.heading ? `var(--font-${store.fonts.heading})` : undefined)
  return (
    <Tag
      suppressHydrationWarning
      style={{
        margin: 0,
        ...(resolvedFamily && { fontFamily: resolvedFamily }),
        ...(fontSize       && { fontSize }),
        ...(fontWeight     && { fontWeight }),
        ...(lineHeight     && { lineHeight }),
        ...(letterSpacing  && { letterSpacing }),
        color,
        ...style,
      }}
      {...animationDataAttrs(anim)}
      {...hoverDataAttrs(hover)}
    >
      {profile.about}
    </Tag>
  )
})







