import { Tabs } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { useRecoilValue } from 'recoil'
import { TABLET_MIN_WIDTH } from 'src/models/constants'
import { currentTown } from 'src/models/recoil'
import styled from 'styled-components'

import { FlexContainerBetweenCenter } from '../styles'

const { TabPane } = Tabs

const PaddingTop = styled.div`
  padding-top: 98px;
`

const FixedPosition = styled.div`
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100%;
  max-width: ${TABLET_MIN_WIDTH};
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
  background: #fff;

  padding: 1rem 1rem 0;
`

const FlexContainer = styled.div`
  display: flex;
  align-items: center;

  gap: 0.5rem;
`

const LocationH3 = styled.h3`
  display: inline-block;
  color: black;
`

const TopIconDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 3.5rem;
  height: 1.3rem;
  margin: 0;
`

const ArrowDownIconWrapper = styled.div`
  width: 11px;
`

function getActiveKey(asPath: string) {
  switch (asPath) {
    case '/':
    case '/menus':
    case '/feed':
      return asPath
    default:
      return '/'
  }
}

type Props = {
  children: ReactNode
}

export default function HomeLayout({ children }: Props) {
  const townName = useRecoilValue(currentTown)

  const router = useRouter()

  function goToTabPage(activeKey: string) {
    router.push(activeKey)
  }

  // useEffect(() => {
  //   getCoordinates()
  //   setTown()
  // }, [])

  return (
    <>
      <FixedPosition>
        <FlexContainerBetweenCenter>
          <Link href="/location" passHref>
            <a>
              <FlexContainer>
                <LocationH3>{townName}</LocationH3>
              </FlexContainer>
            </a>
          </Link>
          <TopIconDiv>
            <Link href="/location" passHref>
              <a>a</a>
            </Link>
            <Link href="/location" passHref>
              <a>b</a>
            </Link>
          </TopIconDiv>
        </FlexContainerBetweenCenter>
        <Tabs activeKey={getActiveKey(router.asPath)} onTabClick={goToTabPage}>
          <TabPane tab="공간" key="/"></TabPane>
          <TabPane tab="메뉴" key="/menus" />
          <TabPane tab="피드" key="/feed" />
        </Tabs>
      </FixedPosition>

      <PaddingTop />
      {children}
    </>
  )
}
