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
    toast.success('로그인에 성공했어요')

    const queryString = new URLSearchParams(window.location.search.substr(1))
    sessionStorage.setItem('jwt', queryString.get('jwt') ?? '')
    setCurrentUser({ uniqueName: queryString.get('uniqueName') ?? '' })

    setUrl(sessionStorage.getItem('redirectionUrlAfterLogin') ?? '/')
    sessionStorage.removeItem('redirectionUrlAfterLogin')
  }, [setCurrentUser])

  useEffect(() => {
    router.replace(url)
  }, [router, url])

  return (
    <PageHead title=" - 알파카살롱" description={description}>
      소셜 로그인 성공. 잠시만 기다려주세요
    </PageHead>
  )
}
