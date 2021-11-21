import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useSetRecoilState } from 'recoil'
import { toastApolloError } from 'src/apollo/error'
import PageHead from 'src/components/PageHead'
import { useUpdateUserMutation } from 'src/graphql/generated/types-and-hooks'
import { currentUser } from 'src/models/recoil'
import styled from 'styled-components'

type RegisterFormValues = {
  nickname: string
  phoneNumber: string
  uniqueName: string
}

const description = ''

export default function EventDetailPage() {
  const setCurrentUser = useSetRecoilState(currentUser)
  const router = useRouter()

  const {
    formState: { errors },
    setValue,
    handleSubmit,
    register,
  } = useForm<RegisterFormValues>({
    defaultValues: {
      nickname: '',
      phoneNumber: '+82 10-',
      uniqueName: '',
    },
  })

  const [updateUserMutation, { loading }] = useUpdateUserMutation({
    onCompleted: ({ updateUser }) => {
      if (updateUser) {
        toast.success('정보 등록에 성공했어요')

        setCurrentUser({ uniqueName: updateUser.uniqueName })

        router.replace(sessionStorage.getItem('redirectionUrlAfterLogin') ?? '/')
        sessionStorage.removeItem('redirectionUrlAfterLogin')
      }
    },
    onError: toastApolloError,
  })

  function updateRegister(input: RegisterFormValues) {
    console.log(input)
    updateUserMutation({ variables: { input } })
  }

  useEffect(() => {
    const queryString = new URLSearchParams(window.location.search.substr(1))
    setValue('phoneNumber', queryString.get('phoneNumber') ?? '+82 10-')
    window.sessionStorage.setItem('jwt', queryString.get('jwt') ?? '')
  }, [setValue])

  return (
    <PageHead title=" - 알파카살롱" description={description}>
      알파카 살롱에 오신 걸 환영해요 우아한 알파카님의 멋진 닉네임을 알려주세요
      <form onSubmit={handleSubmit(updateRegister)}>
        <label htmlFor="nickname">닉네임</label>
        <input placeholder="세련된 알파카" {...register('nickname', { required: true })} />
        <label htmlFor="phoneNumver">핸드폰 번호</label>
        <input
          placeholder="세련된 알파카"
          type="tel"
          {...register('phoneNumber', { required: true })}
        />
        <label htmlFor="uniqueName">검색용 이름</label>
        <input placeholder="세련된 알파카" {...register('uniqueName', { required: true })} />
        <div>
          당신처럼 멋진 여성분들이 기다리고 있어요! 따뜻하고 행복하게 일상을 채울 준비가 되셨나요?
        </div>
        <button>네, 그럼요!</button>
      </form>
      <Link href="/" passHref>
        <a>홈으로</a>
      </Link>
    </PageHead>
  )
}
