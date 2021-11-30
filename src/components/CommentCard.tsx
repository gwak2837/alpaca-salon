import Image from 'next/image'
import React from 'react'
import { GreyH5, H5 } from 'src/pages/post/[id]'
import styled from 'styled-components'

const GridContainerComment = styled.ul`
  display: grid;
  gap: 1rem;
`

const GridContainerLi = styled.li`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 0.9rem;
  align-items: center;
`

const GridItemP = styled.p`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
`

const GridItemDiv = styled.div`
  grid-column: 2 / 3;
  grid-row: 3 / 4;
`

const GridContainerSubcomments = styled.ul`
  display: grid;
  gap: 1rem;
  padding-left: 4rem;
`

type Props2 = {
  subcomment: any
}

function SubcommentCard({ subcomment }: Props2) {
  const author = subcomment?.user
  console.log('👀 - author', author)

  return (
    <GridContainerLi>
      <Image
        src={/* author?.imageUrl ??  */ '/images/default-profile-image.webp'}
        alt="profile"
        width="40"
        height="40"
      />
      <div>
        <H5>{author?.nickname ?? 'loading'}</H5>
        <GreyH5>{new Date(subcomment?.creationTime).toLocaleTimeString()}</GreyH5>
      </div>

      <GridItemP>{subcomment.contents}</GridItemP>

      <GridItemDiv>
        <button>공감해요</button>
        <button>답글쓰기</button>
      </GridItemDiv>
    </GridContainerLi>
  )
}

type Props = {
  comment: any
}

function CommentCard({ comment }: Props) {
  const author = comment?.user

  return (
    <GridContainerComment>
      <GridContainerLi>
        <Image
          src={/* author?.imageUrl ??  */ '/images/default-profile-image.webp'}
          alt="profile"
          width="40"
          height="40"
        />
        <div>
          <H5>{author?.nickname ?? 'loading'}</H5>
          <GreyH5>{new Date(comment?.creationTime).toLocaleTimeString()}</GreyH5>
        </div>

        <GridItemP>{comment.contents}</GridItemP>

        <GridItemDiv>
          <button>공감해요</button>
          <button>답글쓰기</button>
        </GridItemDiv>
      </GridContainerLi>

      <GridContainerSubcomments>
        {comment.subcomments?.map((subcomment: any) => (
          <SubcommentCard key={subcomment.id} subcomment={subcomment} />
        ))}
      </GridContainerSubcomments>
    </GridContainerComment>
  )
}

export default CommentCard
