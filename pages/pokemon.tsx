import React from 'react'

import type { GetServerSideProps } from 'next'
// import { withUrqlClient, initUrqlClient } from 'next-urql'
// import { initUrqlClient } from 'next-urql'
import Head from 'next/head'
import {
  ssrExchange,
  dedupExchange,
  cacheExchange,
  fetchExchange,
  useQuery,
} from 'urql'

import { initUrqlClient } from '~/components/urql/client'

const queryPokemon = `
  query Pokemon {
    getPokemon(pokemon: dragonite reverseFlavorTexts: true takeFlavorTexts: 1) {
      num
      species
      types
    }
  }
`

export const getServerSideProps: GetServerSideProps = async ctx => {
  const ssrCache = ssrExchange({ isClient: false })

  const client = initUrqlClient({
    url: 'https://graphqlpokemon.favware.tech/',
    exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
  })

  const result = await client.query(queryPokemon, {}).toPromise()

  const urqlState = ssrCache.extractData()
  console.log(urqlState)
  return {
    props: {
      // data: result.data,
      urqlState,
    },
  }
}

const Home = (props: any) => {
  const [res] = useQuery({ query: queryPokemon })
  console.log('LOADING', res.fetching, res.stale)
  return (
    <div>
      <pre>{JSON.stringify(res, null, 2)}</pre>
    </div>
  )
}

export default Home
