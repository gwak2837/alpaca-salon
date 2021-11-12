import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import {
  ALPACA_SALON_ACHROMATIC_COLOR,
  ALPACA_SALON_TEXT_COLOR,
  NAVIGATION_HEIGHT,
} from 'src/models/constants'
import { TABLET_MIN_WIDTH } from 'src/models/constants'
import styled from 'styled-components'

const Padding = styled.div`
  padding: ${NAVIGATION_HEIGHT};
`

const FixedNavigation = styled.nav`
  position: fixed;
  bottom: 0;
  z-index: 1;

  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-items: center;
  align-items: center;

  width: 100%;
  max-width: ${TABLET_MIN_WIDTH};
  height: ${NAVIGATION_HEIGHT};
  box-shadow: 0 -3px 3px 0 rgba(0, 0, 0, 0.06);
  background-color: #fff;
`

const SClientSideLink = styled.a<{ color: string }>`
  color: ${(p) => p.color};

  :hover {
    color: ${ALPACA_SALON_TEXT_COLOR};
  }

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  font-size: 0.9rem;
`

type Props = {
  children: ReactNode
}

export default function NavigationLayout({ children }: Props) {
  const { asPath } = useRouter()

  const doesNewsSelected = asPath.startsWith('/news')
  const doesTrendSelected = asPath.startsWith('/trends')

  return (
    <>
      {children}
      <Padding />

      <FixedNavigation>
        <SClientSideLink
          color={doesNewsSelected ? ALPACA_SALON_TEXT_COLOR : ALPACA_SALON_ACHROMATIC_COLOR}
          href="/news"
        >
          <div>소식</div>
        </SClientSideLink>

        <SClientSideLink
          color={doesTrendSelected ? ALPACA_SALON_TEXT_COLOR : ALPACA_SALON_ACHROMATIC_COLOR}
          href="/trends"
        >
          <div>트렌드</div>
        </SClientSideLink>
      </FixedNavigation>
    </>
  )
}
