import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { toastApolloError } from 'src/apollo/error'
import PageHead from 'src/components/PageHead'
import { usePostQuery } from 'src/graphql/generated/types-and-hooks'
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

  console.log('👀 - data', data)

  return (
    <PageHead title=" - 알파카살롱" description={description}>
      <div>글 상세 페이지</div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </PageHead>
  )
}

PostDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>
}
