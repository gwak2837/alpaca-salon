import { ApolloClient, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import cache from './cache'

const httpLink = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`,
  credentials: 'same-origin',
})

// Authenticate using HTTP header
const authLink = setContext((_, { headers }) => {
  const jwt = localStorage.getItem('jwt') ?? sessionStorage.getItem('jwt')

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: jwt || '',
    },
  }
})

export const client = new ApolloClient({
  cache,
  link: authLink.concat(httpLink),
})
