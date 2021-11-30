import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { toastApolloError } from 'src/apollo/error'
import CommentCard from 'src/components/CommentCard'
import PageHead from 'src/components/PageHead'
import {
  Comment,
  useCommentsByPostQuery,
  useCreateCommentMutation,
  usePostQuery,
} from 'src/graphql/generated/types-and-hooks'
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

const StickyForm = styled.form`
  position: sticky;
  bottom: 0;
  width: 100%;
  background: #fff;
  /* height: 7rem; */
`

const CommentInput = styled.input`
  background: #f4f4f4;
  border: none;
  border-radius: 9999px;
  margin: 0.6rem;
  padding: 0.6rem 1.2rem;
  width: calc(100% - 1.2rem);
`

type CommentCreationForm = {
  contents: string
}

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

  const [createCommentMutation, { loading }] = useCreateCommentMutation({
    onCompleted: ({ createComment }) => {
      if (createComment) {
        toast.success('댓글을 작성했어요')
      }
    },
    onError: toastApolloError,
    refetchQueries: ['CommentsByPost', 'Posts'],
  })

  const { handleSubmit, register, reset } = useForm<CommentCreationForm>({
    defaultValues: { contents: '' },
  })

  function createComment({ contents }: CommentCreationForm) {
    createCommentMutation({ variables: { contents, postId } })
    reset()
  }

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

        {postLoading && <div>글을 불러오는 중입니다.</div>}
        <H3>{post?.title}</H3>
        <P>{post?.contents}</P>
      </Padding>

      <HorizontalBorder />
      <GreyButton>댓글 달기</GreyButton>
      <HorizontalBorder />

      <GridContainerUl>
        {commentsLoading && <div>댓글을 불러오는 중입니다.</div>}
        {comments?.map((comment) => (
          <CommentCard key={comment.id} comment={comment as Comment} />
        ))}

        <StickyForm onSubmit={handleSubmit(createComment)}>
          <CommentInput
            disabled={loading}
            placeholder="댓글을 입력해주세요"
            {...register('contents', { required: '댓글을 입력해주세요' })}
          />
        </StickyForm>
      </GridContainerUl>
    </PageHead>
  )
}
