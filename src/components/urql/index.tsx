import { devtoolsExchange } from '@urql/devtools'
import {
  createClient,
  Provider,
  errorExchange,
  dedupExchange,
  cacheExchange,
  fetchExchange,
} from 'urql'

const urqlClient = createClient({
  url: 'http://localhost:3000/api/graphql',
  exchanges: [
    devtoolsExchange,
    dedupExchange,
    cacheExchange,
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
