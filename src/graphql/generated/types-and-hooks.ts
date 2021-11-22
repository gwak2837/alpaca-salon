/* eslint-disable */
import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
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
  Date: any
  DateTime: any
  EmailAddress: any
  JWT: any
  LastValue: any
  Latitude: any
  Longitude: any
  NonEmptyString: any
  PositiveInt: any
  URL: any
  UUID: any
}

export type Comment = {
  __typename?: 'Comment'
  contents: Array<Scalars['NonEmptyString']>
  creationTime: Scalars['DateTime']
  id: Scalars['ID']
  imageUrl?: Maybe<Scalars['URL']>
  modificationTime: Scalars['DateTime']
  /** 이 댓글의 상위 댓글 */
  parentComment?: Maybe<Comment>
  /** 이 댓글이 달린 피드 */
  post: Post
  /** 댓글을 작성한 사용자 */
  user: User
}

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
  Other = 'OTHER',
  Unknown = 'UNKNOWN',
}

export type Mutation = {
  __typename?: 'Mutation'
  createPost?: Maybe<Post>
  deletePost?: Maybe<Post>
  /** JWT 인증 토큰과 같이 요청하면 로그아웃 성공 여부를 반환함 */
  logout: Scalars['Boolean']
  /** 회원탈퇴 시 사용자 정보가 모두 초기화됩 */
  unregister?: Maybe<User>
  updatePost?: Maybe<Post>
  updateUser?: Maybe<User>
}

export type MutationCreatePostArgs = {
  input: PostCreationInput
}

export type MutationDeletePostArgs = {
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
  commentCount: Scalars['PositiveInt']
  contents: Scalars['NonEmptyString']
  creationTime: Scalars['DateTime']
  /** 피드에 달린 해시태그 */
  hashtags?: Maybe<Array<Scalars['NonEmptyString']>>
  id: Scalars['ID']
  /** 피드 좋아요 여부 (로그인 필요) */
  isLiked: Scalars['Boolean']
  modificationTime: Scalars['DateTime']
  title: Scalars['NonEmptyString']
  /** 글쓴이 */
  user: User
}

export enum PostCategory {
  FreeTopic = 'FREE_TOPIC',
  Menopause = 'MENOPAUSE',
}

export type PostCreationInput = {
  category?: InputMaybe<PostCategory>
  contents?: InputMaybe<Scalars['String']>
  title?: InputMaybe<Scalars['String']>
}

export type PostModificationInput = {
  category?: InputMaybe<PostCategory>
  contents?: InputMaybe<Scalars['String']>
  id: Scalars['ID']
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
  commentsByPost?: Maybe<Array<Maybe<Comment>>>
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
  /** 글 검색 */
  searchPosts?: Maybe<Array<Post>>
  /** 대댓글 */
  subComments?: Maybe<Array<Maybe<Comment>>>
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

export type QuerySubCommentsArgs = {
  id: Scalars['ID']
}

export type QueryUserByNicknameArgs = {
  nickname: Scalars['NonEmptyString']
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

export type UserAuthentication = {
  __typename?: 'UserAuthentication'
  jwt: Scalars['JWT']
  nickname: Scalars['NonEmptyString']
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
  user: { __typename?: 'User'; id: any; nickname?: any | null | undefined }
}

export type CreatePostMutationVariables = Exact<{
  input: PostCreationInput
}>

export type CreatePostMutation = {
  __typename?: 'Mutation'
  createPost?: { __typename?: 'Post'; id: string } | null | undefined
}

export type LogoutMutationVariables = Exact<{ [key: string]: never }>

export type LogoutMutation = { __typename?: 'Mutation'; logout: boolean }

export type UnregisterMutationVariables = Exact<{ [key: string]: never }>

export type UnregisterMutation = {
  __typename?: 'Mutation'
  unregister?: { __typename?: 'User'; id: any } | null | undefined
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

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = {
  __typename?: 'Query'
  me?: { __typename?: 'User'; id: any; nickname?: any | null | undefined } | null | undefined
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
        modificationTime: any
        title: any
        contents: any
        category: PostCategory
        user: { __typename?: 'User'; id: any; nickname?: any | null | undefined }
      }>
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
export const PostsDocument = gql`
  query Posts($pagination: Pagination!) {
    posts(pagination: $pagination) {
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
