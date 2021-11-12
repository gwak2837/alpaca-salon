export const MOBILE_MIN_WIDTH = '280px'
export const TABLET_MIN_WIDTH = '560px'
export const DESKTOP_MIN_WIDTH = '1024px'

export const ALPACA_SALON_COLOR = '#F5827D' // manifest.json 파일의 theme_color 필드랑 일치
export const ALPACA_SALON_TEXT_COLOR = '#111'
export const ALPACA_SALON_ACHROMATIC_COLOR = '#A3A3A3'

export const NAVIGATION_HEIGHT = '4rem'

export const SECONDARY_BACKGROUND_COLOR = '#2fccba'
export const SECONDARY_TEXT_COLOR = '#2fccba'
export const SECONDARY_ACHROMATIC_COLOR = '#2fccba'

export const APPLICATION_SHORT_NAME = '알파카살롱'
export const APPLICATION_NAME = '알파카살롱 (Alpaca salon)'
export const CANONICAL_URL =
  process.env.NODE_ENV === 'production'
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000'
