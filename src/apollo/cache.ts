import { InMemoryCache } from '@apollo/client'

function infiniteScroll(existing: unknown[], incoming: unknown[]) {
  if (!existing) {
    return incoming
  } else {
    return [...existing, ...incoming]
  }
}

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: {
          merge: infiniteScroll,
          keyArgs: [],
        },
      },
    },
  },
})

export default cache
