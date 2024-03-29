/* eslint-disable */
import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
const defaultOptions = {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
  EmailAddress: any
  /** A field whose value is a JSON Web Token (JWT): https://jwt.io/introduction. */
  JWT: any
  /** Last value of pagination */
  LastValue: any
  /** A field whose value is a valid decimal degrees latitude number (53.471): https://en.wikipedia.org/wiki/Latitude */
  Latitude: any
  /** A field whose value is a valid decimal degrees longitude number (53.471): https://en.wikipedia.org/wiki/Longitude */
  Longitude: any
  /** A string that cannot be passed as an empty value */
  NonEmptyString: any
  /** Integers that will have a value of 0 or more. */
  NonNegativeInt: any
  /** Integers that will have a value greater than 0. */
  PositiveInt: any
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: any
  /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
  UUID: any
}

export type Comment = {
  __typename?: 'Comment'
  contents?: Maybe<Scalars['NonEmptyString']>
  creationTime?: Maybe<Scalars['DateTime']>
  id: Scalars['ID']
  imageUrls?: Maybe<Array<Scalars['URL']>>
  isLiked: Scalars['Boolean']
  isModified: Scalars['Boolean']
  likedCount: Scalars['NonNegativeInt']
  modificationTime?: Maybe<Scalars['DateTime']>
  /** 이 댓글의 상위 댓글 */
  parentComment?: Maybe<Comment>
  /** 이 댓글이 달린 피드 */
  post?: Maybe<Post>
  /** 대댓글 */
  subcomments?: Maybe<Array<Comment>>
  /** 댓글을 작성한 사용자 */
  user?: Maybe<User>
}

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
  Other = 'OTHER',
  Unknown = 'UNKNOWN',
}

export type Mutation = {
  __typename?: 'Mutation'
  createComment?: Maybe<Comment>
  createPost?: Maybe<Post>
  deleteComment?: Maybe<Comment>
  deletePost?: Maybe<Post>
  /** JWT 인증 토큰과 같이 요청하면 로그아웃 성공 여부를 반환함 */
  logout: Scalars['Boolean']
  toggleLikingComment?: Maybe<Comment>
  /** 회원탈퇴 시 사용자 정보가 모두 초기화됩 */
  unregister?: Maybe<User>
  updateComment?: Maybe<Comment>
  updatePost?: Maybe<Post>
  updateUser?: Maybe<User>
}

export type MutationCreateCommentArgs = {
  commentId?: InputMaybe<Scalars['ID']>
  contents: Scalars['NonEmptyString']
  postId: Scalars['ID']
}

export type MutationCreatePostArgs = {
  input: PostCreationInput
}

export type MutationDeleteCommentArgs = {
  id: Scalars['ID']
}

export type MutationDeletePostArgs = {
  id: Scalars['ID']
}

export type MutationToggleLikingCommentArgs = {
  id: Scalars['ID']
}

export type MutationUpdateCommentArgs = {
  contents: Scalars['NonEmptyString']
  id: Scalars['ID']
}

export type MutationUpdatePostArgs = {
  input: PostModificationInput
}

export type MutationUpdateUserArgs = {
  input: UserModificationInput
}

/** 기본값: 내림차순 */
export enum OrderDirection {
  Asc = 'ASC',
}

export type Pagination = {
  lastId?: InputMaybe<Scalars['ID']>
  lastValue?: InputMaybe<Scalars['LastValue']>
  limit: Scalars['PositiveInt']
}

export type Post = {
  __typename?: 'Post'
  category: PostCategory
  commentCount: Scalars['NonNegativeInt']
  contents: Scalars['NonEmptyString']
  creationTime: Scalars['DateTime']
  /** 피드에 달린 해시태그 */
  hashtags?: Maybe<Array<Scalars['NonEmptyString']>>
  id: Scalars['ID']
  imageUrls?: Maybe<Array<Scalars['URL']>>
  /** 피드 좋아요 여부 (로그인 필요) */
  isLiked: Scalars['Boolean']
  modificationTime: Scalars['DateTime']
  title: Scalars['NonEmptyString']
  /** 글쓴이 */
  user?: Maybe<User>
}

export enum PostCategory {
  FreeTopic = 'FREE_TOPIC',
  Menopause = 'MENOPAUSE',
  Undefined = 'UNDEFINED',
}

export type PostCreationInput = {
  category?: InputMaybe<PostCategory>
  contents: Scalars['String']
  imageUrls?: InputMaybe<Array<Scalars['URL']>>
  title: Scalars['String']
}

export type PostModificationInput = {
  category?: InputMaybe<PostCategory>
  contents?: InputMaybe<Scalars['String']>
  id: Scalars['ID']
  imageUrls?: InputMaybe<Array<Scalars['URL']>>
  title?: InputMaybe<Scalars['String']>
}

/** OAuth 공급자 */
export enum Provider {
  AlpacaSalon = 'ALPACA_SALON',
  Kakao = 'KAKAO',
}

export type Query = {
  __typename?: 'Query'
  /** 특정 게시글에 달린 댓글 */
  commentsByPost?: Maybe<Array<Comment>>
  /** 이번 달 핫한 이야기 */
  famousPosts?: Maybe<Array<Post>>
  /** 사용자 닉네임 중복 여부 검사 */
  isNicknameUnique: Scalars['Boolean']
  /** 좋아요 누른 댓글 */
  likedComments?: Maybe<Array<Comment>>
  /** 현재 로그인된(JWT) 사용자 정보를 반환 */
  me?: Maybe<User>
  /** 내가 쓴 댓글 */
  myComments?: Maybe<Array<Comment>>
  /** 글 상세 */
  post?: Maybe<Post>
  /** 글 목록 */
  posts?: Maybe<Array<Post>>
  /** 질문 목록 */
  questions?: Maybe<Array<Question>>
  /** 글 검색 */
  searchPosts?: Maybe<Array<Post>>
  /** 닉네임으로 사용자 검색 */
  userByNickname?: Maybe<User>
}

export type QueryCommentsByPostArgs = {
  postId: Scalars['ID']
}

export type QueryIsNicknameUniqueArgs = {
  nickname: Scalars['NonEmptyString']
}

export type QueryPostArgs = {
  id: Scalars['ID']
}

export type QueryPostsArgs = {
  pagination: Pagination
}

export type QuerySearchPostsArgs = {
  keywords: Array<Scalars['NonEmptyString']>
}

export type QueryUserByNicknameArgs = {
  nickname: Scalars['NonEmptyString']
}

export type Question = {
  __typename?: 'Question'
  contents: Scalars['NonEmptyString']
  creationTime: Scalars['DateTime']
  id: Scalars['ID']
  title: Scalars['NonEmptyString']
}

export type User = {
  __typename?: 'User'
  bio?: Maybe<Scalars['NonEmptyString']>
  birthday?: Maybe<Scalars['NonEmptyString']>
  birthyear?: Maybe<Scalars['Int']>
  creationTime: Scalars['DateTime']
  email?: Maybe<Scalars['EmailAddress']>
  gender?: Maybe<Gender>
  id: Scalars['UUID']
  imageUrl?: Maybe<Scalars['URL']>
  likedCount: Scalars['Int']
  modificationTime: Scalars['DateTime']
  nickname?: Maybe<Scalars['NonEmptyString']>
  phoneNumber?: Maybe<Scalars['NonEmptyString']>
  providers: Array<Provider>
}

export type UserModificationInput = {
  ageRange?: InputMaybe<Scalars['NonEmptyString']>
  bio?: InputMaybe<Scalars['String']>
  birthday?: InputMaybe<Scalars['NonEmptyString']>
  email?: InputMaybe<Scalars['EmailAddress']>
  gender?: InputMaybe<Gender>
  imageUrl?: InputMaybe<Scalars['URL']>
  nickname?: InputMaybe<Scalars['NonEmptyString']>
  phoneNumber?: InputMaybe<Scalars['NonEmptyString']>
}

export type PostCardFragment = {
  __typename?: 'Post'
  id: string
  creationTime: any
  modificationTime: any
  title: any
  contents: any
  category: PostCategory
  user?: { __typename?: 'User'; id: any; nickname?: any | null | undefined } | null | undefined
}

export type CreateCommentMutationVariables = Exact<{
  postId: Scalars['ID']
  contents: Scalars['NonEmptyString']
  commentId?: InputMaybe<Scalars['ID']>
}>

export type CreateCommentMutation = {
  __typename?: 'Mutation'
  createComment?: { __typename?: 'Comment'; id: string } | null | undefined
}

export type CreatePostMutationVariables = Exact<{
  input: PostCreationInput
}>

export type CreatePostMutation = {
  __typename?: 'Mutation'
  createPost?: { __typename?: 'Post'; id: string } | null | undefined
}

export type DeleteCommentMutationVariables = Exact<{
  id: Scalars['ID']
}>

export type DeleteCommentMutation = {
  __typename?: 'Mutation'
  deleteComment?: { __typename?: 'Comment'; id: string } | null | undefined
}

export type LogoutMutationVariables = Exact<{ [key: string]: never }>

export type LogoutMutation = { __typename?: 'Mutation'; logout: boolean }

export type ToggleLikingCommentMutationVariables = Exact<{
  id: Scalars['ID']
}>

export type ToggleLikingCommentMutation = {
  __typename?: 'Mutation'
  toggleLikingComment?:
    | { __typename?: 'Comment'; id: string; isLiked: boolean; likedCount: any }
    | null
    | undefined
}

export type UnregisterMutationVariables = Exact<{ [key: string]: never }>

export type UnregisterMutation = {
  __typename?: 'Mutation'
  unregister?: { __typename?: 'User'; id: any } | null | undefined
}

export type UpdatePostMutationVariables = Exact<{
  input: PostModificationInput
}>

export type UpdatePostMutation = {
  __typename?: 'Mutation'
  updatePost?:
    | {
        __typename?: 'Post'
        id: string
        category: PostCategory
        title: any
        contents: any
        imageUrl?: any | null | undefined
      }
    | null
    | undefined
}

export type UpdateUserMutationVariables = Exact<{
  input: UserModificationInput
}>

export type UpdateUserMutation = {
  __typename?: 'Mutation'
  updateUser?:
    | { __typename?: 'User'; id: any; nickname?: any | null | undefined }
    | null
    | undefined
}

export type CommentsByPostQueryVariables = Exact<{
  postId: Scalars['ID']
}>

export type CommentsByPostQuery = {
  __typename?: 'Query'
  commentsByPost?:
    | Array<{
        __typename?: 'Comment'
        id: string
        creationTime?: any | null | undefined
        contents?: any | null | undefined
        isLiked: boolean
        isModified: boolean
        likedCount: any
        user?:
          | {
              __typename?: 'User'
              id: any
              nickname?: any | null | undefined
              imageUrl?: any | null | undefined
            }
          | null
          | undefined
        subcomments?:
          | Array<{
              __typename?: 'Comment'
              id: string
              creationTime?: any | null | undefined
              contents?: any | null | undefined
              isLiked: boolean
              isModified: boolean
              likedCount: any
              user?:
                | {
                    __typename?: 'User'
                    id: any
                    nickname?: any | null | undefined
                    imageUrl?: any | null | undefined
                  }
                | null
                | undefined
            }>
          | null
          | undefined
      }>
    | null
    | undefined
}

export type FamousPostsQueryVariables = Exact<{ [key: string]: never }>

export type FamousPostsQuery = {
  __typename?: 'Query'
  famousPosts?:
    | Array<{
        __typename?: 'Post'
        id: string
        creationTime: any
        title: any
        contents: any
        category: PostCategory
        commentCount: any
        user?:
          | { __typename?: 'User'; id: any; nickname?: any | null | undefined }
          | null
          | undefined
      }>
    | null
    | undefined
}

export type IsNicknameUniqueQueryVariables = Exact<{
  nickname: Scalars['NonEmptyString']
}>

export type IsNicknameUniqueQuery = { __typename?: 'Query'; isNicknameUnique: boolean }

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = {
  __typename?: 'Query'
  me?: { __typename?: 'User'; id: any; nickname?: any | null | undefined } | null | undefined
}

export type PostQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type PostQuery = {
  __typename?: 'Query'
  post?:
    | {
        __typename?: 'Post'
        id: string
        creationTime: any
        title: any
        contents: any
        imageUrls?: Array<any> | null | undefined
        commentCount: any
        user?:
          | {
              __typename?: 'User'
              id: any
              nickname?: any | null | undefined
              imageUrl?: any | null | undefined
            }
          | null
          | undefined
      }
    | null
    | undefined
}

export type PostsQueryVariables = Exact<{
  pagination: Pagination
}>

export type PostsQuery = {
  __typename?: 'Query'
  posts?:
    | Array<{
        __typename?: 'Post'
        id: string
        creationTime: any
        title: any
        contents: any
        category: PostCategory
        commentCount: any
        user?:
          | { __typename?: 'User'; id: any; nickname?: any | null | undefined }
          | null
          | undefined
      }>
    | null
    | undefined
}

export type QuestionsQueryVariables = Exact<{ [key: string]: never }>

export type QuestionsQuery = {
  __typename?: 'Query'
  questions?:
    | Array<{ __typename?: 'Question'; id: string; title: any; contents: any }>
    | null
    | undefined
}

export type UserByNicknameQueryVariables = Exact<{
  nickname: Scalars['NonEmptyString']
}>

export type UserByNicknameQuery = {
  __typename?: 'Query'
  userByNickname?:
    | {
        __typename?: 'User'
        id: any
        nickname?: any | null | undefined
        imageUrl?: any | null | undefined
        likedCount: number
      }
    | null
    | undefined
}

export const PostCardFragmentDoc = gql`
  fragment postCard on Post {
    id
    creationTime
    modificationTime
    title
    contents
    category
    user {
      id
      nickname
    }
  }
`
export const CreateCommentDocument = gql`
  mutation CreateComment($postId: ID!, $contents: NonEmptyString!, $commentId: ID) {
    createComment(postId: $postId, contents: $contents, commentId: $commentId) {
      id
    }
  }
`
export type CreateCommentMutationFn = Apollo.MutationFunction<
  CreateCommentMutation,
  CreateCommentMutationVariables
>

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      contents: // value for 'contents'
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useCreateCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(
    CreateCommentDocument,
    options
  )
}
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<
  CreateCommentMutation,
  CreateCommentMutationVariables
>
export const CreatePostDocument = gql`
  mutation CreatePost($input: PostCreationInput!) {
    createPost(input: $input) {
      id
    }
  }
`
export type CreatePostMutationFn = Apollo.MutationFunction<
  CreatePostMutation,
  CreatePostMutationVariables
>

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePostMutation(
  baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(
    CreatePostDocument,
    options
  )
}
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<
  CreatePostMutation,
  CreatePostMutationVariables
>
export const DeleteCommentDocument = gql`
  mutation DeleteComment($id: ID!) {
    deleteComment(id: $id) {
      id
    }
  }
`
export type DeleteCommentMutationFn = Apollo.MutationFunction<
  DeleteCommentMutation,
  DeleteCommentMutationVariables
>

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(
    DeleteCommentDocument,
    options
  )
}
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<
  DeleteCommentMutation,
  DeleteCommentMutationVariables
>
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options)
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>
export const ToggleLikingCommentDocument = gql`
  mutation ToggleLikingComment($id: ID!) {
    toggleLikingComment(id: $id) {
      id
      isLiked
      likedCount
    }
  }
`
export type ToggleLikingCommentMutationFn = Apollo.MutationFunction<
  ToggleLikingCommentMutation,
  ToggleLikingCommentMutationVariables
>

/**
 * __useToggleLikingCommentMutation__
 *
 * To run a mutation, you first call `useToggleLikingCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleLikingCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleLikingCommentMutation, { data, loading, error }] = useToggleLikingCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useToggleLikingCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ToggleLikingCommentMutation,
    ToggleLikingCommentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<ToggleLikingCommentMutation, ToggleLikingCommentMutationVariables>(
    ToggleLikingCommentDocument,
    options
  )
}
export type ToggleLikingCommentMutationHookResult = ReturnType<
  typeof useToggleLikingCommentMutation
>
export type ToggleLikingCommentMutationResult = Apollo.MutationResult<ToggleLikingCommentMutation>
export type ToggleLikingCommentMutationOptions = Apollo.BaseMutationOptions<
  ToggleLikingCommentMutation,
  ToggleLikingCommentMutationVariables
>
export const UnregisterDocument = gql`
  mutation Unregister {
    unregister {
      id
    }
  }
`
export type UnregisterMutationFn = Apollo.MutationFunction<
  UnregisterMutation,
  UnregisterMutationVariables
>

/**
 * __useUnregisterMutation__
 *
 * To run a mutation, you first call `useUnregisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnregisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unregisterMutation, { data, loading, error }] = useUnregisterMutation({
 *   variables: {
 *   },
 * });
 */
export function useUnregisterMutation(
  baseOptions?: Apollo.MutationHookOptions<UnregisterMutation, UnregisterMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UnregisterMutation, UnregisterMutationVariables>(
    UnregisterDocument,
    options
  )
}
export type UnregisterMutationHookResult = ReturnType<typeof useUnregisterMutation>
export type UnregisterMutationResult = Apollo.MutationResult<UnregisterMutation>
export type UnregisterMutationOptions = Apollo.BaseMutationOptions<
  UnregisterMutation,
  UnregisterMutationVariables
>
export const UpdatePostDocument = gql`
  mutation UpdatePost($input: PostModificationInput!) {
    updatePost(input: $input) {
      id
      category
      title
      contents
      imageUrls
    }
  }
`
export type UpdatePostMutationFn = Apollo.MutationFunction<
  UpdatePostMutation,
  UpdatePostMutationVariables
>

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePostMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(
    UpdatePostDocument,
    options
  )
}
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<
  UpdatePostMutation,
  UpdatePostMutationVariables
>
export const UpdateUserDocument = gql`
  mutation UpdateUser($input: UserModificationInput!) {
    updateUser(input: $input) {
      id
      nickname
    }
  }
`
export type UpdateUserMutationFn = Apollo.MutationFunction<
  UpdateUserMutation,
  UpdateUserMutationVariables
>

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument,
    options
  )
}
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserMutation,
  UpdateUserMutationVariables
>
export const CommentsByPostDocument = gql`
  query CommentsByPost($postId: ID!) {
    commentsByPost(postId: $postId) {
      id
      creationTime
      contents
      isLiked
      isModified
      likedCount
      user {
        id
        nickname
        imageUrl
      }
      subcomments {
        id
        creationTime
        contents
        isLiked
        isModified
        likedCount
        user {
          id
          nickname
          imageUrl
        }
      }
    }
  }
`

/**
 * __useCommentsByPostQuery__
 *
 * To run a query within a React component, call `useCommentsByPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentsByPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentsByPostQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useCommentsByPostQuery(
  baseOptions: Apollo.QueryHookOptions<CommentsByPostQuery, CommentsByPostQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<CommentsByPostQuery, CommentsByPostQueryVariables>(
    CommentsByPostDocument,
    options
  )
}
export function useCommentsByPostLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CommentsByPostQuery, CommentsByPostQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<CommentsByPostQuery, CommentsByPostQueryVariables>(
    CommentsByPostDocument,
    options
  )
}
export type CommentsByPostQueryHookResult = ReturnType<typeof useCommentsByPostQuery>
export type CommentsByPostLazyQueryHookResult = ReturnType<typeof useCommentsByPostLazyQuery>
export type CommentsByPostQueryResult = Apollo.QueryResult<
  CommentsByPostQuery,
  CommentsByPostQueryVariables
>
export const FamousPostsDocument = gql`
  query FamousPosts {
    famousPosts {
      id
      creationTime
      title
      contents
      category
      commentCount
      user {
        id
        nickname
      }
    }
  }
`

/**
 * __useFamousPostsQuery__
 *
 * To run a query within a React component, call `useFamousPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFamousPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFamousPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFamousPostsQuery(
  baseOptions?: Apollo.QueryHookOptions<FamousPostsQuery, FamousPostsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<FamousPostsQuery, FamousPostsQueryVariables>(FamousPostsDocument, options)
}
export function useFamousPostsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FamousPostsQuery, FamousPostsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<FamousPostsQuery, FamousPostsQueryVariables>(
    FamousPostsDocument,
    options
  )
}
export type FamousPostsQueryHookResult = ReturnType<typeof useFamousPostsQuery>
export type FamousPostsLazyQueryHookResult = ReturnType<typeof useFamousPostsLazyQuery>
export type FamousPostsQueryResult = Apollo.QueryResult<FamousPostsQuery, FamousPostsQueryVariables>
export const IsNicknameUniqueDocument = gql`
  query IsNicknameUnique($nickname: NonEmptyString!) {
    isNicknameUnique(nickname: $nickname)
  }
`

/**
 * __useIsNicknameUniqueQuery__
 *
 * To run a query within a React component, call `useIsNicknameUniqueQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsNicknameUniqueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsNicknameUniqueQuery({
 *   variables: {
 *      nickname: // value for 'nickname'
 *   },
 * });
 */
export function useIsNicknameUniqueQuery(
  baseOptions: Apollo.QueryHookOptions<IsNicknameUniqueQuery, IsNicknameUniqueQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<IsNicknameUniqueQuery, IsNicknameUniqueQueryVariables>(
    IsNicknameUniqueDocument,
    options
  )
}
export function useIsNicknameUniqueLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<IsNicknameUniqueQuery, IsNicknameUniqueQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<IsNicknameUniqueQuery, IsNicknameUniqueQueryVariables>(
    IsNicknameUniqueDocument,
    options
  )
}
export type IsNicknameUniqueQueryHookResult = ReturnType<typeof useIsNicknameUniqueQuery>
export type IsNicknameUniqueLazyQueryHookResult = ReturnType<typeof useIsNicknameUniqueLazyQuery>
export type IsNicknameUniqueQueryResult = Apollo.QueryResult<
  IsNicknameUniqueQuery,
  IsNicknameUniqueQueryVariables
>
export const MeDocument = gql`
  query Me {
    me {
      id
      nickname
    }
  }
`

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options)
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options)
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>
export const PostDocument = gql`
  query Post($id: ID!) {
    post(id: $id) {
      id
      creationTime
      title
      contents
      imageUrls
      commentCount
      user {
        id
        nickname
        imageUrl
      }
    }
  }
`

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePostQuery(baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, options)
}
export function usePostLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, options)
}
export type PostQueryHookResult = ReturnType<typeof usePostQuery>
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>
export const PostsDocument = gql`
  query Posts($pagination: Pagination!) {
    posts(pagination: $pagination) {
      id
      creationTime
      title
      contents
      category
      commentCount
      user {
        id
        nickname
      }
    }
  }
`

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function usePostsQuery(
  baseOptions: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options)
}
export function usePostsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options)
}
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>
export const QuestionsDocument = gql`
  query Questions {
    questions {
      id
      title
      contents
    }
  }
`

/**
 * __useQuestionsQuery__
 *
 * To run a query within a React component, call `useQuestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuestionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useQuestionsQuery(
  baseOptions?: Apollo.QueryHookOptions<QuestionsQuery, QuestionsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<QuestionsQuery, QuestionsQueryVariables>(QuestionsDocument, options)
}
export function useQuestionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<QuestionsQuery, QuestionsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<QuestionsQuery, QuestionsQueryVariables>(QuestionsDocument, options)
}
export type QuestionsQueryHookResult = ReturnType<typeof useQuestionsQuery>
export type QuestionsLazyQueryHookResult = ReturnType<typeof useQuestionsLazyQuery>
export type QuestionsQueryResult = Apollo.QueryResult<QuestionsQuery, QuestionsQueryVariables>
export const UserByNicknameDocument = gql`
  query UserByNickname($nickname: NonEmptyString!) {
    userByNickname(nickname: $nickname) {
      id
      nickname
      imageUrl
      likedCount
    }
  }
`

/**
 * __useUserByNicknameQuery__
 *
 * To run a query within a React component, call `useUserByNicknameQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserByNicknameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserByNicknameQuery({
 *   variables: {
 *      nickname: // value for 'nickname'
 *   },
 * });
 */
export function useUserByNicknameQuery(
  baseOptions: Apollo.QueryHookOptions<UserByNicknameQuery, UserByNicknameQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<UserByNicknameQuery, UserByNicknameQueryVariables>(
    UserByNicknameDocument,
    options
  )
}
export function useUserByNicknameLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserByNicknameQuery, UserByNicknameQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<UserByNicknameQuery, UserByNicknameQueryVariables>(
    UserByNicknameDocument,
    options
  )
}
export type UserByNicknameQueryHookResult = ReturnType<typeof useUserByNicknameQuery>
export type UserByNicknameLazyQueryHookResult = ReturnType<typeof useUserByNicknameLazyQuery>
export type UserByNicknameQueryResult = Apollo.QueryResult<
  UserByNicknameQuery,
  UserByNicknameQueryVariables
>
export type CommentKeySpecifier = (
  | 'contents'
  | 'creationTime'
  | 'id'
  | 'imageUrls'
  | 'isLiked'
  | 'isModified'
  | 'likedCount'
  | 'modificationTime'
  | 'parentComment'
  | 'post'
  | 'subcomments'
  | 'user'
  | CommentKeySpecifier
)[]
export type CommentFieldPolicy = {
  contents?: FieldPolicy<any> | FieldReadFunction<any>
  creationTime?: FieldPolicy<any> | FieldReadFunction<any>
  id?: FieldPolicy<any> | FieldReadFunction<any>
  imageUrls?: FieldPolicy<any> | FieldReadFunction<any>
  isLiked?: FieldPolicy<any> | FieldReadFunction<any>
  isModified?: FieldPolicy<any> | FieldReadFunction<any>
  likedCount?: FieldPolicy<any> | FieldReadFunction<any>
  modificationTime?: FieldPolicy<any> | FieldReadFunction<any>
  parentComment?: FieldPolicy<any> | FieldReadFunction<any>
  post?: FieldPolicy<any> | FieldReadFunction<any>
  subcomments?: FieldPolicy<any> | FieldReadFunction<any>
  user?: FieldPolicy<any> | FieldReadFunction<any>
}
export type MutationKeySpecifier = (
  | 'createComment'
  | 'createPost'
  | 'deleteComment'
  | 'deletePost'
  | 'logout'
  | 'toggleLikingComment'
  | 'unregister'
  | 'updateComment'
  | 'updatePost'
  | 'updateUser'
  | MutationKeySpecifier
)[]
export type MutationFieldPolicy = {
  createComment?: FieldPolicy<any> | FieldReadFunction<any>
  createPost?: FieldPolicy<any> | FieldReadFunction<any>
  deleteComment?: FieldPolicy<any> | FieldReadFunction<any>
  deletePost?: FieldPolicy<any> | FieldReadFunction<any>
  logout?: FieldPolicy<any> | FieldReadFunction<any>
  toggleLikingComment?: FieldPolicy<any> | FieldReadFunction<any>
  unregister?: FieldPolicy<any> | FieldReadFunction<any>
  updateComment?: FieldPolicy<any> | FieldReadFunction<any>
  updatePost?: FieldPolicy<any> | FieldReadFunction<any>
  updateUser?: FieldPolicy<any> | FieldReadFunction<any>
}
export type PostKeySpecifier = (
  | 'category'
  | 'commentCount'
  | 'contents'
  | 'creationTime'
  | 'hashtags'
  | 'id'
  | 'imageUrls'
  | 'isLiked'
  | 'modificationTime'
  | 'title'
  | 'user'
  | PostKeySpecifier
)[]
export type PostFieldPolicy = {
  category?: FieldPolicy<any> | FieldReadFunction<any>
  commentCount?: FieldPolicy<any> | FieldReadFunction<any>
  contents?: FieldPolicy<any> | FieldReadFunction<any>
  creationTime?: FieldPolicy<any> | FieldReadFunction<any>
  hashtags?: FieldPolicy<any> | FieldReadFunction<any>
  id?: FieldPolicy<any> | FieldReadFunction<any>
  imageUrls?: FieldPolicy<any> | FieldReadFunction<any>
  isLiked?: FieldPolicy<any> | FieldReadFunction<any>
  modificationTime?: FieldPolicy<any> | FieldReadFunction<any>
  title?: FieldPolicy<any> | FieldReadFunction<any>
  user?: FieldPolicy<any> | FieldReadFunction<any>
}
export type QueryKeySpecifier = (
  | 'commentsByPost'
  | 'famousPosts'
  | 'isNicknameUnique'
  | 'likedComments'
  | 'me'
  | 'myComments'
  | 'post'
  | 'posts'
  | 'questions'
  | 'searchPosts'
  | 'userByNickname'
  | QueryKeySpecifier
)[]
export type QueryFieldPolicy = {
  commentsByPost?: FieldPolicy<any> | FieldReadFunction<any>
  famousPosts?: FieldPolicy<any> | FieldReadFunction<any>
  isNicknameUnique?: FieldPolicy<any> | FieldReadFunction<any>
  likedComments?: FieldPolicy<any> | FieldReadFunction<any>
  me?: FieldPolicy<any> | FieldReadFunction<any>
  myComments?: FieldPolicy<any> | FieldReadFunction<any>
  post?: FieldPolicy<any> | FieldReadFunction<any>
  posts?: FieldPolicy<any> | FieldReadFunction<any>
  questions?: FieldPolicy<any> | FieldReadFunction<any>
  searchPosts?: FieldPolicy<any> | FieldReadFunction<any>
  userByNickname?: FieldPolicy<any> | FieldReadFunction<any>
}
export type QuestionKeySpecifier = (
  | 'contents'
  | 'creationTime'
  | 'id'
  | 'title'
  | QuestionKeySpecifier
)[]
export type QuestionFieldPolicy = {
  contents?: FieldPolicy<any> | FieldReadFunction<any>
  creationTime?: FieldPolicy<any> | FieldReadFunction<any>
  id?: FieldPolicy<any> | FieldReadFunction<any>
  title?: FieldPolicy<any> | FieldReadFunction<any>
}
export type UserKeySpecifier = (
  | 'bio'
  | 'birthday'
  | 'birthyear'
  | 'creationTime'
  | 'email'
  | 'gender'
  | 'id'
  | 'imageUrl'
  | 'likedCount'
  | 'modificationTime'
  | 'nickname'
  | 'phoneNumber'
  | 'providers'
  | UserKeySpecifier
)[]
export type UserFieldPolicy = {
  bio?: FieldPolicy<any> | FieldReadFunction<any>
  birthday?: FieldPolicy<any> | FieldReadFunction<any>
  birthyear?: FieldPolicy<any> | FieldReadFunction<any>
  creationTime?: FieldPolicy<any> | FieldReadFunction<any>
  email?: FieldPolicy<any> | FieldReadFunction<any>
  gender?: FieldPolicy<any> | FieldReadFunction<any>
  id?: FieldPolicy<any> | FieldReadFunction<any>
  imageUrl?: FieldPolicy<any> | FieldReadFunction<any>
  likedCount?: FieldPolicy<any> | FieldReadFunction<any>
  modificationTime?: FieldPolicy<any> | FieldReadFunction<any>
  nickname?: FieldPolicy<any> | FieldReadFunction<any>
  phoneNumber?: FieldPolicy<any> | FieldReadFunction<any>
  providers?: FieldPolicy<any> | FieldReadFunction<any>
}
export type StrictTypedTypePolicies = {
  Comment?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | CommentKeySpecifier | (() => undefined | CommentKeySpecifier)
    fields?: CommentFieldPolicy
  }
  Mutation?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier)
    fields?: MutationFieldPolicy
  }
  Post?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | PostKeySpecifier | (() => undefined | PostKeySpecifier)
    fields?: PostFieldPolicy
  }
  Query?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier)
    fields?: QueryFieldPolicy
  }
  Question?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | QuestionKeySpecifier | (() => undefined | QuestionKeySpecifier)
    fields?: QuestionFieldPolicy
  }
  User?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier)
    fields?: UserFieldPolicy
  }
}
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies
