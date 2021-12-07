import { Carousel } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { ReactElement, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { toastApolloError } from 'src/apollo/error'
import Drawer from 'src/components/atoms/Drawer'
import PageHead from 'src/components/PageHead'
import { useQuestionsQuery } from 'src/graphql/generated/types-and-hooks'
import NavigationLayout from 'src/layouts/NavigationLayout'
import { ALPACA_SALON_COLOR } from 'src/models/constants'
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
  aspect-ratio: 16 / 11;
`

const H3 = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
`

const QuestionUl = styled.ul`
  background: #fff;
  border-radius: 20px 20px 0px 0px;
  height: 100%;
  padding: 1rem;
`

const QuestionLi = styled.li<{ selected: boolean }>`
  color: ${(p) => (p.selected ? ALPACA_SALON_COLOR : '#000')};
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 1rem 0;
`

const description = ''

export default function EventListPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0)
  const router = useRouter()
  const { nickname } = useRecoilValue(currentUser)

  const { data } = useQuestionsQuery({ onError: toastApolloError })

  const questions = data?.questions

  return (
    <PageHead title="톡톡문답 - 알파카살롱" description={description}>
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

      <H3 onClick={() => setIsDrawerOpen(true)}>Q. {questions?.[selectedQuestionIndex].title}</H3>

      <Drawer open={isDrawerOpen} setOpen={setIsDrawerOpen}>
        <QuestionUl>
          {questions?.map((question, i) => (
            <QuestionLi
              key={i}
              selected={selectedQuestionIndex === i}
              onClick={() => {
                setSelectedQuestionIndex(i)
                setIsDrawerOpen(false)
              }}
            >
              Q. {question.title}
            </QuestionLi>
          ))}
        </QuestionUl>
      </Drawer>

      <H3>실시간 답변</H3>
    </PageHead>
  )
}

EventListPage.getLayout = function getLayout(page: ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>
}
