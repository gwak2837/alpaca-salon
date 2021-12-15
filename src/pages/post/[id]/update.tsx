import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'
import { toastApolloError } from 'src/apollo/error'
import PageHead from 'src/components/PageHead'
import {
  UpdatePostMutationVariables,
  usePostQuery,
  useUpdatePostMutation,
} from 'src/graphql/generated/types-and-hooks'
import useNeedToLogin from 'src/hooks/useNeedToLogin'
import { currentUser } from 'src/models/recoil'
import FileUploadIcon from 'src/svgs/file-upload.svg'
import XButtonIcon from 'src/svgs/x-button.svg'
import XIcon from 'src/svgs/x.svg'
import { isEmpty } from 'src/utils'

import {
  AbsoluteH3,
  FileInput,
  FileInputLabel,
  FixedHeader,
  GreyH3,
  GridContainer,
  Input,
  PreviewSlide,
  Slide,
  Slider,
  Textarea,
  TransparentButton,
  submitWhenShiftEnter,
} from '../create'
import { Frame16to11 } from '.'

type PostUpdateInput = {
  title: string
  contents: string
}

const description = '알파카살롱에 글을 작성해보세요'

export default function PostUpdatePage() {
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [isPostUpdateLoading, setIsPostUpdateLoading] = useState(false)
  const formData = useRef(globalThis.FormData ? new FormData() : null)
  const { nickname } = useRecoilValue(currentUser)
  const router = useRouter()
  const postId = (router.query.id ?? '') as string

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm<PostUpdateInput>({
    defaultValues: {
      title: '',
      contents: '',
    },
    reValidateMode: 'onBlur',
  })

  const contentsLines = watch('contents').split('\n').length * 1.6

  const { loading } = usePostQuery({
    onCompleted: ({ post }) => {
      if (post) {
        setValue('title', post.title)
        setValue('contents', post.contents)
        if (post.imageUrls) setImageUrls(post.imageUrls)
      }
    },
    onError: toastApolloError,
    skip: !postId || !nickname,
    variables: { id: postId },
  })

  const [updatePostMutation] = useUpdatePostMutation({
    onCompleted: ({ updatePost }) => {
      if (updatePost) {
        toast.success('글을 수정했어요')
        router.back()
      }
    },
    onError: toastApolloError,
  })

  function goBack() {
    router.back()
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

  async function updatePost(input: PostUpdateInput) {
    setIsPostUpdateLoading(true)

    const variables: UpdatePostMutationVariables = { input: { id: postId, ...input } }
    if (formData.current?.has('images')) {
      const { imageUrls } = await uploadImageFiles()
      variables.input.imageUrls = imageUrls
    }

    await updatePostMutation({ variables })
    setIsPostUpdateLoading(false)
  }

  useEffect(() => {
    if (errors.title || errors.contents) {
      toast.warn(errors.title?.message ?? errors.contents?.message)
    }
  }, [errors.contents, errors.title])

  useNeedToLogin()

  return (
    <PageHead title="글 수정하기 - 알파카살롱" description={description}>
      <form onSubmit={handleSubmit(updatePost)}>
        <FixedHeader>
          <XIcon onClick={goBack} />
          <AbsoluteH3>수정하기</AbsoluteH3>
          <TransparentButton
            disabled={loading || !isEmpty(errors) || isPostUpdateLoading}
            type="submit"
          >
            완료
          </TransparentButton>
        </FixedHeader>

        <GridContainer>
          <Input
            disabled={loading || isPostUpdateLoading}
            erred={Boolean(errors.title)}
            placeholder="안녕하세요 우아한 알파카님. 평소에 궁금했던 것을 물어보세요."
            {...register('title', { required: '글 제목을 작성한 후 완료를 눌러주세요' })}
          />
          <Textarea
            disabled={loading || isPostUpdateLoading}
            height={contentsLines}
            onKeyDown={submitWhenShiftEnter}
            placeholder="Shift+Enter키로 글을 작성할 수 있어요"
            {...register('contents', { required: '글 내용을 작성한 후 완료를 눌러주세요' })}
          />
        </GridContainer>

        <Slider>
          {imageUrls.map((file, i) => (
            <PreviewSlide key={i}>
              <Frame16to11>
                <Image src={file} alt={file} layout="fill" objectFit="cover" />
              </Frame16to11>
              <XButtonIcon onClick={() => console.log(i)} />
            </PreviewSlide>
          ))}
          <Slide flexBasis={imageUrls.length === 0 ? '100%' : '96%'}>
            <FileInputLabel htmlFor="images">
              <FileUploadIcon />
              <GreyH3>사진을 추가해주세요</GreyH3>
            </FileInputLabel>
            <FileInput
              accept="image/*"
              disabled={loading || isPostUpdateLoading}
              id="images"
              multiple
              onChange={previewImages}
              type="file"
            />
          </Slide>
        </Slider>
      </form>
    </PageHead>
  )
}
