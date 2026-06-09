import { animationDataAttrs, hoverDataAttrs, withBaseProps } from "@/lib/render"
import styles from './collection.module.css'
import { PropImage } from "@/components/img"
import { SmartLink } from "./old/old-layouts"
import { formatPrice } from "@/lib/format"
import { Icon } from "@/components/icons"
import Image from "next/image"








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


// ─── Card: Default (image top, details below) ─────────────────────────────────
 
function PropertyCardDefault({ property, store, anim, hover }) {
  const photo = property.photos?.[0]
  const { specs = {} } = property
 
  return (
    <SmartLink
      suppressHydrationWarning
      href={`property/${property.meta_handle}`}
      username={store?.username}
      className={styles.cardDefault}
      {...animationDataAttrs(anim)}
      {...hoverDataAttrs(hover)}
    >
      {photo && (
        <div className={styles.cardImageWrap}>
          <Image
            src={photo.url}
            alt={photo.alt ?? property.title ?? ''}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}
      <div className={styles.cardBody}>
        {property.price && (
          <p className={styles.cardPrice}>{formatPrice(property.price, store?.currency)}</p>
        )}
        {property.title && (
          <h3 className={styles.cardTitle}>{property.title}</h3>
        )}
        {property.address?.suburb && (
          <p className={styles.cardAddress}>{property.address.suburb}</p>
        )}
        <div className={styles.cardSpecs}>
          {specs.beds    != null && <span><Icon name="bed"    size={14} /> {specs.beds}    bed</span>}
          {specs.baths   != null && <span><Icon name="bath"   size={14} /> {specs.baths}   bath</span>}
          {specs.garages != null && <span><Icon name="garage" size={14} /> {specs.garages} garage</span>}
          {specs.area    != null && <span><Icon name="area"   size={14} /> {specs.area}    m²</span>}
        </div>
      </div>
    </SmartLink>
  )
}
 
// ─── Card: Horizontal (image left, details right) ─────────────────────────────
 
function PropertyCardHorizontal({ property, store, anim, hover }) {
  const photo = property.photos?.[0]
  const { specs = {} } = property
 
  return (
    <SmartLink
      suppressHydrationWarning
      href={`property/${property.meta_handle}`}
      username={store?.username}
      className={styles.cardHorizontal}
      {...animationDataAttrs(anim)}
      {...hoverDataAttrs(hover)}
    >
      {photo && (
        <div className={styles.cardHorizImageWrap}>
          <Image
            src={photo.url}
            alt={photo.alt ?? property.title ?? ''}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}
      <div className={styles.cardHorizBody}>
        {property.price && (
          <p className={styles.cardPrice}>{formatPrice(property.price, store?.currency)}</p>
        )}
        {property.title && (
          <h3 className={styles.cardTitle}>{property.title}</h3>
        )}
        {property.address?.suburb && (
          <p className={styles.cardAddress}>{property.address.suburb}</p>
        )}
        <div className={styles.cardSpecs}>
          {specs.beds    != null && <span><Icon name="bed"    size={14} /> {specs.beds}    bed</span>}
          {specs.baths   != null && <span><Icon name="bath"   size={14} /> {specs.baths}   bath</span>}
          {specs.garages != null && <span><Icon name="garage" size={14} /> {specs.garages} garage</span>}
          {specs.area    != null && <span><Icon name="area"   size={14} /> {specs.area}    m²</span>}
        </div>
      </div>
    </SmartLink>
  )
}
 
// ─── Card map ─────────────────────────────────────────────────────────────────
 
const CARD_MAP = {
  default:    PropertyCardDefault,
  horizontal: PropertyCardHorizontal,
}
 
// ─── CollectionProperties ─────────────────────────────────────────────────────
 
export const CollectionProperties = withBaseProps(function CollectionProperties({
  cardStyle    = 'default',
  columns      = 3,
  gap          = '1.5rem',
  animStagger,
  style,
  anim,
  hover,
  collection,
  store,
}) {
  const properties = collection?.properties
  if (!properties?.length) return null
 
  const Card       = CARD_MAP[cardStyle] ?? PropertyCardDefault
  const hasStagger = animStagger != null && anim?.animation
 
  return (
    <div
      suppressHydrationWarning
      className={styles.grid}
      style={{ '--cols': columns, '--gap': gap, ...style }}
    >
      {properties.map((property, i) => (
        <Card
          key={property.id}
          property={property}
          store={store}
          hover={hover}
          anim={hasStagger ? {
            ...anim,
            animDelay: (parseFloat(anim.animDelay ?? 0) + i * animStagger).toFixed(2),
          } : anim}
        />
      ))}
    </div>
  )
})
 