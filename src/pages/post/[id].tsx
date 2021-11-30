import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import { toastApolloError } from 'src/apollo/error'
import CommentCard from 'src/components/CommentCard'
import PageHead from 'src/components/PageHead'
import { useCommentsByPostQuery, usePostQuery } from 'src/graphql/generated/types-and-hooks'
import NavigationLayout from 'src/layouts/NavigationLayout'
import { ALPACA_SALON_COLOR, ALPACA_SALON_GREY_COLOR } from 'src/models/constants'
import styled from 'styled-components'

const Padding = styled.div`
  padding: 1rem 0.6rem;
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.9rem;
  align-items: center;
`

export const H5 = styled.h5`
  font-weight: 600;
  margin-bottom: 0.4rem;
`

export const GreyH5 = styled.h5`
  color: ${ALPACA_SALON_GREY_COLOR};
  font-weight: normal;
`

const H3 = styled.h3`
  font-weight: 600;
  font-size: 1.1rem;
  margin: 2rem 0 1rem;
`

const P = styled.p`
  margin: 0.75rem 0;
  min-height: 30vh;
`

const HorizontalBorder = styled.div`
  border-top: 1px solid #eee;
`

const GreyButton = styled.button`
  background: #fff;
  border: none;
  color: #888;
  padding: 1.3rem 0.8rem;

  :hover,
  :focus {
    color: ${ALPACA_SALON_COLOR};
  }

  transition: color 0.3s ease-out;
`

const GridContainerUl = styled.ul`
  display: grid;
  gap: 2rem;
  padding: 0.75rem 0.6rem;
`

const description = ''

export default function PostDetailPage() {
  const router = useRouter()
  const postId = (router.query.id ?? '') as string

  const { data, loading: postLoading } = usePostQuery({
    onError: toastApolloError,
    skip: !postId,
    variables: { id: postId },
  })

  const post = data?.post
  const author = data?.post?.user

  const { data: data2, loading: commentsLoading } = useCommentsByPostQuery({
    onError: toastApolloError,
    skip: !postId,
    variables: { postId },
  })

  const comments = data2?.commentsByPost

  return (
    <PageHead title={`${post?.title ?? '건강문답'} - 알파카살롱`} description={description}>
      <Padding>
        <GridContainer>
          <Image
            src={/* author?.imageUrl ??  */ '/images/default-profile-image.webp'}
            alt="profile"
            width="40"
            height="40"
          />
          <div>
            <H5>{author?.nickname ?? 'loading'}</H5>
            <GreyH5>{new Date(post?.creationTime).toLocaleTimeString()}</GreyH5>
          </div>
        </GridContainer>

        <H3>{post?.title}</H3>
        <P>{post?.contents}</P>
        {postLoading && <div>건강문답을 불러오는 중입니다.</div>}
      </Padding>
      <HorizontalBorder />
      <GreyButton>댓글 달기</GreyButton>
      <HorizontalBorder />

      <GridContainerUl>
        {comments?.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </GridContainerUl>
    </PageHead>
  )
}

PostDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>
}
