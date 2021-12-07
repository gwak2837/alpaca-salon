import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import {
  ALPACA_SALON_ACHROMATIC_COLOR,
  ALPACA_SALON_COLOR,
  ALPACA_SALON_GREY_COLOR,
  NAVIGATION_HEIGHT,
} from 'src/models/constants'
import { TABLET_MIN_WIDTH } from 'src/models/constants'
import FireIcon from 'src/svgs/FireIcon'
import HealthIcon from 'src/svgs/HealthIcon'
import styled from 'styled-components'

const Padding = styled.div`
  padding-top: ${NAVIGATION_HEIGHT};
`

const HealthIconWrapper = styled.div`
  width: 1.6rem;
  height: 2rem;
  display: flex;
  align-items: center;

  svg {
    width: 100%; // for Safari
  }
`

const FireIconWrapper = styled.div`
  width: 1.6rem;
  height: 2rem;
  display: flex;
  align-items: center;

  svg {
    width: 100%; // for Safari
  }
`

const FixedNavigation = styled.nav`
  position: fixed;
  bottom: 0;
  z-index: 1;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  align-items: center;

  width: 100%;
  max-width: ${TABLET_MIN_WIDTH};
  height: ${NAVIGATION_HEIGHT};
  box-shadow: 0 -3px 3px 0 rgba(0, 0, 0, 0.06);
  background-color: #fff;
`

const A = styled.a<{ color: string }>`
  color: ${(p) => p.color};

  :hover {
    color: ${ALPACA_SALON_COLOR};
  }

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  font-size: 0.9rem;
`

const SelectedH4 = styled.h4<{ selected: boolean }>`
  color: ${(p) => (p.selected ? ALPACA_SALON_COLOR : ALPACA_SALON_GREY_COLOR)};
  font-size: 0.9rem;
`

type Props = {
  children: ReactNode
}

export default function NavigationLayout({ children }: Props) {
  const { asPath } = useRouter()

  const doesPostListSelected = asPath === '/'
  const doesEventListSelected = asPath.startsWith('/question')

  return (
    <>
      {children}
      <Padding />

      <FixedNavigation>
        <Link href="/" passHref>
          <A color={doesPostListSelected ? ALPACA_SALON_COLOR : ALPACA_SALON_ACHROMATIC_COLOR}>
            <HealthIconWrapper>
              <HealthIcon selected={doesPostListSelected} />
            </HealthIconWrapper>
            <SelectedH4 selected={doesPostListSelected}>건강문답</SelectedH4>
          </A>
        </Link>

        <Link href="/question" passHref>
          <A color={doesEventListSelected ? ALPACA_SALON_COLOR : ALPACA_SALON_ACHROMATIC_COLOR}>
            <FireIconWrapper>
              <FireIcon selected={doesEventListSelected} />
            </FireIconWrapper>
            <SelectedH4 selected={doesEventListSelected}>톡톡문답</SelectedH4>
          </A>
        </Link>
      </FixedNavigation>
    </>
  )
}
