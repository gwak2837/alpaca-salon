import { ReactElement } from 'react'
import PageHead from 'src/components/PageHead'
import NavigationLayout from 'src/layouts/NavigationLayout'

const description = ''

export default function EventListPage() {
  return (
    <PageHead title=" - 알파카살롱" description={description}>
      생생 수다 목록 페이지
    </PageHead>
  )
}

EventListPage.getLayout = function getLayout(page: ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>
}
