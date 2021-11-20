export const MOBILE_MIN_WIDTH = '280px'
export const TABLET_MIN_WIDTH = '560px'
export const DESKTOP_MIN_WIDTH = '1024px'

export const ALPACA_SALON_COLOR = '#7C2F70' // manifest.json 파일의 theme_color 필드랑 일치
export const ALPACA_SALON_BACKGROUND_COLOR = '#F8F6FA'
export const ALPACA_SALON_ACHROMATIC_COLOR = '#B5B5B5'

export const NAVIGATION_HEIGHT = '4rem'

export const SECONDARY_BACKGROUND_COLOR = '#2fccba'
export const SECONDARY_TEXT_COLOR = '#2fccba'
export const SECONDARY_ACHROMATIC_COLOR = '#2fccba'

export const APPLICATION_SHORT_NAME = '알파카살롱'
export const APPLICATION_NAME = '알파카살롱 (Alpaca salon)'
export const CANONICAL_URL =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? 'https://alpacasalon.vercel.app'
    : process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000'
