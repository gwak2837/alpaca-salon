import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useSetRecoilState } from 'recoil'
import PageHead from 'src/components/PageHead'
import { currentUser } from 'src/models/recoil'

const description = ''

export default function EventDetailPage() {
  const [url, setUrl] = useState('')
  const router = useRouter()
  const setCurrentUser = useSetRecoilState(currentUser)

  useEffect(() => {
    toast.success('소셜 로그인에 성공했어요')

    const queryString = new URLSearchParams(window.location.search.substr(1))
    sessionStorage.setItem('jwt', queryString.get('jwt') ?? '')
    setCurrentUser({ nickname: queryString.get('nickname') ?? '' })

    setUrl(sessionStorage.getItem('redirectionUrlAfterLogin') ?? '/')
    sessionStorage.removeItem('redirectionUrlAfterLogin')
    sessionStorage.setItem('justLoggedIn', '1')
  }, [setCurrentUser])

  useEffect(() => {
    router.replace(url)
  }, [router, url])

  return (
    <PageHead title="소셜 로그인 - 알파카살롱" description={description}>
      <div>소셜 로그인 성공</div>
      <div>잠시만 기다려주세요...</div>
    </PageHead>
  )
}
