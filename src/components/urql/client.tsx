import { devtoolsExchange } from '@urql/devtools'
import { cacheExchange } from '@urql/exchange-graphcache'
import { relayPagination } from '@urql/exchange-graphcache/extras'
import type { Client } from 'urql'
import {
  // cacheExchange,
  ClientOptions,
  createClient,
  errorExchange,
  dedupExchange,
  fetchExchange,
  cacheExchange as defaultExchange,
} from 'urql'

import type { GraphCacheConfig } from '~/types/graphql'

let urqlClient: Client | null = null

// export function resetClient() {
//   urqlClient = null
// }

export function initUrqlClient(ssrExchange: any): Client {
  // Create a new Client for every server-side rendered request.
  // This ensures we reset the state for each rendered page.
  // If there is an exising client instance on the client-side, use it.
  const isServer = typeof window === 'undefined'

  if (isServer || !urqlClient) {
    console.log(isServer)
    urqlClient = createClient({
      url: '/api/graphql',
      exchanges: [
        devtoolsExchange,
        dedupExchange,
        cacheExchange<GraphCacheConfig>({
          resolvers: {
            Query: {
              jobs: relayPagination(),
            },
          },
        }),
        ssrExchange,
        fetchExchange,
      ],
      suspense: false, //canEnableSuspense && (isServer || clientOptions.suspense),
    })

    console.log('here')

    // Serialize the urqlClient to null on the client-side.
    // This ensures we don't share client and server instances of the urqlClient.
    // ;(urqlClient as any).toJSON = () => null
  }

  // Return both the Client instance and the ssrCache.
  return urqlClient
}
