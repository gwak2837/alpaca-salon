import { Carousel, Dropdown, Menu } from 'antd'
import Image from 'next/image'
import { ReactElement, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { toastApolloError } from 'src/apollo/error'
import PageHead from 'src/components/PageHead'
import StoreCard, { StoreLoadingCard } from 'src/components/StoreCard'
import {
  StoreOrderBy,
  useStoresByTownAndCategoriesQuery,
} from 'src/graphql/generated/types-and-hooks'
import useInfiniteScroll from 'src/hooks/useInfiniteScroll'
import HomeLayout from 'src/layouts/HomeLayout'
import NavigationLayout from 'src/layouts/NavigationLayout'
import { TABLET_MIN_WIDTH } from 'src/models/constants'
import { currentCoordinates, currentTown } from 'src/models/recoil'
import { Padding } from 'src/styles'
import styled from 'styled-components'

const CarouselDiv = styled.div`
  position: relative;
  height: 9.7rem;
  line-height: 160px;
  text-align: center;
  background: #f6f6f6;
`

const GridContainerStore = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  padding: 1rem 0;
  gap: 1rem;
  background: #fcfcfc;

  @media (min-width: ${TABLET_MIN_WIDTH}) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }
`

const limit = 4

function getLastValue(key?: StoreOrderBy) {
  switch (key) {
    case StoreOrderBy.Name:
      return 'name'
    default:
      return 'id'
  }
}

export default function HomePage() {
  const townName = useRecoilValue(currentTown)
  const [coordinates, setCoordinates] = useRecoilState(currentCoordinates)
  const [hasMoreData, setHasMoreData] = useState(true)
  const [categories, setCategories] = useState<string[]>([])
  const [orderBy, setOrderBy] = useState<StoreOrderBy>()

  // 데이터 요청
  const { data, loading, fetchMore } = useStoresByTownAndCategoriesQuery({
    notifyOnNetworkStatusChange: true,
    onError: (error) => {
      toastApolloError(error)
      setHasMoreData(false)
    },
    skip: !townName,
    variables: {
      ...(categories.length !== 0 && { categories }),
      ...(orderBy && {
        order: {
          by: orderBy,
        },
      }),
      pagination: { limit },
      town: townName,
    },
  })

  const stores = data?.storesByTownAndCategories

  // 무한 스크롤
  const infiniteScrollRef = useInfiniteScroll({
    hasMoreData,
    onIntersecting: async () => {
      if (stores && stores.length > 0) {
        const lastStore = stores[stores.length - 1]
        const response = await fetchMore({
          variables: {
            pagination: {
              lastId: lastStore.id,
              ...(orderBy && { lastValue: lastStore[getLastValue(orderBy)] }),
              limit,
            },
          },
        }).catch(() => setHasMoreData(false))

        if (response?.data.storesByTownAndCategories?.length !== limit) setHasMoreData(false)
      }
    },
  })

  // 카테고리

  // 정렬
  function updateOrderBy(menuItem: any) {
    setOrderBy(menuItem.key)
    setHasMoreData(true)
  }

  return (
    <PageHead>
      <Carousel autoplay>
        <CarouselDiv>
          <Image src="/images/carousel@3x.webp" alt="carousel" layout="fill" />
        </CarouselDiv>
        <CarouselDiv>
          <Image src="/images/carousel@3x.webp" alt="carousel" layout="fill" />
        </CarouselDiv>
        <CarouselDiv>
          <Image src="/images/carousel@3x.webp" alt="carousel" layout="fill" />
        </CarouselDiv>
        <CarouselDiv>
          <Image src="/images/carousel@3x.webp" alt="carousel" layout="fill" />
        </CarouselDiv>
      </Carousel>
    </PageHead>
  )
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <NavigationLayout>
      <HomeLayout>{page}</HomeLayout>
    </NavigationLayout>
  )
}
