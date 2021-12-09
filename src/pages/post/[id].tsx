import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { Fragment, KeyboardEvent, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { toastApolloError } from 'src/apollo/error'
import CommentCard from 'src/components/CommentCard'
import PageHead from 'src/components/PageHead'
import {
  Comment,
  CreateCommentMutationVariables,
  useCommentsByPostQuery,
  useCreateCommentMutation,
  usePostQuery,
} from 'src/graphql/generated/types-and-hooks'
import useNeedToLogin from 'src/hooks/useNeedToLogin'
import { ALPACA_SALON_COLOR, ALPACA_SALON_GREY_COLOR } from 'src/models/constants'
import BackIcon from 'src/svgs/back-icon.svg'
import GreyWriteIcon from 'src/svgs/grey-write-icon.svg'
import Submit from 'src/svgs/submit.svg'
import XIcon from 'src/svgs/x.svg'
import styled, { css } from 'styled-components'

import { submitWhenShiftEnter } from './create'

const Padding = styled.div`
  padding: 1rem 0.6rem;
`

const FlexContainerBetweenCenter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding-bottom: 1rem;
`

const Width = styled.div`
  width: 1.5rem;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
`

const ModificationButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
  padding: 0.5rem 0.75rem;

  background: #fff;
  border: 1px solid #eee;
  border-radius: 5px;
  color: ${ALPACA_SALON_GREY_COLOR};

  :hover,
  :focus,
  :active {
    border-color: ${ALPACA_SALON_COLOR};
    color: ${ALPACA_SALON_COLOR};

    > svg > path {
      fill: ${ALPACA_SALON_COLOR};
    }
  }

  > svg > path {
    transition: fill 0.3s ease-out;
  }

  transition: border-color 0.3s ease-out, color 0.3s ease-out;
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.9rem;
  align-items: center;

  > span {
    cursor: pointer;
  }
`

export const H5 = styled.h5`
  font-weight: 600;
  margin-bottom: 0.4rem;
  cursor: pointer;
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
  line-height: 1.6rem;
  margin: 1rem 0;
`

export const Frame16to11 = styled.div`
  position: relative;
  aspect-ratio: 16 / 11;
  border-radius: 10px;
  overflow: hidden;
`

const Frame16to11DefaultImage = styled(Frame16to11)`
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url('/images/default-image.webp');
`

const HorizontalBorder = styled.div`
  border-top: 1px solid #eee;
`

const GreyButton = styled.button`
  background: #fff;
  border: none;
  color: #888;
  padding: 1.3rem 0.8rem;
  text-align: left;

  :hover,
  :focus {
    color: ${ALPACA_SALON_COLOR};
  }

  transition: color 0.3s ease-out;
`

const GridUl = styled.ul`
  display: grid;
  gap: 2rem;

  padding: 0.75rem 0.6rem;
`

const StickyForm = styled.form`
  position: sticky;
  bottom: 0;

  background: #fff;
  border-top: 1px solid #f3f3f3;
  width: 100%;
`

const FlexBetween = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
`

const FlexColumnGrow = styled.div`
  display: flex;
  flex-flow: column;
  height: 100%;

  > :last-child {
    flex-grow: 1;
  }
`

const CommentTextarea = styled.textarea`
  width: calc(100% - 1.2rem);
  height: 2.8rem;
  min-height: 2.8rem;
  max-height: 6rem;
  margin: 0.6rem;
  padding: 0.6rem 2.6rem 0.6rem 1.2rem;

  background: #f4f4f4;
  border: none;
  border-radius: 1.25rem;
  resize: none;
`

const fillGrey = css`
  > svg > rect {
    fill: ${ALPACA_SALON_GREY_COLOR};
  }
`

const CommentSubmitButton = styled.button`
  position: absolute;
  bottom: 0.8rem;
  right: 0.5rem;

  width: 3rem;
  height: 3rem;
  padding: 0.5rem;

  background: none;
  border: none;
  cursor: pointer;

  ${(p) => p.disabled && fillGrey}
`

const GreyDiv = styled.div`
  line-height: 19px;
  color: ${ALPACA_SALON_GREY_COLOR};
  text-align: center;
  margin: 5rem auto;
`

const Relative = styled.div`
  position: relative;

  color: #787878;
  padding: 0.6rem;

  > svg {
    position: absolute;
    top: 0;
    right: 0;
    width: 2.2rem;
    padding: 0.6rem;
  }
`

const H4 = styled.h4`
  color: #787878;
  font-weight: 600;
  margin: 0 0 0.3rem;
`

const PrimarySpan = styled.span`
  color: ${ALPACA_SALON_COLOR};
`

const EllipsisText = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;

  width: 100%;
  height: 1.2rem;
  white-space: nowrap;
`

type CommentCreationForm = {
  contents: string
}

type ParentComment = {
  id: string
  nickname: string
  contents: string
}

const description = ''

export default function PostDetailPage() {
  const [parentComment, setParentComment] = useState<ParentComment>()
  const commentTextareaRef = useRef<HTMLTextAreaElement>()
  const router = useRouter()
  const postId = (router.query.id ?? '') as string

  const { data, loading: postLoading } = usePostQuery({
    onError: toastApolloError,
    skip: !postId,
    variables: { id: postId },
  })

  const post = data?.post
  const commentCount = post?.commentCount
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
        setParentComment(undefined)
        if (commentTextareaRef.current) commentTextareaRef.current.style.height = '2.8rem'
      }
    },
    onError: toastApolloError,
    refetchQueries: ['CommentsByPost', 'Posts'],
  })

  const { handleSubmit, register, reset, watch } = useForm<CommentCreationForm>({
    defaultValues: { contents: '' },
  })
  const contentsLineCount = watch('contents').split('\n').length
  const { ref, ...registerCommentCreationForm } = register('contents', {
    required: '댓글을 입력해주세요',
  })

  function createComment({ contents }: CommentCreationForm) {
    const variables: CreateCommentMutationVariables = { contents, postId }
    if (parentComment) variables.commentId = parentComment.id

    createCommentMutation({ variables })
    reset()
  }

  function goBack() {
    router.back()
  }

  function resetParentComment() {
    setParentComment(undefined)
  }

  function goToUserDetailPage() {
    router.push(`/@${author?.nickname}`)
  }

  function writeComment() {
    setParentComment(undefined)
    commentTextareaRef.current?.focus()
  }

  function resizeTextareaHeight(e: KeyboardEvent<HTMLTextAreaElement>) {
    const eventTarget = e.target as HTMLTextAreaElement
    eventTarget.style.height = ''
    eventTarget.style.height = `${eventTarget.scrollHeight}px`
  }

  function registerTextareaRef(textarea: HTMLTextAreaElement) {
    ref(textarea)
    commentTextareaRef.current = textarea
  }

  useNeedToLogin()

  return (
    <PageHead title={`${post?.title ?? '건강문답'} - 알파카살롱`} description={description}>
      <FlexColumnGrow>
        <Padding>
          <FlexContainerBetweenCenter>
            <Width onClick={goBack}>
              <BackIcon />
            </Width>
            <ModificationButton>
              <GreyWriteIcon />
              수정하기
            </ModificationButton>
          </FlexContainerBetweenCenter>

          <GridContainer>
            <Image
              src={/* author?.imageUrl ??  */ '/images/default-profile-image.webp'}
              alt="profile"
              width="40"
              height="40"
              onClick={goToUserDetailPage}
            />
            <div>
              <Link href={`/@${author?.nickname}`} passHref>
                <a>
                  <H5>{author?.nickname ?? 'loading'}</H5>
                </a>
              </Link>
              <GreyH5>{new Date(post?.creationTime).toLocaleTimeString()}</GreyH5>
            </div>
          </GridContainer>

          {postLoading || !post ? (
            <>
              <div>글을 불러오는 중입니다</div>
              <Frame16to11 />
            </>
          ) : (
            <>
              <H3>{post.title}</H3>
              <P>
                {(post.contents as string).split(/\n/).map((content, i) => (
                  <Fragment key={i}>
                    <>{content}</>
                    <br />
                  </Fragment>
                ))}
              </P>
              {post.imageUrls?.map((imageUrl, i) => (
                <Frame16to11DefaultImage key={i}>
                  <Image src={imageUrl} alt="post image" layout="fill" objectFit="cover" />
                </Frame16to11DefaultImage>
              ))}
            </>
          )}
        </Padding>

        <HorizontalBorder />
        <GreyButton onClick={writeComment}>
          댓글 {commentCount ? `${commentCount}개` : '달기'}
        </GreyButton>
        <HorizontalBorder />

        <FlexBetween>
          <GridUl>
            {commentsLoading && <div>댓글을 불러오는 중입니다.</div>}
            {comments
              ? comments.map((comment) => (
                  <CommentCard
                    key={comment.id}
                    comment={comment as Comment}
                    setParentComment={setParentComment}
                    commentInputRef={commentTextareaRef}
                  />
                ))
              : !commentsLoading && <GreyDiv>첫 번째로 댓글을 달아보세요</GreyDiv>}
          </GridUl>

          <StickyForm onSubmit={handleSubmit(createComment)}>
            {parentComment && (
              <Relative>
                <H4>
                  <PrimarySpan>{parentComment.nickname}</PrimarySpan>님에게 답글 다는 중
                </H4>
                <EllipsisText>{parentComment.contents}</EllipsisText>
                <XIcon onClick={resetParentComment} />
              </Relative>
            )}

            <CommentTextarea
              disabled={loading}
              onKeyDown={submitWhenShiftEnter}
              onKeyUp={resizeTextareaHeight}
              placeholder={
                parentComment ? 'Shift+Enter로 답글 작성하기' : 'Shift+Enter로 댓글 작성하기'
              }
              ref={registerTextareaRef}
              {...registerCommentCreationForm}
            />
            {contentsLineCount > 0 && (
              <CommentSubmitButton disabled={loading} type="submit">
                <Submit />
              </CommentSubmitButton>
            )}
          </StickyForm>
        </FlexBetween>
      </FlexColumnGrow>
    </PageHead>
  )
}
