import { useRouter } from 'next/router'
import PageHead from 'src/components/PageHead'
import { ALPACA_SALON_COLOR, TABLET_MIN_WIDTH } from 'src/models/constants'
import XIcon from 'src/svgs/x-icon.svg'
import styled from 'styled-components'

const AbsoluteH3 = styled.h3`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  font-size: 1.1rem;
  font-weight: 600;
`

const FixedHeader = styled.header`
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100%;
  max-width: ${TABLET_MIN_WIDTH};

  display: flex;
  justify-content: space-between;
  align-items: center;

  background: #fff;
  border-bottom: 1px solid #e9e9e9;
  padding: 1rem 0.5rem;
`

const H3 = styled.h3<{ disabled?: boolean }>`
  font-size: 1.1rem;
  font-weight: 600;
  ${(p) => p.disabled && 'opacity: 0.5;'}
  cursor: ${(p) => (p.disabled ? 'not-allowed' : 'pointer')};
`

const Input = styled.input`
  border: none;
  padding: 0.5rem;
  width: 100%;
  border-bottom: 2px solid ${ALPACA_SALON_COLOR};

  :focus {
    outline: none;
  }
`

const Padding = styled.div`
  display: grid;
  gap: 1.5rem;

  padding: 4.4rem 0.5rem 2rem;
`

const Textarea = styled.textarea`
  border: none;
  width: 100%;
  height: calc(100vh - 10.6rem - 2px);
  padding: 0.5rem;

  :focus {
    outline: none;
  }
`

const XIconWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

const description = ''

export default function PostCreationPage() {
  const router = useRouter()

  function goBack() {
    router.back()
  }

  return (
    <PageHead title="글쓰기 - 알파카살롱" description={description}>
      <FixedHeader>
        <XIconWrapper onClick={goBack}>
          <XIcon />
        </XIconWrapper>
        <AbsoluteH3>글쓰기</AbsoluteH3>
        <H3>완료</H3>
      </FixedHeader>
      <Padding>
        <Input placeholder="제목" />
        <Textarea placeholder="내용을 입력해 주세요" rows={22} />
      </Padding>
    </PageHead>
  )
}
