import {
  Playfair_Display, DM_Sans, Fraunces, Cormorant_Garamond,
  Libre_Baskerville, Lora, Raleway, Nunito, Outfit, Syne,
  Josefin_Sans, Crimson_Pro, Spectral, Manrope, Plus_Jakarta_Sans,
  Bodoni_Moda, EB_Garamond, Jost, Urbanist, DM_Serif_Display,
} from 'next/font/google'

const playfair_display   = Playfair_Display({   subsets: ['latin'], variable: '--font-playfair-display' })
const dm_sans            = DM_Sans({            subsets: ['latin'], variable: '--font-dm-sans' })
const fraunces           = Fraunces({           subsets: ['latin'], variable: '--font-fraunces' })
const cormorant_garamond = Cormorant_Garamond({ subsets: ['latin'], variable: '--font-cormorant-garamond', weight: ['300','400','600'] })
const libre_baskerville  = Libre_Baskerville({  subsets: ['latin'], variable: '--font-libre-baskerville', weight: ['400','700'] })
const lora               = Lora({               subsets: ['latin'], variable: '--font-lora' })
const raleway            = Raleway({            subsets: ['latin'], variable: '--font-raleway' })
const nunito             = Nunito({             subsets: ['latin'], variable: '--font-nunito' })
const outfit             = Outfit({             subsets: ['latin'], variable: '--font-outfit' })
const syne               = Syne({              subsets: ['latin'], variable: '--font-syne' })
const josefin_sans       = Josefin_Sans({       subsets: ['latin'], variable: '--font-josefin-sans' })
const crimson_pro        = Crimson_Pro({        subsets: ['latin'], variable: '--font-crimson-pro' })
const spectral           = Spectral({           subsets: ['latin'], variable: '--font-spectral', weight: ['400','600'] })
const manrope            = Manrope({            subsets: ['latin'], variable: '--font-manrope' })
const plus_jakarta_sans  = Plus_Jakarta_Sans({  subsets: ['latin'], variable: '--font-plus-jakarta-sans' })
const bodoni_moda        = Bodoni_Moda({        subsets: ['latin'], variable: '--font-bodoni-moda' })
const eb_garamond        = EB_Garamond({        subsets: ['latin'], variable: '--font-eb-garamond' })
const jost               = Jost({              subsets: ['latin'], variable: '--font-jost' })
const urbanist           = Urbanist({          subsets: ['latin'], variable: '--font-urbanist' })
const dm_serif_display   = DM_Serif_Display({   subsets: ['latin'], variable: '--font-dm-serif-display', weight: ['400'] })

const FONT_MAP = {
  playfair_display,
  dm_sans,
  fraunces,
  cormorant_garamond,
  libre_baskerville,
  lora,
  raleway,
  nunito,
  outfit,
  syne,
  josefin_sans,
  crimson_pro,
  spectral,
  manrope,
  plus_jakarta_sans,
  bodoni_moda,
  eb_garamond,
  jost,
  urbanist,
  dm_serif_display,
}

export function getFontVariables(fonts = []) {
  return fonts
    .map(key => FONT_MAP[key])
    .filter(Boolean)
    .map(f => f.variable)
    .join(' ')
}