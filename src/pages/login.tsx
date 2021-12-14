import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import PageHead from 'src/components/PageHead'
import { ALPACA_SALON_BACKGROUND_COLOR, ALPACA_SALON_COLOR } from 'src/models/constants'
import { SquareFrame } from 'src/styles'
import styled from 'styled-components'

import KakaoIcon from '../svgs/kakao-icon.svg'
import { FlexContainerColumnEnd } from './[userNickname]'

const H5 = styled.h5`
  color: #676767;
  padding: 1.5rem 0;
  text-align: center;
`

const GridContainerTemplate = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: 1fr 3.5fr 1fr;

  > div {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    width: 100%; // for safari
    cursor: pointer;
  }
`

const KakaoButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;

  width: 100%;
  background: #fee500;
  padding: 1rem;
  margin: 0 0 2rem;
  transition: background 0.3s ease-in;
  border-radius: 10px;

  :hover {
    background: #fee500c0;
  }

  svg {
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
  }
`

export const FlexContainerGrow = styled.div`
  display: flex;
  flex-flow: column;
  height: 100%;

  > :last-child {
    flex-grow: 1;
  }
`

const FlexGrowPadding = styled(FlexContainerGrow)`
  padding: 2rem 1rem 0;
`

const PrimaryColorText = styled.span`
  color: ${ALPACA_SALON_COLOR};
  font-size: 1.3rem;
  font-weight: 500;
`

const Text = styled.div`
  background: ${ALPACA_SALON_BACKGROUND_COLOR};
  border-radius: 10px;
  line-height: 2rem;
  padding: 1.5rem;
`

const description = '알파카살롱에 로그인하세요'

export default function LoginPage() {
  const router = useRouter()

  return (
    <PageHead title="로그인 - 알파카살롱" description={description}>
      <FlexGrowPadding>
        <h4>당당하게 더 멋진 인생을 살고 싶은</h4>
        <br />
        <h2>멋쟁이 알파카님, 안녕하세요</h2>

        <GridContainerTemplate>
          <SquareFrame>
            <Image
              src="/images/login-alpaca.png"
              alt="login alpaca"
              layout="fill"
              objectFit="cover"
            />
          </SquareFrame>
        </GridContainerTemplate>

        <Text>
          알파카살롱은 <br />
          <PrimaryColorText>40대 이상 여성</PrimaryColorText> 에게만 오픈된 공간이에요.
        </Text>

        <FlexContainerColumnEnd>
          <H5>카카오 로그인으로 40대 이상 여성임을 확인해 주세요</H5>

          <KakaoButton
            onClick={() =>
              router.replace(
                `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_BACKEND_URL}/oauth/kakao`
              )
            }
          >
            <KakaoIcon />
            카카오로 3초 만에 시작하기
          </KakaoButton>
        </FlexContainerColumnEnd>
      </FlexGrowPadding>
    </PageHead>
  )
}
