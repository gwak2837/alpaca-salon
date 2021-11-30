import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { ALPACA_SALON_BACKGROUND_COLOR, ALPACA_SALON_COLOR } from 'src/models/constants'
import { GreyH5, H5 } from 'src/pages/post/[id]'
import HeartIcon from 'src/svgs/HeartIcon'
import styled, { css } from 'styled-components'

const GridContainerComment = styled.ul`
  display: grid;
  gap: 1rem;
`

const GridContainerLi = styled.li`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 0.9rem;
  align-items: center;

  > span,
  div:nth-child(2) {
    cursor: pointer;
  }
`

const GridItemP = styled.p`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
`

const GridItemDiv = styled.div`
  grid-column: 2 / 3;
  grid-row: 3 / 4;

  display: flex;
  gap: 0.7rem;
`

const GridContainerSubcomments = styled.ul`
  display: grid;
  gap: 1rem;
  padding-left: 4rem;
`

const ButtonCSS = css`
  border: none;
  border-radius: 9999px;
  font-size: 0.75rem;
  padding: 0.4rem 0.75rem;
`

const LikingButton = styled.button`
  ${ButtonCSS}
  background: ${ALPACA_SALON_BACKGROUND_COLOR};

  display: flex;
  align-items: center;
  gap: 0.4rem;

  > svg {
    width: 0.8rem;
  }
`

const SubcommentButton = styled.button`
  ${ButtonCSS}
  background: #F4F4F4;
`

const SelectableSpan = styled.span<{ selected: boolean }>`
  color: ${(p) => (p.selected ? ALPACA_SALON_COLOR : '#626262')};
  font-weight: 600;
`

type Props2 = {
  subcomment: any
}

function SubcommentCard({ subcomment }: Props2) {
  const author = subcomment?.user
  const router = useRouter()

  function goToUserDetailPage() {
    router.push(`/@${author?.nickname}`)
  }

  return (
    <GridContainerLi>
      <Image
        src={/* author?.imageUrl ??  */ '/images/default-profile-image.webp'}
        alt="profile"
        width="40"
        height="40"
        onClick={goToUserDetailPage}
      />
      <div onClick={goToUserDetailPage} role="button" tabIndex={0}>
        <H5>{author?.nickname ?? 'loading'}</H5>
        <GreyH5>{new Date(subcomment?.creationTime).toLocaleTimeString()}</GreyH5>
      </div>

      <GridItemP>{subcomment.contents}</GridItemP>

      <GridItemDiv>
        <LikingButton>
          <HeartIcon selected={subcomment.isLiked} />
          공감해요
          <SelectableSpan selected={subcomment.isLiked}>{subcomment.likedCount}</SelectableSpan>
        </LikingButton>
      </GridItemDiv>
    </GridContainerLi>
  )
}

type Props = {
  comment: any
}

function CommentCard({ comment }: Props) {
  const author = comment?.user
  const router = useRouter()

  function goToUserDetailPage() {
    router.push(`/@${author?.nickname}`)
  }

  return (
    <GridContainerComment>
      <GridContainerLi>
        <Image
          src={/* author?.imageUrl ??  */ '/images/default-profile-image.webp'}
          alt="profile"
          width="40"
          height="40"
          onClick={goToUserDetailPage}
        />
        <div onClick={goToUserDetailPage} role="button" tabIndex={0}>
          <H5>{author?.nickname ?? 'loading'}</H5>
          <GreyH5>{new Date(comment?.creationTime).toLocaleTimeString()}</GreyH5>
        </div>

        <GridItemP>{comment.contents}</GridItemP>

        <GridItemDiv>
          <LikingButton>
            <HeartIcon selected={comment.isLiked} />
            공감해요
            <SelectableSpan selected={comment.isLiked}>{comment.likedCount}</SelectableSpan>
          </LikingButton>
          <SubcommentButton>답글쓰기</SubcommentButton>
        </GridItemDiv>
      </GridContainerLi>

      <GridContainerSubcomments>
        {comment.subcomments?.map((subcomment: any) => (
          <SubcommentCard key={subcomment.id} subcomment={subcomment} />
        ))}
      </GridContainerSubcomments>
    </GridContainerComment>
  )
}

export default CommentCard
