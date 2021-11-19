import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { useRecoilValue } from 'recoil'
import PageHead from 'src/components/PageHead'
import NavigationLayout from 'src/layouts/NavigationLayout'
import { currentUser } from 'src/models/recoil'
import { getUserUniqueName } from 'src/utils'

const description = ''

export default function UserPage() {
  const { uniqueName } = useRecoilValue(currentUser)

  return (
    <PageHead title=" - 알파카살롱" description={description}>
      <div>
        <Link href="/">홈으로</Link>
      </div>

      <div>사용자 페이지</div>
      <div>사용자 아이디: {uniqueName}</div>
      <button>로그아웃</button>
      <button>회원탈퇴</button>
    </PageHead>
  )
}

UserPage.getLayout = function getLayout(page: ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>
}
