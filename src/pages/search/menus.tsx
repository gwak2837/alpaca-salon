import type { ReactElement } from 'react'
import PageHead from 'src/components/PageHead'
import SearchFormLayout from 'src/layouts/SearchFormLayout'

import { SearchResultLayout } from './all'

const description = ''

export default function MenusSearchPage() {
  return (
    <PageHead title="메뉴 검색 결과 - 알파카살롱" description={description}>
      {}
    </PageHead>
  )
}

MenusSearchPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <SearchFormLayout>
      <SearchResultLayout>{page}</SearchResultLayout>
    </SearchFormLayout>
  )
}
