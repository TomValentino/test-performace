import { animationDataAttrs, hoverDataAttrs, withBaseProps } from "@/lib/render"








// ─── Collection Title ───────────────────────────────────────────────────────────────────

export const CollectionTitle = withBaseProps(function CollectionTitle({
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
  collection,
  store,
}) {
  if (!collection?.name) return null
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
      {collection.name}
    </Tag>
  )
})

