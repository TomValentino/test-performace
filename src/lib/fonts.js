import {
  Playfair_Display, DM_Sans, Fraunces, Cormorant_Garamond,
  Libre_Baskerville, Lora, Raleway, Nunito, Outfit, Syne,
  Josefin_Sans, Crimson_Pro, Spectral, Manrope, Plus_Jakarta_Sans,
  Bodoni_Moda, EB_Garamond, Jost, Urbanist, DM_Serif_Display,
} from 'next/font/google'

// Variable fonts — no `weight` needed, all weights included automatically
const playfairDisplay   = Playfair_Display({   subsets: ['latin'], variable: '--font-playfair-display',   display: 'swap' })
const dmSans            = DM_Sans({            subsets: ['latin'], variable: '--font-dm-sans',             display: 'swap' })
const fraunces          = Fraunces({           subsets: ['latin'], variable: '--font-fraunces',            display: 'swap' })
const lora              = Lora({               subsets: ['latin'], variable: '--font-lora',                display: 'swap' })
const raleway           = Raleway({            subsets: ['latin'], variable: '--font-raleway',             display: 'swap' })
const nunito            = Nunito({             subsets: ['latin'], variable: '--font-nunito',              display: 'swap' })
const outfit            = Outfit({             subsets: ['latin'], variable: '--font-outfit',              display: 'swap' })
const syne              = Syne({               subsets: ['latin'], variable: '--font-syne',                display: 'swap' })
const josefinSans       = Josefin_Sans({       subsets: ['latin'], variable: '--font-josefin-sans',        display: 'swap' })
const crimsonPro        = Crimson_Pro({        subsets: ['latin'], variable: '--font-crimson-pro',         display: 'swap' })
const manrope           = Manrope({            subsets: ['latin'], variable: '--font-manrope',             display: 'swap' })
const plusJakartaSans   = Plus_Jakarta_Sans({  subsets: ['latin'], variable: '--font-plus-jakarta-sans',   display: 'swap' })
const bodoniModa        = Bodoni_Moda({        subsets: ['latin'], variable: '--font-bodoni-moda',         display: 'swap' })
const ebGaramond        = EB_Garamond({        subsets: ['latin'], variable: '--font-eb-garamond',         display: 'swap' })
const jost              = Jost({               subsets: ['latin'], variable: '--font-jost',                display: 'swap' })
const urbanist          = Urbanist({           subsets: ['latin'], variable: '--font-urbanist',            display: 'swap' })

// Static fonts — must list all weights explicitly
const cormorantGaramond = Cormorant_Garamond({ subsets: ['latin'], variable: '--font-cormorant-garamond', display: 'swap', weight: ['300', '400', '500', '600', '700'] })
const libreBaskerville  = Libre_Baskerville({  subsets: ['latin'], variable: '--font-libre-baskerville',  display: 'swap', weight: ['400', '700'] })
const spectral          = Spectral({           subsets: ['latin'], variable: '--font-spectral',            display: 'swap', weight: ['200', '300', '400', '500', '600', '700', '800'] })
const dmSerifDisplay    = DM_Serif_Display({   subsets: ['latin'], variable: '--font-dm-serif-display',   display: 'swap', weight: ['400'] })

const FONT_MAP = {
  'playfair-display':   playfairDisplay,
  'dm-sans':            dmSans,
  'fraunces':           fraunces,
  'cormorant-garamond': cormorantGaramond,
  'libre-baskerville':  libreBaskerville,
  'lora':               lora,
  'raleway':            raleway,
  'nunito':             nunito,
  'outfit':             outfit,
  'syne':               syne,
  'josefin-sans':       josefinSans,
  'crimson-pro':        crimsonPro,
  'spectral':           spectral,
  'manrope':            manrope,
  'plus-jakarta-sans':  plusJakartaSans,
  'bodoni-moda':        bodoniModa,
  'eb-garamond':        ebGaramond,
  'jost':               jost,
  'urbanist':           urbanist,
  'dm-serif-display':   dmSerifDisplay,
}

export function getFontVariables(fonts = []) {
  return fonts
    .map(key => FONT_MAP[key])
    .filter(Boolean)
    .map(f => f.variable)
    .join(' ')
}

export function resolveFonts(prop, storeFont, fallback) {
  return prop === false ? fallback : (prop ?? storeFont ?? fallback)
}

export function getFontStyle(fonts = {}) {
  const style = {}
  if (fonts.heading && FONT_MAP[fonts.heading]) {
    style['--font-heading'] = `var(--font-${fonts.heading})`
  }
  if (fonts.body && FONT_MAP[fonts.body]) {
    style['--font-body'] = `var(--font-${fonts.body})`
  }
  return style
}