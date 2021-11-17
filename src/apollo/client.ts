import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

import cache from './cache'

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  headers: {
    authorization:
      globalThis.localStorage?.getItem('jwt') ?? globalThis.sessionStorage?.getItem('jwt') ?? '',
  },
  uri: `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`,
})
