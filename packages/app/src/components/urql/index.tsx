import { devtoolsExchange } from '@urql/devtools'
import { cacheExchange } from '@urql/exchange-graphcache'
import {
  createClient,
  dedupExchange,
  errorExchange,
  fetchExchange,
  Provider,
} from 'urql'

import type { GraphCacheConfig } from '~/types/graphql'

export const urqlClient = createClient({
  url: '/api/graphql',
  exchanges: [
    devtoolsExchange,
    dedupExchange,
    cacheExchange<GraphCacheConfig>({
      updates: {
        Mutation: {},
      },
      optimistic: {},
    }),
    errorExchange({
      onError(error) {
        const { graphQLErrors, networkError } = error
        for (const graphQLError of graphQLErrors) {
          console.error(graphQLError)
          // switch (err.extensions.code) {
          //   // Apollo Server sets code to UNAUTHENTICATED
          //   // when an AuthenticationError is thrown in a resolver
          //   case 'UNAUTHENTICATED':

          //     // Modify the operation context with a new token
          //     const oldHeaders = operation.getContext().headers;
          //     operation.setContext({
          //       headers: {
          //         ...oldHeaders,
          //         authorization: getNewToken(),
          //       },
          //     });
          //     // Retry the request, returning the new observable
          //     return forward(operation);
          // }
          // }
        }

        if (networkError) {
          console.error(`[Network Error]:`, networkError)
        }
      },
    }),
    fetchExchange,
  ],
})

interface Props {
  children: React.ReactNode
}

export const UrqlProvider = (props: Props) => {
  const { children } = props

  return <Provider value={urqlClient}>{children}</Provider>
}
