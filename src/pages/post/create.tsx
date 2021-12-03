import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { toastApolloError } from 'src/apollo/error'
import PageHead from 'src/components/PageHead'
import { useCreatePostMutation, usePostsQuery } from 'src/graphql/generated/types-and-hooks'
import { ALPACA_SALON_COLOR, ALPACA_SALON_GREY_COLOR, TABLET_MIN_WIDTH } from 'src/models/constants'
import FileUploadIcon from 'src/svgs/file-upload.svg'
import XIcon from 'src/svgs/x-icon.svg'
import { isEmpty } from 'src/utils'
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
  height: 50vh;
  min-height: 3rem;
  padding: 0.5rem;

  :focus {
    outline: none;
  }
`

const FileInput = styled.input`
  display: none;
`

const FileInputLabel = styled.label`
  position: relative;
  aspect-ratio: 16 / 9;
  border: 1px solid #e2e2e2;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`

const GreyH3 = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${ALPACA_SALON_GREY_COLOR};
  text-align: center;
`

const XIconWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

const description = '알파카살롱에 글을 작성해보세요'

export default function PostCreationPage() {
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [postCreationLoading, setPostCreationLoading] = useState(false)
  const formData = useRef(globalThis.FormData ? new FormData() : null)
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
      pagination: { limit: 1 },
    },
  })

  const [createPostMutation] = useCreatePostMutation({
    onCompleted: ({ createPost }) => {
      if (createPost) {
        toast.success('글을 작성했어요')
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

  function previewImages(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files

    if (files && files.length > 0 && formData.current) {
      console.log(123)
      const newImageUrls = []
      for (const file of files) {
        if (file.type.startsWith('image/')) {
          newImageUrls.push(URL.createObjectURL(file))
          formData.current.append('images', file)
        }
      }
      setImageUrls(newImageUrls)
    }
  }

  async function uploadImageFiles() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/upload`, {
      method: 'POST',
      body: formData.current,
    })
    return response.json()
  }

  // 글 2번 올라가는 문제
  async function createPost(input: PostCreationInput) {
    setPostCreationLoading(true)
    const { imageUrls } = await uploadImageFiles()
    await createPostMutation({ variables: { input: { ...input, imageUrls } } })
    setPostCreationLoading(false)
  }

  useEffect(() => {
    if (!window.sessionStorage.getItem('jwt')) {
      toast.info('로그인이 필요합니다')
      router.push('/login')
    }
  }, [router])

  return (
    <PageHead title="글쓰기 - 알파카살롱" description={description}>
      <form onSubmit={handleSubmit(createPost)}>
        <FixedHeader>
          <XIconWrapper onClick={goBack}>
            <XIcon />
          </XIconWrapper>
          <AbsoluteH3 onClick={goToHomePage}>글쓰기</AbsoluteH3>
          <TransparentButton disabled={!isEmpty(errors) || postCreationLoading} type="submit">
            완료
          </TransparentButton>
        </FixedHeader>

        <GridContainer>
          <Input
            disabled={postCreationLoading}
            placeholder="제목"
            {...register('title', { required: '제목을 입력해주세요' })}
          />
          <Textarea
            disabled={postCreationLoading}
            placeholder="다른 사람들은 이 문제에 대해서 어떻게 생각하고 있을까요?"
            {...register('contents', { required: '내용을 입력해주세요' })}
          />
          <FileInputLabel htmlFor="images">
            <FileUploadIcon />
            <GreyH3>사진 또는 동영상을 추가하세요</GreyH3>
          </FileInputLabel>
          <FileInput accept="image/*" multiple id="images" onChange={previewImages} type="file" />
        </GridContainer>
      </form>

      {imageUrls.map((file, i) => (
        <img key={i} src={file} alt={file} width="300" height="300" />
      ))}
    </PageHead>
  )
}
