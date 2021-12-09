import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { Fragment } from 'react'
import { toast } from 'react-toastify'
import { toastApolloError } from 'src/apollo/error'
import { Comment, useToggleLikingCommentMutation } from 'src/graphql/generated/types-and-hooks'
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

  > span {
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
  cursor: pointer;
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
  subcomment: Comment
}

function SubcommentCard({ subcomment }: Props2) {
  const author = subcomment.user
  const contents = (subcomment.contents as string).split('\n')
  const router = useRouter()

  const [toggleLikingCommentMutation, { loading }] = useToggleLikingCommentMutation({
    onError: toastApolloError,
    variables: { id: subcomment.id },
  })

  function goToUserDetailPage() {
    router.push(`/@${author.nickname}`)
  }

  function toggleLikingComment() {
    if (window.sessionStorage.getItem('jwt')) {
      if (!loading) {
        toggleLikingCommentMutation()
      }
    } else {
      toast.info('로그인이 필요합니다')
      sessionStorage.setItem('redirectionUrlAfterLogin', router.asPath)
      router.push('/login')
    }
  }

  return (
    <GridContainerLi>
      <Image
        src={/* author?.imageUrl  */ '/images/default-profile-image.webp'}
        alt="profile"
        width="40"
        height="40"
        onClick={goToUserDetailPage}
      />
      <div>
        <Link href={`/@${author?.nickname}`} passHref>
          <a>
            <H5>{author.nickname}</H5>
          </a>
        </Link>
        <GreyH5>{new Date(subcomment.creationTime).toLocaleTimeString()}</GreyH5>
      </div>

      <GridItemP>
        {contents.map((content, i) => (
          <Fragment key={i}>
            <>{content}</>
            <br />
          </Fragment>
        ))}
      </GridItemP>

      <GridItemDiv>
        <LikingButton onClick={toggleLikingComment}>
          <HeartIcon selected={subcomment.isLiked} />
          공감해요
          <SelectableSpan selected={subcomment.isLiked}>{subcomment.likedCount}</SelectableSpan>
        </LikingButton>
      </GridItemDiv>
    </GridContainerLi>
  )
}

type Props = {
  comment: Comment
  setParentComment: any
  commentInputRef: any
}

function CommentCard({ comment, setParentComment, commentInputRef }: Props) {
  const author = comment.user
  const contents = (comment.contents as string).split('\n')
  const router = useRouter()

  const [toggleLikingCommentMutation, { loading }] = useToggleLikingCommentMutation({
    onError: toastApolloError,
    variables: { id: comment.id },
  })

  function goToUserDetailPage() {
    router.push(`/@${author.nickname}`)
  }

  function toggleLikingComment() {
    if (!loading) {
      toggleLikingCommentMutation()
    }
  }

  function setParentCommentInfo() {
    setParentComment({ id: comment.id, nickname: author.nickname, contents: comment.contents })
    commentInputRef.current.focus()
  }

  return (
    <GridContainerComment>
      <GridContainerLi>
        <Image
          src={/* author?.imageUrl */ '/images/default-profile-image.webp'}
          alt="profile"
          width="40"
          height="40"
          onClick={goToUserDetailPage}
        />
        <div>
          <Link href={`/@${author?.nickname}`} passHref>
            <a>
              <H5>{author.nickname}</H5>
            </a>
          </Link>
          <GreyH5>{new Date(comment.creationTime).toLocaleTimeString()}</GreyH5>
        </div>

        <GridItemP>
          {contents.map((content, i) => (
            <Fragment key={i}>
              <>{content}</>
              <br />
            </Fragment>
          ))}
        </GridItemP>

        <GridItemDiv>
          <LikingButton onClick={toggleLikingComment}>
            <HeartIcon selected={comment.isLiked} />
            공감해요
            <SelectableSpan selected={comment.isLiked}>{comment.likedCount}</SelectableSpan>
          </LikingButton>
          <SubcommentButton onClick={setParentCommentInfo}>답글쓰기</SubcommentButton>
        </GridItemDiv>
      </GridContainerLi>

      <GridContainerSubcomments>
        {comment.subcomments?.map((subcomment) => (
          <SubcommentCard key={subcomment.id} subcomment={subcomment} />
        ))}
      </GridContainerSubcomments>
    </GridContainerComment>
  )
}

export default CommentCard
