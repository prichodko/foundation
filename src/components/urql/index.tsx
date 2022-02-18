import { useEffect, useMemo } from 'react'

import { devtoolsExchange } from '@urql/devtools'
// import { cacheExchange } from '@urql/exchange-graphcache'
import {
  createClient,
  Provider,
  errorExchange,
  dedupExchange,
  fetchExchange,
  cacheExchange,
  ssrExchange,
} from 'urql'

import type { GraphCacheConfig } from '~/types/graphql'

import { initUrqlClient } from './client'

// export const urqlClient = createClient({
//   url: '/api/graphql',
//   exchanges: [
//     devtoolsExchange,
//     dedupExchange,
//     cacheExchange<GraphCacheConfig>({
//       updates: {
//         Mutation: {
//           removeAlert: (_result, args, cache) => {
//             cache.invalidate({ __typename: 'Alert', id: args.id })
//           },
//         },
//       },
//       optimistic: {
//         addLike: (args, _cache) => ({
//           __typename: 'Job',
//           id: args.id,
//           liked: true,
//         }),
//         removeLike: (args, _cache) => ({
//           __typename: 'Job',
//           id: args.id,
//           liked: false,
//         }),
//         removeAlert: _args => ({
//           __typename: 'SuccessResult',
//           success: true,
//         }),
//       },
//     }),
//     errorExchange({
//       onError(error) {
//         const { graphQLErrors, networkError } = error
//         for (let graphQLError of graphQLErrors) {
//           console.error(graphQLError)
//           // switch (err.extensions.code) {
//           //   // Apollo Server sets code to UNAUTHENTICATED
//           //   // when an AuthenticationError is thrown in a resolver
//           //   case 'UNAUTHENTICATED':

//           //     // Modify the operation context with a new token
//           //     const oldHeaders = operation.getContext().headers;
//           //     operation.setContext({
//           //       headers: {
//           //         ...oldHeaders,
//           //         authorization: getNewToken(),
//           //       },
//           //     });
//           //     // Retry the request, returning the new observable
//           //     return forward(operation);
//           // }
//           // }
//         }

//         if (networkError) {
//           console.error(`[Network Error]:`, networkError)
//         }
//       },
//     }),
//     fetchExchange,
//   ],
// })

interface Props {
  children: React.ReactNode
  initialState?: any
}

let ssr: any
export const UrqlProvider = (props: Props) => {
  const { children, initialState } = props

  const client = useMemo(() => {
    if (!ssr || typeof window === 'undefined') {
      // We want to force the cache to hydrate, we do this by setting the isClient flag to true
      ssr = ssrExchange({
        initialState,
        isClient: true,
        staleWhileRevalidate: typeof window !== 'undefined' ? true : undefined,
      })

      console.log('SWR', typeof window !== 'undefined' ? true : undefined)
    } else {
      console.log('new', initialState)
      ssr.restoreData(initialState)
    }

    return initUrqlClient(ssr)
  }, [initialState])

  return <Provider value={client}>{children}</Provider>
}
