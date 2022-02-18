import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
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

import { prisma } from '~/api/lib/prisma'
import { initUrqlClient } from '~/components/urql/client'
import { Workverse } from '~/pages/homepage'
import type {
  JobsQuery,
  JobsQueryVariables,
} from '~/pages/homepage/graphql/jobs'
import { JobsDocument } from '~/pages/homepage/graphql/jobs'
import type { JobRole } from '~/types/graphql'

// export const getServerSideProps: GetServerSideProps<{
//   urqlState: {}
// }> = async () => {
//   const jobs = await prisma.job.findMany({
//     where: {
//       status: 'Live',
//     },
//     include: {
//       tags: {
//         select: {
//           id: true,
//           name: true,
//         },
//       },
//       user: {
//         include: {
//           company: {
//             select: {
//               id: true,
//               name: true,
//               slug: true,
//             },
//           },
//         },
//       },
//     },
//   })

//   const query: JobsQuery = {
//     jobs: [
//       {
//         id: 'ckwm5k0lb06546aoanzdyufgp',
//         createdAt: '2021-11-30T13:45:04.511Z',
//         position: 'Frontend Engineer',
//         tags: [
//           {
//             id: 'ckwlctnw60004ljoa7k3t2ttq',
//             name: 'Frontend',
//             __typename: 'Tag',
//           },
//           {
//             id: 'ckwlctnw60010ljoa6qajc6dm',
//             name: 'DeFi',
//             __typename: 'Tag',
//           },
//         ],
//         role: 'Engineering',
//         liked: false,
//         company: {
//           id: 'ckwlctnw60001ljoayxdgwg95',
//           name: 'Workverse',
//           slug: 'workverse',
//           __typename: 'Company',
//         },
//         __typename: 'Job',
//       },
//       {
//         id: 'ckwlctnw60008ljoacmxj8tej',
//         createdAt: '2021-11-30T00:20:45.750Z',
//         position: 'Backend Engineer',
//         tags: [
//           {
//             id: 'ckwlctnw60009ljoazog2r6gj',
//             name: 'Backend',
//             __typename: 'Tag',
//           },
//           {
//             id: 'ckwlctnw60010ljoa6qajc6dm',
//             name: 'DeFi',
//             __typename: 'Tag',
//           },
//         ],
//         role: 'Engineering',
//         liked: false,
//         company: {
//           id: 'ckwlctnw60001ljoayxdgwg95',
//           name: 'Workverse',
//           slug: 'workverse',
//           __typename: 'Company',
//         },
//         __typename: 'Job',
//       },
//       {
//         id: 'ckwlctnw60013ljoa21l0pkob',
//         createdAt: '2021-11-30T00:20:45.750Z',
//         position: 'Product Designer',
//         tags: [
//           {
//             id: 'ckwlctnw60014ljoaxb96aq76',
//             name: 'Design',
//             __typename: 'Tag',
//           },
//           {
//             id: 'ckwlctnw60015ljoakxyzm0oj',
//             name: 'Gaming',
//             __typename: 'Tag',
//           },
//         ],
//         role: 'Design',
//         liked: false,
//         company: {
//           id: 'ckwlctnw60001ljoayxdgwg95',
//           name: 'Workverse',
//           slug: 'workverse',
//           __typename: 'Company',
//         },
//         __typename: 'Job',
//       },
//       {
//         id: 'ckwlctnw60003ljoagw6lrztt',
//         createdAt: '2021-11-30T00:20:45.750Z',
//         position: 'Frontend Engineer',
//         tags: [
//           {
//             id: 'ckwlctnw60004ljoa7k3t2ttq',
//             name: 'Frontend',
//             __typename: 'Tag',
//           },
//           {
//             id: 'ckwlctnw60005ljoalkjx4ml5',
//             name: 'NFT',
//             __typename: 'Tag',
//           },
//         ],
//         role: 'Engineering',
//         liked: false,
//         company: {
//           id: 'ckwlctnw60001ljoayxdgwg95',
//           name: 'Workverse',
//           slug: 'workverse',
//           __typename: 'Company',
//         },
//         __typename: 'Job',
//       },
//     ],
//   }

//   //   console.log(query)

//   return {
//     props: {
//       urqlState: { 1354806706: { data: JSON.stringify(query) } },
//     },
//   }
// }

// export const getServerSideProps: GetServerSideProps = async ctx => {
//   // const ssrCache = ssrExchange({ isClient: false })

//   // const client = initUrqlClient({
//   //   url: 'https://workverse.vercel.app/api/graphql',
//   //   exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
//   // })

//   // const result = await client.query(JobsDocument, { filter: {} }).toPromise()

//   // const urqlState = ssrCache.extractData()
//   // console.log(urqlState)
//   return {
//     props: {
//       // data: result.data,
//       urqlState: {
//         '1354806706': {
//           data: '{"jobs":[{"id":"ckwm5k0lb06546aoanzdyufgp","createdAt":"2021-11-30T13:45:04.511Z","position":"Frontend Engineer","tags":[{"id":"ckwlctnw60004ljoa7k3t2ttq","name":"Frontend","__typename":"Tag"},{"id":"ckwlctnw60010ljoa6qajc6dm","name":"DeFi","__typename":"Tag"}],"role":"Engineering","liked":false,"company":{"id":"ckwlctnw60001ljoayxdgwg95","name":"Workverse","slug":"workverse","__typename":"Company"},"__typename":"Job"},{"id":"ckwlctnw60008ljoacmxj8tej","createdAt":"2021-11-30T00:20:45.750Z","position":"Backend Engineer","tags":[{"id":"ckwlctnw60009ljoazog2r6gj","name":"Backend","__typename":"Tag"},{"id":"ckwlctnw60010ljoa6qajc6dm","name":"DeFi","__typename":"Tag"}],"role":"Engineering","liked":false,"company":{"id":"ckwlctnw60001ljoayxdgwg95","name":"Workverse","slug":"workverse","__typename":"Company"},"__typename":"Job"},{"id":"ckwlctnw60013ljoa21l0pkob","createdAt":"2021-11-30T00:20:45.750Z","position":"Product Designer","tags":[{"id":"ckwlctnw60014ljoaxb96aq76","name":"Design","__typename":"Tag"},{"id":"ckwlctnw60015ljoakxyzm0oj","name":"Gaming","__typename":"Tag"}],"role":"Design","liked":false,"company":{"id":"ckwlctnw60001ljoayxdgwg95","name":"Workverse","slug":"workverse","__typename":"Company"},"__typename":"Job"},{"id":"ckwlctnw60003ljoagw6lrztt","createdAt":"2021-11-30T00:20:45.750Z","position":"Frontend Engineer","tags":[{"id":"ckwlctnw60004ljoa7k3t2ttq","name":"Frontend","__typename":"Tag"},{"id":"ckwlctnw60005ljoalkjx4ml5","name":"NFT","__typename":"Tag"}],"role":"Engineering","liked":false,"company":{"id":"ckwlctnw60001ljoayxdgwg95","name":"Workverse","slug":"workverse","__typename":"Company"},"__typename":"Job"}]}',
//         },
//       },
//     },
//   }
// }

// export type ServerProps = InferGetServerSidePropsType<typeof getServerSideProps>

export default Workverse
