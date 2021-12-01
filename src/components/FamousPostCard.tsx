import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import {
  ALPACA_SALON_COLOR,
  ALPACA_SALON_DARK_GREY_COLOR,
  ALPACA_SALON_GREY_COLOR,
} from 'src/models/constants'
import { FlexContainerBetween } from 'src/styles'
import FlowerIcon from 'src/svgs/FlowerIcon'
import styled from 'styled-components'

const Li = styled.li`
  background: #fff;
  border: 1px solid #eee;
  border-radius: 0.5rem;
  padding: 0.65rem;
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  align-items: center;
`

const Relative = styled.div`
  position: relative;
  width: min-content;
`

const WhiteNumber = styled.h3`
  color: #fff;
  font-size: 1.25rem;
  font-weight: 600;

  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const HorizontalBorder = styled.div`
  border-bottom: 1px solid #f6f6f6;
  margin: 0.7rem 0 0.8rem;
`

export const GreySpan = styled.span`
  color: ${ALPACA_SALON_DARK_GREY_COLOR};
  font-size: 0.9rem;
`

export const BoldGreySpan = styled(GreySpan)`
  font-weight: 600;
  white-space: nowrap;
`

type Props = {
  famousPost: any
  index: number
}

function FamousPostCard({ famousPost, index }: Props) {
  const authorNickname = famousPost.user.nickname ?? ''
  const router = useRouter()

  function goToPostDetailPage() {
    router.push(`/post/${famousPost.id}`)
  }

  function stopPropagation(e: any) {
    e.stopPropagation()
  }

  return (
    <Li onClick={goToPostDetailPage}>
      <GridContainer>
        <Relative>
          <FlowerIcon highlight={index === 1} />
          <WhiteNumber>{index}</WhiteNumber>
        </Relative>
        <h4>{famousPost.title}</h4>
      </GridContainer>

      <HorizontalBorder />

      <FlexContainerBetween>
        <Link href={`/@${authorNickname}`} passHref>
          <a onClick={stopPropagation} role="link" tabIndex={0}>
            <GreySpan>
              {authorNickname ?? '탈퇴한 사용자'} ·{' '}
              {new Date(famousPost.creationTime).toLocaleDateString()}
            </GreySpan>
          </a>
        </Link>

        <BoldGreySpan>댓글 {famousPost.commentCount}개</BoldGreySpan>
      </FlexContainerBetween>
    </Li>
  )
}

export default FamousPostCard
