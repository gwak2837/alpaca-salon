import { Carousel } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import { toastApolloError } from 'src/apollo/error'
import PageHead from 'src/components/PageHead'
import { usePostsQuery } from 'src/graphql/generated/types-and-hooks'
import useInfiniteScroll from 'src/hooks/useInfiniteScroll'
import NavigationLayout from 'src/layouts/NavigationLayout'
import { TABLET_MIN_WIDTH } from 'src/models/constants'
import styled from 'styled-components'

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 1rem;
`

const CarouselDiv = styled.div`
  position: relative;
  height: 9.7rem;
  line-height: 160px;
  text-align: center;
  background: #f6f6f6;
`

const GridContainerStore = styled.ul`
  display: grid;
  /* grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); */
  padding: 1rem 0;
  gap: 1rem;
  background: #fcfcfc;
  /* 
  @media (min-width: ${TABLET_MIN_WIDTH}) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  } */
`

const limit = 2

export default function HomePage() {
  const [hasMoreData, setHasMoreData] = useState(true)
  const router = useRouter()

  // 데이터 요청
  const { data, loading, fetchMore } = usePostsQuery({
    notifyOnNetworkStatusChange: true,
    onError: (error) => {
      toastApolloError(error)
      setHasMoreData(false)
    },
    skip: !limit,
    variables: {
      pagination: { lastId: '100', limit },
    },
  })

  const posts = data?.posts

  // 무한 스크롤
  const infiniteScrollRef = useInfiniteScroll({
    hasMoreData,
    onIntersecting: async () => {
      if (posts && posts.length > 0) {
        const lastPost = posts[posts.length - 1]
        const response = await fetchMore({
          variables: {
            pagination: {
              lastId: lastPost.id,
              limit,
            },
          },
        }).catch(() => setHasMoreData(false))

        if (response?.data.posts?.length !== limit) setHasMoreData(false)
      }
    },
  })

  // 카테고리

  // 정렬

  return (
    <PageHead>
      <FlexContainer>
        <h3>알파카살롱</h3>
        <button onClick={() => router.push('/login')}>로그인</button>
      </FlexContainer>

      <Carousel autoplay>
        <CarouselDiv>배너1</CarouselDiv>
        <CarouselDiv>배너2</CarouselDiv>
        <CarouselDiv>배너3</CarouselDiv>
        <CarouselDiv>배너4</CarouselDiv>
      </Carousel>

      <GridContainerStore>
        {posts
          ? posts.map((post, i) => <pre key={i}>{JSON.stringify(post, null, 2)}</pre>)
          : !loading && <div>글이 없어요</div>}
        {loading && <div>loading...</div>}
      </GridContainerStore>

      {!loading && hasMoreData && <div ref={infiniteScrollRef}>무한 스크롤</div>}
    </PageHead>
  )
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>
}
