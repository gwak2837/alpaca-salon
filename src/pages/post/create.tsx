import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { toastApolloError } from 'src/apollo/error'
import PageHead from 'src/components/PageHead'
import { useCreatePostMutation, usePostsQuery } from 'src/graphql/generated/types-and-hooks'
import { ALPACA_SALON_COLOR, TABLET_MIN_WIDTH } from 'src/models/constants'
import XIcon from 'src/svgs/x-icon.svg'
import styled from 'styled-components'

type PostCreationInput = {
  title: string
  contents: string
}

const AbsoluteH3 = styled.h3`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  cursor: pointer;
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
  border-bottom: 1px solid #e0e0e0;
  padding: 1rem;
`

const TransparentButton = styled.button<{ disabled?: boolean }>`
  border: none;
  background: none;
  font-size: 1.1rem;
  font-weight: 600;
  ${(p) => p.disabled && 'opacity: 0.5;'}
  cursor: ${(p) => (p.disabled ? 'not-allowed' : 'pointer')};
  padding: 0;
`

const Input = styled.input`
  border: none;
  border-bottom: 2px solid ${ALPACA_SALON_COLOR};
  border-radius: 0;
  padding: 0.5rem;
  width: 100%;

  :focus {
    outline: none;
  }
`

const GridContainer = styled.div`
  display: grid;
  gap: 1.5rem;

  padding: 4.4rem 0.5rem 2rem;
`

const Textarea = styled.textarea`
  border: none;
  width: 100%;
  height: calc(100vh - 10.6rem - 2px);
  min-height: 3rem;
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

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<PostCreationInput>({
    defaultValues: {
      title: '',
      contents: '',
    },
  })

  // https://github.com/apollographql/apollo-client/issues/5419#issuecomment-973154976 해결되면 삭제하기
  usePostsQuery({
    onError: toastApolloError,
    variables: {
      pagination: { limit: 2 },
    },
  })

  const [createPostMutation, { loading }] = useCreatePostMutation({
    onCompleted: ({ createPost }) => {
      if (createPost) {
        router.push('/')
      }
    },
    onError: toastApolloError,
    refetchQueries: ['Posts'],
  })

  function goBack() {
    router.back()
  }

  function goToHomePage() {
    router.push('/')
  }

  function createPost(input: PostCreationInput) {
    if (!loading) {
      toast.info(JSON.stringify(input))
      createPostMutation({ variables: { input } })
    }
  }

  return (
    <PageHead title="글쓰기 - 알파카살롱" description={description}>
      <form onSubmit={handleSubmit(createPost)}>
        <FixedHeader>
          <XIconWrapper onClick={goBack}>
            <XIcon />
          </XIconWrapper>
          <AbsoluteH3 onClick={goToHomePage}>글쓰기</AbsoluteH3>
          <TransparentButton type="submit">완료</TransparentButton>
        </FixedHeader>

        <GridContainer>
          <Input disabled={loading} placeholder="제목" {...register('title', { required: true })} />
          <Textarea
            disabled={loading}
            placeholder="내용을 입력해 주세요"
            {...register('contents', { required: true })}
          />
        </GridContainer>
      </form>
    </PageHead>
  )
}
