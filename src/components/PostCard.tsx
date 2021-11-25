import React, { Fragment } from 'react'
import {
  ALPACA_SALON_COLOR,
  ALPACA_SALON_DARK_GREY_COLOR,
  ALPACA_SALON_GREY_COLOR,
} from 'src/models/constants'
import { FlexContainerBetween } from 'src/styles'
import styled from 'styled-components'

import { BoldGreySpan, GreySpan } from './FamousPostCard'

const Li = styled.li`
  background: #fff;
  border: 1px solid #eee;
  border-radius: 0.5rem;
  padding: 1rem 0.5rem;
`

const PrimaryH4 = styled.h5<{ disabled?: boolean }>`
  color: ${(p) => (p.disabled ? ALPACA_SALON_GREY_COLOR : ALPACA_SALON_COLOR)};
  font-weight: 600;
`

const H4 = styled.h4`
  margin: 0.75rem 0 0.5rem;
`

const OneLineP = styled.p`
  width: calc(100vw - 4rem);

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

type Props = {
  post: any
}

function PostCard({ post }: Props) {
  return (
    <Li>
      <PrimaryH4 disabled={!post.user.nickname}>{post.user.nickname ?? '탈퇴한 사용자'}</PrimaryH4>
      <H4>{post.title}</H4>

      <OneLineP>
        {(post.contents as string).split(/[\n\\n]/).map((content, i) => (
          <>
            <Fragment key={i}>{content}</Fragment>
            <br />
          </>
        ))}
      </OneLineP>

      <FlexContainerBetween>
        <GreySpan>{new Date(post.creationTime).toLocaleString()}</GreySpan>
        <BoldGreySpan>댓글 {post.commentCount}개</BoldGreySpan>
      </FlexContainerBetween>
    </Li>
  )
}

export default PostCard
