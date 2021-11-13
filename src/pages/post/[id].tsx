import { ReactElement } from 'react'
import PageHead from 'src/components/PageHead'
import NavigationLayout from 'src/layouts/NavigationLayout'

const description = ''

export default function PostDetailPage() {
  return (
    <PageHead title=" - 알파카살롱" description={description}>
      글 상세 페이지
    </PageHead>
  )
}

PostDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>
}
