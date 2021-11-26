import { Carousel } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import { useRecoilValue } from 'recoil'
import PageHead from 'src/components/PageHead'
import NavigationLayout from 'src/layouts/NavigationLayout'
import { currentUser } from 'src/models/recoil'
import styled from 'styled-components'
import { PrimaryH3 } from '..'

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
  background: #fff;
  border: 1px solid #eee;
  border-radius: 5px;
  font-size: 0.9rem;
  padding: 0.5rem 0.75rem;
`

const Frame16to11 = styled.div`
  position: relative;
  padding-top: 68.75%;
`

const Carousel2 = styled.section`
  position: relative;
  padding-top: 75%;
  filter: drop-shadow(0 0 10px #0003);
  perspective: 100px;
`

const Viewport = styled.ol`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  overflow-x: scroll;
  counter-reset: item;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
`

const Slide = styled.li<{ color: string }>`
  position: relative;
  flex: 0 0 100%;
  width: 100%;
  counter-increment: item;

  background: ${(p) => p.color};
`

const Snapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  scroll-snap-align: center;
`

const description = ''

export default function EventListPage() {
  const router = useRouter()
  const { nickname } = useRecoilValue(currentUser)

  return (
    <PageHead title=" - 알파카살롱" description={description}>
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
          <Image src="/images/banner3.png" alt="banner" layout="fill" objectFit="cover" />
        </Frame16to11>
        <Frame16to11>
          <Image src="/images/banner4.png" alt="banner" layout="fill" objectFit="cover" />
        </Frame16to11>
      </Carousel>

      <PrimaryH3>오늘의 질문</PrimaryH3>

      <Carousel2>
        <Viewport>
          <Slide color="#f99">
            <Snapper>
              <a href="#carousel__slide4" className="carousel__prev">
                Go to last slide
              </a>
              <a href="#carousel__slide2" className="carousel__next">
                Go to next slide
              </a>
            </Snapper>
          </Slide>
          <Slide color="#a99">
            <Snapper />
            <a href="#carousel__slide1" className="carousel__prev">
              Go to previous slide
            </a>
            <a href="#carousel__slide3" className="carousel__next">
              Go to next slide
            </a>
          </Slide>
          <Slide color="#29f">
            <Snapper />
            <a href="#carousel__slide2" className="carousel__prev">
              Go to previous slide
            </a>
            <a href="#carousel__slide4" className="carousel__next">
              Go to next slide
            </a>
          </Slide>
          <Slide color="#79a">
            <Snapper />
            <a href="#carousel__slide3" className="carousel__prev">
              Go to previous slide
            </a>
            <a href="#carousel__slide1" className="carousel__next">
              Go to first slide
            </a>
          </Slide>
        </Viewport>
      </Carousel2>

      <PrimaryH3>다른 사람들의 댓글</PrimaryH3>
    </PageHead>
  )
}

EventListPage.getLayout = function getLayout(page: ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>
}
