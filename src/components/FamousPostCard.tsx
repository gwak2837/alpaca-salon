import React from 'react'
import {
  ALPACA_SALON_COLOR,
  ALPACA_SALON_DARK_GREY_COLOR,
  ALPACA_SALON_GREY_COLOR,
} from 'src/models/constants'
import FlowerIcon from 'src/svgs/FlowerIcon'
import styled from 'styled-components'

const Li = styled.li`
  background: #fff;
  border: 1px solid #eee;
  border-radius: 0.5rem;
  padding: 0.5rem;
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

  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const GreySpan = styled.span`
  color: ${ALPACA_SALON_DARK_GREY_COLOR};
  font-size: 0.9rem;
`

const BoldGreySpan = styled(GreySpan)`
  font-weight: 600;
`

type Props = {
  famousPost: any
  index: number
}

function FamousPostCard({ famousPost, index }: Props) {
  return (
    <Li>
      <GridContainer>
        <Relative>
          <FlowerIcon highlight={index === 1} />
          <WhiteNumber>{index}</WhiteNumber>
        </Relative>
        <h4>{famousPost.title}</h4>
      </GridContainer>

      <FlexContainer>
        <GreySpan>
          {famousPost.user.nickname ?? '탈퇴한 사용자'} ·{' '}
          {new Date(famousPost.creationTime).toLocaleString()}
        </GreySpan>

        <BoldGreySpan>댓글 {famousPost.commentCount}개</BoldGreySpan>
      </FlexContainer>
    </Li>
  )
}

export default FamousPostCard
