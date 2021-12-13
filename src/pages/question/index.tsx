import { Carousel } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { ReactElement, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilValue } from 'recoil'
import { toastApolloError } from 'src/apollo/error'
import Drawer from 'src/components/atoms/Drawer'
import PageHead from 'src/components/PageHead'
import { useQuestionsQuery } from 'src/graphql/generated/types-and-hooks'
import NavigationLayout from 'src/layouts/NavigationLayout'
import { ALPACA_SALON_COLOR } from 'src/models/constants'
import { currentUser } from 'src/models/recoil'
import DownArrowIcon from 'src/svgs/down-arrow.svg'
import styled from 'styled-components'

import { submitWhenShiftEnter } from '../post/create'

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1rem;
  position: sticky;
  top: 0;
  z-index: 1;
  background: #fff;
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

const Padding = styled.div`
  padding: 0.6rem;
  background: #fafafa;
`

const H3 = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  padding: 0.7rem 0.5rem;
  position: relative;

  > svg {
    width: 1.5rem;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }
`

const GridForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr auto;
  gap: 0.6rem;

  background: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 10px;
  overflow: hidden;
  padding: 0.6rem;
`

const Textarea = styled.textarea<{ height: number }>`
  grid-column: 1 / 3;

  width: 100%;
  height: ${(p) => p.height}rem;
  min-height: 20vh;
  max-height: 50vh;
  margin: 0.5rem 0;
`

const Button = styled.button`
  background: #fff;
  border: 1px solid #eee;
  border-radius: 99px;

  display: flex;
  justify-content: center;
  align-items: center;
`

const QuestionUl = styled.ul`
  height: 100%;
  overflow: hidden scroll;

  > li:last-child {
    border: none;
  }
`

const QuestionLi = styled.li<{ selected: boolean }>`
  color: ${(p) => (p.selected ? ALPACA_SALON_COLOR : '#000')};
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 1rem 0;
  border-bottom: 1px solid #efefef;
`

type AnswerCreationForm = {
  contents: string
}

const description = ''

export default function EventListPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0)
  const router = useRouter()
  const { nickname } = useRecoilValue(currentUser)

  const { data } = useQuestionsQuery({ onError: toastApolloError })
  const questions = data?.questions
  const selectedQuestion = questions?.[selectedQuestionIndex]

  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm<AnswerCreationForm>({
    defaultValues: {
      contents: '',
    },
  })

  const contentsLines = watch('contents').split('\n').length * 1.6

  function openDrawer() {
    setIsDrawerOpen(true)
  }

  function createAnswer(input: AnswerCreationForm) {
    console.log('👀 - input', input)
  }

  function goToMyPage() {
    router.push(`/@${nickname}`)
  }

  function goToLoginPage() {
    router.push('/login')
  }

  return (
    <PageHead title="톡톡문답 - 알파카살롱" description={description}>
      <FlexContainer>
        <Title>알파카살롱</Title>
        {nickname ? (
          <WhiteButton onClick={goToMyPage}>마이페이지</WhiteButton>
        ) : (
          <WhiteButton onClick={goToLoginPage}>로그인</WhiteButton>
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

      <Padding>
        <H3 onClick={openDrawer}>
          Q. {selectedQuestion?.title ?? '질문이 없어요'}
          <DownArrowIcon />
        </H3>

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

        <GridForm onSubmit={handleSubmit(createAnswer)}>
          <Textarea
            height={contentsLines}
            onKeyDown={submitWhenShiftEnter}
            placeholder={selectedQuestion?.contents ?? '내용이 없어요'}
            {...register('contents', { required: '글 내용을 작성한 후 완료를 눌러주세요' })}
          />
          <Button>사진 넣기</Button>
          <Button type="submit">공유하기</Button>
        </GridForm>
      </Padding>
    </PageHead>
  )
}

EventListPage.getLayout = function getLayout(page: ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>
}
