import { ALPACA_SALON_COLOR } from 'src/models/constants'
import styled from 'styled-components'

const Li = styled.li`
  border: 1px solid ${ALPACA_SALON_COLOR};
  margin: 0 1rem;
`

type Props = {
  post: any
}

function PostCard({ post }: Props) {
  return (
    <Li>
      <div>제목: {post.title}</div>
      <div>내용:</div>
      {(post.contents as string).split(/[\n\\n]/).map((content, i) => (
        <p key={i}>{content}</p>
      ))}
      <div>작성일: {new Date(post.creationTime).toLocaleString()}</div>
      <div>글쓴이: {post.user.nickname}</div>
      <div>댓글수: {post.commentCount}</div>
    </Li>
  )
}

export default PostCard
