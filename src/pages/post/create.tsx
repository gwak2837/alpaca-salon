import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { toastApolloError } from 'src/apollo/error'
import PageHead from 'src/components/PageHead'
import {
  CreatePostMutationVariables,
  useCreatePostMutation,
  usePostsQuery,
} from 'src/graphql/generated/types-and-hooks'
import {
  ALPACA_SALON_COLOR,
  ALPACA_SALON_GREY_COLOR,
  ALPACA_SALON_RED_COLOR,
  TABLET_MIN_WIDTH,
} from 'src/models/constants'
import FileUploadIcon from 'src/svgs/file-upload.svg'
import XIcon from 'src/svgs/x-icon.svg'
import { isEmpty } from 'src/utils'
import styled from 'styled-components'

import { Frame16to11 } from './[id]'

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

const Input = styled.input<{ erred?: boolean }>`
  border: none;
  border-bottom: 2px solid ${(p) => (p.erred ? ALPACA_SALON_RED_COLOR : ALPACA_SALON_COLOR)};
  border-radius: 0;
  padding: 0.5rem 0;
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

const Textarea = styled.textarea<{ height: number }>`
  width: 100%;
  height: ${(p) => p.height}rem;
  min-height: 20vh;
  max-height: 50vh;
  padding: 0.5rem 0;

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
  cursor: pointer;

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

const Slider = styled.ul`
  overflow-x: scroll;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;

  display: flex;
`

const Slide = styled.li<{ flexBasis?: string }>`
  scroll-snap-align: center;

  border: 1px solid #e2e2e2;
  border-radius: 10px;
  flex: 0 0 ${(p) => p.flexBasis ?? '100%'};
`

export function submitWhenShiftEnter(e: KeyboardEvent<HTMLTextAreaElement>) {
  if (e.code === 'Enter' && e.shiftKey) {
    e.preventDefault() // To prevent adding line break when shift+enter pressed
    const submitEvent = new Event('submit', { bubbles: true })
    const parentForm = (e.target as any).form as HTMLFormElement
    parentForm.dispatchEvent(submitEvent)
  }
}

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
    watch,
  } = useForm<PostCreationInput>({
    defaultValues: {
      title: '',
      contents: '',
    },
    reValidateMode: 'onBlur',
  })

  const contentsLines = watch('contents').split('\n').length * 1.6

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
      const newImageUrls: string[] = []
      for (const file of files) {
        if (file.type.startsWith('image/')) {
          newImageUrls.push(URL.createObjectURL(file))
          formData.current.append('images', file)
        }
      }
      setImageUrls((prev) => [...prev, ...newImageUrls])
    }
  }

  async function uploadImageFiles() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/upload`, {
      method: 'POST',
      body: formData.current,
    })
    return response.json()
  }

  async function createPost(input: PostCreationInput) {
    setPostCreationLoading(true)

    const variables: CreatePostMutationVariables = { input: { ...input } }
    if (formData.current?.has('images')) {
      const { imageUrls } = await uploadImageFiles()
      variables.input.imageUrls = imageUrls
    }

    await createPostMutation({ variables })
    setPostCreationLoading(false)
  }

  useEffect(() => {
    if (!window.sessionStorage.getItem('jwt')) {
      toast.info('로그인이 필요합니다')
      router.push('/login')
    }
  }, [router])

  useEffect(() => {
    if (errors.title || errors.contents) {
      toast.warn(errors.title?.message ?? errors.contents?.message)
    }
  }, [errors.contents, errors.title])

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
            erred={Boolean(errors.title)}
            placeholder="안녕하세요 우아한 알파카님. 평소에 궁금했던 것을 물어보세요."
            {...register('title', { required: '글 제목을 작성한 후 완료를 눌러주세요' })}
          />
          <Textarea
            disabled={postCreationLoading}
            height={contentsLines}
            onKeyDown={submitWhenShiftEnter}
            placeholder="Shift+Enter키로 글을 작성할 수 있어요"
            {...register('contents', { required: '글 내용을 작성한 후 완료를 눌러주세요' })}
          />

          <Slider>
            {imageUrls.map((file, i) => (
              <Slide key={i} flexBasis="96%">
                <Frame16to11>
                  <Image src={file} alt={file} layout="fill" objectFit="cover" />
                </Frame16to11>
              </Slide>
            ))}
            <Slide flexBasis={imageUrls.length === 0 ? '100%' : '96%'}>
              <FileInputLabel htmlFor="images">
                <FileUploadIcon />
                <GreyH3>사진을 추가해주세요</GreyH3>
              </FileInputLabel>
              <FileInput
                accept="image/*"
                id="images"
                multiple
                onChange={previewImages}
                type="file"
              />
            </Slide>
          </Slider>
        </GridContainer>
      </form>
    </PageHead>
  )
}
