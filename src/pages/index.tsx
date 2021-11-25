import { Carousel } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { ReactElement, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { toastApolloError } from 'src/apollo/error'
import FamousPostCard from 'src/components/FamousPostCard'
import PageHead from 'src/components/PageHead'
import PostCard from 'src/components/PostCard'
import { useFamousPostsQuery, usePostsQuery } from 'src/graphql/generated/types-and-hooks'
import useInfiniteScroll from 'src/hooks/useInfiniteScroll'
import NavigationLayout from 'src/layouts/NavigationLayout'
import {
  ALPACA_SALON_COLOR,
  ALPACA_SALON_DARK_GREY_COLOR,
  NAVIGATION_HEIGHT,
  TABLET_MIN_WIDTH,
} from 'src/models/constants'
import { currentUser } from 'src/models/recoil'
import WriteIcon from 'src/svgs/write-icon.svg'
import styled from 'styled-components'

const Background = styled.div`
  background: #c691b7;
`

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1rem;
`

const Title = styled.h2`
  color: #fff;
  font-family: tvN EnjoystoriesOTF;
`

const WhiteButton = styled.button`
  background: #ffffff20;
  border: 1px solid #ddd;
  border-radius: 5px;
  color: #fff;
  font-size: 0.9rem;
  padding: 0.5rem 0.75rem;
`

const Frame16to11 = styled.div`
  position: relative;
  padding-top: 68.75%;

  background: #c691b7;
`

const BorderRadius = styled.div`
  background: #fafafa;
  border-radius: 1.2rem 1.2rem 0px 0px;
  padding: 1rem 0;
`

const PrimaryH3 = styled.h3`
  color: ${ALPACA_SALON_COLOR};
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0.5rem;
`

const GreyH5 = styled.h5`
  color: ${ALPACA_SALON_DARK_GREY_COLOR};
  font-size: 14px;
  margin: 0.5rem;
`

const GridContainerPost = styled.ul`
  display: grid;
  /* grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); */
  padding: 1rem;
  gap: 1rem;

  /* 
  @media (min-width: ${TABLET_MIN_WIDTH}) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  } */
`

const FixedPosition = styled.div`
  position: fixed;
  bottom: ${NAVIGATION_HEIGHT};
  z-index: 1;
  width: 100%;
  max-width: ${TABLET_MIN_WIDTH};

  display: flex;
  justify-content: flex-end;

  padding: 1.25rem;
`

const PrimaryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  background: #7c2f70;
  box-shadow: 0px 4px 20px rgba(16, 16, 16, 0.25);
  border: none;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  padding: 0.7rem 1rem;
`

const limit = 2

export default function HomePage() {
  const [hasMoreData, setHasMoreData] = useState(true)
  const router = useRouter()
  const { nickname } = useRecoilValue(currentUser)

  const { data: data2, loading: famousPostsLoading } = useFamousPostsQuery({
    onError: toastApolloError,
  })

  const famousPosts = data2?.famousPosts

  // 데이터 요청
  const { data, loading, fetchMore } = usePostsQuery({
    notifyOnNetworkStatusChange: true,
    onError: (error) => {
      toastApolloError(error)
      setHasMoreData(false)
    },
    skip: !limit,
    variables: {
      pagination: { limit },
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

  function goToPostCreationPage() {
    const jwt = window.sessionStorage.getItem('jwt')

    if (jwt) {
      router.push('/post/create')
    } else {
      router.push('/login')
    }
  }

  return (
    <PageHead>
      <Background>
        <FlexContainer>
          <Title>알파카살롱</Title>
          {nickname ? (
            <WhiteButton onClick={() => router.push(`/@${nickname}`)}>마이페이지</WhiteButton>
          ) : (
            <WhiteButton onClick={() => router.push('/login')}>로그인</WhiteButton>
          )}
        </FlexContainer>

        <Carousel autoplay>
          <Frame16to11>
            <Image src="/images/sample-banner.png" alt="banner" layout="fill" objectFit="contain" />
          </Frame16to11>
          <Frame16to11>
            <Image
              src="/images/sample-banner2.png"
              alt="banner"
              layout="fill"
              objectFit="contain"
            />
          </Frame16to11>
        </Carousel>

        <BorderRadius>
          <PrimaryH3>이번 달 핫한 이야기</PrimaryH3>
          <GreyH5>관리자 알파카가 이번 주에 도움이 되는 질문들을 선별해 소개해요.</GreyH5>
          <GridContainerPost>
            {famousPosts
              ? famousPosts.map((famousPost, i) => (
                  <FamousPostCard key={i} famousPost={famousPost} index={i + 1} />
                ))
              : !famousPostsLoading && <div>글이 없어요</div>}
            {famousPostsLoading && <div>핫한 이야기 불러오는 중...</div>}
          </GridContainerPost>

          <PrimaryH3>최신 이야기</PrimaryH3>
          <GridContainerPost>
            {posts
              ? posts.map((post, i) => <PostCard key={i} post={post} />)
              : !loading && <div>글이 없어요</div>}
            {loading && <div>최신 이야기 불러오는 중...</div>}
          </GridContainerPost>
          {!loading && hasMoreData && <div ref={infiniteScrollRef}>무한 스크롤</div>}
        </BorderRadius>

        <FixedPosition>
          <PrimaryButton onClick={goToPostCreationPage}>
            <WriteIcon />
            글쓰기
          </PrimaryButton>
        </FixedPosition>
      </Background>
    </PageHead>
  )
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>
}
