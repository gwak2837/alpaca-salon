import Image from 'next/image'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { toastApolloError } from 'src/apollo/error'
import PageHead from 'src/components/PageHead'
import { useCommentsByPostQuery, usePostQuery } from 'src/graphql/generated/types-and-hooks'
import NavigationLayout from 'src/layouts/NavigationLayout'

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
    <PageHead title={`${post?.title} - 알파카살롱`} description={description}>
      <div>글 상세 페이지</div>

      <Image src={author?.imageUrl ?? '/images/icon.png'} alt="profile" />
      <pre>{JSON.stringify(post, null, 2)}</pre>
      <pre>{JSON.stringify(comments, null, 2)}</pre>
    </PageHead>
  )
}

PostDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>
}
