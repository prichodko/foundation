import { devtoolsExchange } from '@urql/devtools'
import { cacheExchange } from '@urql/exchange-graphcache'
import {
  createClient,
  Provider,
  errorExchange,
  dedupExchange,
  fetchExchange,
} from 'urql'

import type { GraphCacheConfig } from '~/types/graphql'

export const urqlClient = createClient({
  url: '/api/graphql',
  exchanges: [
    devtoolsExchange,
    dedupExchange,
    cacheExchange<GraphCacheConfig>({
      updates: {
        Mutation: {
          removeAlert: (_result, args, cache) => {
            cache.invalidate({ __typename: 'Alert', id: args.id })
          },
        },
      },
      optimistic: {
        addLike: (args, _cache) => ({
          __typename: 'Job',
          id: args.id,
          liked: true,
        }),
        removeLike: (args, _cache) => ({
          __typename: 'Job',
          id: args.id,
          liked: false,
        }),
        removeAlert: _args => ({
          __typename: 'SuccessResult',
          success: true,
        }),
      },
    }),
    errorExchange({
      onError(error) {
        const { graphQLErrors, networkError } = error
        for (let graphQLError of graphQLErrors) {
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
