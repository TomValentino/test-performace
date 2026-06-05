import {
  Playfair_Display, DM_Sans, Fraunces, Cormorant_Garamond,
  Libre_Baskerville, Lora, Raleway, Nunito, Outfit, Syne,
  Josefin_Sans, Crimson_Pro, Spectral, Manrope, Plus_Jakarta_Sans,
  Bodoni_Moda, EB_Garamond, Jost, Urbanist, DM_Serif_Display,
} from 'next/font/google'

// Variable fonts — no `weight` needed, all weights included automatically
const playfair_display   = Playfair_Display({   subsets: ['latin'], variable: '--font-playfair-display',   display: 'swap' })
const dm_sans            = DM_Sans({            subsets: ['latin'], variable: '--font-dm-sans',             display: 'swap' })
const fraunces           = Fraunces({           subsets: ['latin'], variable: '--font-fraunces',            display: 'swap' })
const lora               = Lora({               subsets: ['latin'], variable: '--font-lora',               display: 'swap' })
const raleway            = Raleway({            subsets: ['latin'], variable: '--font-raleway',             display: 'swap' })
const nunito             = Nunito({             subsets: ['latin'], variable: '--font-nunito',              display: 'swap' })
const outfit             = Outfit({             subsets: ['latin'], variable: '--font-outfit',              display: 'swap' })
const syne               = Syne({               subsets: ['latin'], variable: '--font-syne',               display: 'swap' })
const josefin_sans       = Josefin_Sans({       subsets: ['latin'], variable: '--font-josefin-sans',       display: 'swap' })
const crimson_pro        = Crimson_Pro({        subsets: ['latin'], variable: '--font-crimson-pro',        display: 'swap' })
const manrope            = Manrope({            subsets: ['latin'], variable: '--font-manrope',            display: 'swap' })
const plus_jakarta_sans  = Plus_Jakarta_Sans({  subsets: ['latin'], variable: '--font-plus-jakarta-sans',  display: 'swap' })
const bodoni_moda        = Bodoni_Moda({        subsets: ['latin'], variable: '--font-bodoni-moda',        display: 'swap' })
const eb_garamond        = EB_Garamond({        subsets: ['latin'], variable: '--font-eb-garamond',        display: 'swap' })
const jost               = Jost({               subsets: ['latin'], variable: '--font-jost',               display: 'swap' })
const urbanist           = Urbanist({           subsets: ['latin'], variable: '--font-urbanist',           display: 'swap' })

// Static fonts — must list all weights explicitly
const cormorant_garamond = Cormorant_Garamond({ subsets: ['latin'], variable: '--font-cormorant-garamond', display: 'swap', weight: ['300', '400', '500', '600', '700'] })
const libre_baskerville  = Libre_Baskerville({  subsets: ['latin'], variable: '--font-libre-baskerville',  display: 'swap', weight: ['400', '700'] })
const spectral           = Spectral({           subsets: ['latin'], variable: '--font-spectral',           display: 'swap', weight: ['200', '300', '400', '500', '600', '700', '800'] })
const dm_serif_display   = DM_Serif_Display({   subsets: ['latin'], variable: '--font-dm-serif-display',   display: 'swap', weight: ['400'] })

const FONT_MAP = {
  playfair_display, dm_sans, fraunces, cormorant_garamond, libre_baskerville,
  lora, raleway, nunito, outfit, syne, josefin_sans, crimson_pro, spectral,
  manrope, plus_jakarta_sans, bodoni_moda, eb_garamond, jost, urbanist, dm_serif_display,
}

export function getFontVariables(fonts = []) {
  return fonts
    .map(key => FONT_MAP[key.replace(/-/g, '_')])
    .filter(Boolean)
    .map(f => f.variable)
    .join(' ')
}