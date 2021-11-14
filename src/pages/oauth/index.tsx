import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import PageHead from 'src/components/PageHead'
import styled from 'styled-components'

const description = ''


export default function EventDetailPage() {
  const [userInfo, setUserInfo] = useState('')

  useEffect(() => {
    setUserInfo(decodeURIComponent(window.location.search.substr(1)))
  }, [])

  return (
    <PageHead title=" - 알파카살롱" description={description}>
      소셜 로그인 성공
      <pre>{userInfo}</pre>
      <Link href="/" passHref>
        <a>홈으로</a>
      </Link>
    </PageHead>
  )
}
