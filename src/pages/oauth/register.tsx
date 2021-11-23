import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useSetRecoilState } from 'recoil'
import { toastApolloError } from 'src/apollo/error'
import { PrimaryButton } from 'src/components/atoms/Button'
import PageHead from 'src/components/PageHead'
import { useUpdateUserMutation } from 'src/graphql/generated/types-and-hooks'
import {
  ALPACA_SALON_COLOR,
  ALPACA_SALON_GREY_COLOR,
  ALPACA_SALON_RED_COLOR,
} from 'src/models/constants'
import { currentUser } from 'src/models/recoil'
import ErrorIcon from 'src/svgs/error-icon.svg'
import styled from 'styled-components'

import { FlexContainerColumnEnd } from '../[userNickname]'

const H4 = styled.h4`
  margin: 1rem 0;
`

const FlexContainerGrow = styled.div`
  display: flex;
  flex-flow: column;
  height: 100vh;
  padding: 2rem 0.6rem 0;

  > form > :last-child {
    flex-grow: 1;
  }
`

const GridContainerForm = styled.form`
  display: grid;
  grid-template-rows: auto auto auto 1fr;
  gap: 2.5rem;

  height: 100%;
  margin: 3rem 0 0;

  > div > button {
    margin-bottom: 2rem;
  }
`

const Relative = styled.div`
  position: relative;

  svg {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }
`

const Input = styled.input<{ erred?: boolean }>`
  border: none;
  border-bottom: 2px solid ${(p) => (p.erred ? ALPACA_SALON_RED_COLOR : ALPACA_SALON_GREY_COLOR)};
  border-radius: 0;
  font-size: 1.2rem;
  font-weight: 500;
  padding: 0.5rem 0;
  width: 100%;

  :focus {
    outline: none;
  }
`

const ErrorH5 = styled.h5`
  color: ${ALPACA_SALON_RED_COLOR};
  margin-top: 5px;
`

const BigPrimaryText = styled.div`
  color: ${ALPACA_SALON_COLOR};
  font-size: 1.2rem;
  margin: 1rem;
  text-align: center;
`

const PrimaryText = styled.div`
  color: ${ALPACA_SALON_COLOR};
  margin-bottom: 3rem;
  text-align: center;
`

type RegisterFormValues = {
  nickname: string
  phoneNumber: string
  phoneNumberConfirm: string
}

const description = ''

// http://localhost:3000/oauth/register?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMGYyNjAzNi02YWQyLTQ5YjItODBjMC0xZWJjMjcwNDY0NzAiLCJpYXQiOjE2Mzc2Mjk5MjMsImV4cCI6MTYzNzg4OTEyM30.HTcTVY41HUVsECAw6OLmhSO-7PcrpLImsX2k75jSFzc&phoneNumber=%2B82+10-9203-2837
export default function OAuthRegisterPage() {
  const setCurrentUser = useSetRecoilState(currentUser)
  const router = useRouter()

  const {
    formState: { errors },
    getValues,
    handleSubmit,
    setValue,
    register,
  } = useForm<RegisterFormValues>({
    defaultValues: {
      nickname: '',
      phoneNumber: '+82 10-',
      phoneNumberConfirm: '+82 10-',
    },
  })
  console.log('👀 - errors', errors)

  const [updateUserMutation, { loading }] = useUpdateUserMutation({
    onCompleted: ({ updateUser }) => {
      if (updateUser) {
        toast.success('정보 등록에 성공했어요')

        setCurrentUser({ nickname: updateUser.nickname })

        router.replace(sessionStorage.getItem('redirectionUrlAfterLogin') ?? '/')
        sessionStorage.removeItem('redirectionUrlAfterLogin')
      }
    },
    onError: toastApolloError,
  })

  function updateRegister({ nickname, phoneNumber }: RegisterFormValues) {
    updateUserMutation({ variables: { input: { nickname, phoneNumber } } })
  }

  useEffect(() => {
    const queryString = new URLSearchParams(window.location.search.substr(1))
    setValue('phoneNumber', queryString.get('phoneNumber') ?? '+82 10-')
    window.sessionStorage.setItem('jwt', queryString.get('jwt') ?? '')
  }, [setValue])

  return (
    <PageHead title="회원 정보 입력 - 알파카살롱" description={description}>
      <FlexContainerGrow>
        <h2>알파카 살롱에 오신 걸 환영해요</h2>
        <H4>우아한 알파카님의 멋진 닉네임을 알려주세요</H4>

        <GridContainerForm onSubmit={handleSubmit(updateRegister)}>
          <div>
            <label htmlFor="nickname">닉네임</label>
            <Relative>
              <Input
                erred={Boolean(errors.nickname)}
                placeholder="세련된 알파카"
                {...register('nickname', {
                  required: '닉네임을 입력해주세요',
                  minLength: {
                    value: 2,
                    message: '2자 이상 입력해주세요',
                  },
                  maxLength: {
                    value: 10,
                    message: '10자 이내로 입력해주세요',
                  },
                  pattern: {
                    value: /^[\uAC00-\uD79D ]+$/u,
                    message: '한글과 공백만 입력해주세요',
                  },
                })}
              />
              {errors.nickname && <ErrorIcon />}
            </Relative>
            <ErrorH5>{errors.nickname?.message}</ErrorH5>
          </div>

          <div>
            <label htmlFor="phoneNumver">휴대폰 번호</label>
            <Relative>
              <Input
                erred={Boolean(errors.phoneNumber)}
                placeholder="세련된 알파카"
                type="tel"
                {...register('phoneNumber', { required: '휴대폰 번호를 입력해주세요' })}
              />
              {errors.phoneNumber && <ErrorIcon />}
            </Relative>
            <ErrorH5>{errors.phoneNumber?.message}</ErrorH5>
          </div>

          <div>
            <label htmlFor="phoneNumberConfirm">휴대폰 번호 확인</label>
            <Relative>
              <Input
                erred={Boolean(errors.phoneNumberConfirm)}
                placeholder="+82 10-1234-1234"
                type="tel"
                {...register('phoneNumberConfirm', {
                  required: '휴대폰 번호를 다시 입력해주세요',
                  validate: (value) =>
                    value === getValues('phoneNumber') || '휴대폰 번호가 일치하지 않아요',
                })}
              />
              {errors.phoneNumberConfirm && <ErrorIcon />}
            </Relative>
            <ErrorH5>{errors.phoneNumberConfirm?.message}</ErrorH5>
          </div>

          <FlexContainerColumnEnd>
            <BigPrimaryText>따뜻하고 행복하게</BigPrimaryText>
            <PrimaryText>일상을 채울 준비가 되셨나요?</PrimaryText>
            <PrimaryButton disabled={Object.keys(errors).length !== 0} type="submit">
              네, 그럼요!
            </PrimaryButton>
          </FlexContainerColumnEnd>
        </GridContainerForm>
      </FlexContainerGrow>
    </PageHead>
  )
}
