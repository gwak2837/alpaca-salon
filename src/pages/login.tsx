import Image from 'next/image'
import { useRouter } from 'next/router'
import PageHead from 'src/components/PageHead'
import { ALPACA_SALON_BACKGROUND_COLOR, ALPACA_SALON_COLOR } from 'src/models/constants'
import styled from 'styled-components'

import KakaoIcon from '../svgs/kakao-icon.svg'

const Padding = styled.div`
  padding: 1rem;
  background: #fcfcfc;
  height: 100vh;
  max-width: 400px;
  margin: 0 auto;
`

const Text = styled.div`
  padding: 1.5rem;
  background: ${ALPACA_SALON_BACKGROUND_COLOR};
  line-height: 2rem;
`

const PrimaryColorText = styled.span`
  color: ${ALPACA_SALON_COLOR};
  font-size: 1.3rem;
  font-weight: 600;
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

const description = '알파카살롱에 로그인하세요'

export default function LoginPage() {
  const router = useRouter()

  return (
    <PageHead title="로그인 - 알파카살롱" description={description}>
      <Padding>
        <h3>
          당당하게 더 멋진 인생을 살고 싶은
          <br />
          멋쟁이 알파카님, 안녕하세요
        </h3>

        <Image src="/images/login-alpaca.png" alt="login alpaca" width="200" height="200" />

        <Text>
          알파카살롱은 <br />
          <PrimaryColorText>40대 이상 여성</PrimaryColorText> 에게만 오픈된 공간이에요.
        </Text>

        <h5>카카오톡 로그인 혹은 회원가입으로 여성임을 확인해 주세요.</h5>

        <KakaoButton
          onClick={() =>
            router.push(
              `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_BACKEND_URL}/oauth/kakao`
            )
          }
        >
          <KakaoIcon />
          카카오 로그인
        </KakaoButton>
      </Padding>
    </PageHead>
  )
}
