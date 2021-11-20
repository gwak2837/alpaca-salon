import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import {
  ALPACA_SALON_ACHROMATIC_COLOR,
  ALPACA_SALON_COLOR,
  NAVIGATION_HEIGHT,
} from 'src/models/constants'
import { TABLET_MIN_WIDTH } from 'src/models/constants'
import PostIcon from 'src/svgs/PostIcon'
import VideoIcon from 'src/svgs/VideoIcon'
import styled from 'styled-components'

const Padding = styled.div`
  padding-top: ${NAVIGATION_HEIGHT};
`

const PostIconWrapper = styled.div`
  width: 1.1rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
`

const VideoIconWrapper = styled.div`
  width: 1.3rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
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

type Props = {
  children: ReactNode
}

export default function NavigationLayout({ children }: Props) {
  const { asPath } = useRouter()

  const doesPostListSelected = asPath === '/'
  const doesEventListSelected = asPath.startsWith('/event')

  return (
    <>
      {children}
      <Padding />

      <FixedNavigation>
        <Link href="/" passHref>
          <A color={doesPostListSelected ? ALPACA_SALON_COLOR : ALPACA_SALON_ACHROMATIC_COLOR}>
            <PostIconWrapper>
              <PostIcon selected={doesPostListSelected} />
            </PostIconWrapper>
            <div>게시판</div>
          </A>
        </Link>

        <Link href="/event" passHref>
          <A color={doesEventListSelected ? ALPACA_SALON_COLOR : ALPACA_SALON_ACHROMATIC_COLOR}>
            <VideoIconWrapper>
              <VideoIcon selected={doesEventListSelected} />
            </VideoIconWrapper>
            <div>생생 수다</div>
          </A>
        </Link>
      </FixedNavigation>
    </>
  )
}
