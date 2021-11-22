import { Carousel } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { toastApolloError } from 'src/apollo/error'
import PageHead from 'src/components/PageHead'
import { usePostsQuery } from 'src/graphql/generated/types-and-hooks'
import useInfiniteScroll from 'src/hooks/useInfiniteScroll'
import NavigationLayout from 'src/layouts/NavigationLayout'
import { NAVIGATION_HEIGHT, TABLET_MIN_WIDTH } from 'src/models/constants'
import { currentUser } from 'src/models/recoil'
import WriteIcon from 'src/svgs/write-icon.svg'
import styled from 'styled-components'

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1rem;
`

const Title = styled.h2`
  font-family: tvN EnjoystoriesOTF;
`

const WhiteButton = styled.button`
  padding: 8px 12px;
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 5px;
`

const Frame16to11 = styled.div`
  position: relative;
  padding-top: 68.75%;

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
  const { uniqueName } = useRecoilValue(currentUser)

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

  function goToPostCreationPage() {
    router.push('/post/create')
  }

  return (
    <PageHead>
      <FlexContainer>
        <Title>알파카살롱</Title>
        {uniqueName ? (
          <WhiteButton onClick={() => router.push(`/@${uniqueName}`)}>마이페이지</WhiteButton>
        ) : (
          <WhiteButton onClick={() => router.push('/login')}>로그인</WhiteButton>
        )}
      </FlexContainer>
      <Carousel autoplay>
        <Frame16to11>
          <Image src="/images/sample-banner.png" alt="banner" layout="fill" objectFit="cover" />
        </Frame16to11>
        <Frame16to11>
          <Image src="/images/sample-banner.png" alt="banner" layout="fill" objectFit="cover" />
        </Frame16to11>
        <Frame16to11>
          <Image src="/images/sample-banner.png" alt="banner" layout="fill" objectFit="cover" />
        </Frame16to11>
      </Carousel>
      <GridContainerStore>
        {posts
          ? posts.map((post, i) => <pre key={i}>{JSON.stringify(post, null, 2)}</pre>)
          : !loading && <div>글이 없어요</div>}
        {loading && <div>loading...</div>}
      </GridContainerStore>
      {!loading && hasMoreData && <div ref={infiniteScrollRef}>무한 스크롤</div>}

      <FixedPosition>
        <PrimaryButton onClick={goToPostCreationPage}>
          <WriteIcon />
          글쓰기
        </PrimaryButton>
      </FixedPosition>
    </PageHead>
  )
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>
}
