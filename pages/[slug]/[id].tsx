import type { GetStaticPaths, GetStaticProps } from 'next'
import {
  ssrExchange,
  dedupExchange,
  cacheExchange,
  fetchExchange,
  useQuery,
  gql,
  createRequest,
} from 'urql'

import { prisma } from '~/api/lib/prisma'
import { initUrqlClient } from '~/components/urql/client'
import type { Props } from '~/pages/job'
import { JobPage } from '~/pages/job'
import type { JobQuery, JobQueryVariables } from '~/pages/job/graphql/job'
import { JobDocument } from '~/pages/job/graphql/job'
import type { JobType, JobRole } from '~/types/graphql'

export const getStaticPaths: GetStaticPaths = async () => {
  const jobs = await prisma.job.findMany({
    where: {
      status: 'Live',
    },
    select: {
      id: true,
      user: {
        select: {
          company: {
            select: {
              slug: true,
            },
          },
        },
      },
    },
  })

  const paths = jobs.map(job => ({
    params: {
      id: job.id,
      slug: job.user.company!.slug,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export type Primitive =
  | string
  | number
  | boolean
  | bigint
  | symbol
  | undefined
  | null
export type Builtin = Primitive | Function | Date | Error | RegExp

type DeepRequired<T> = T extends Error
  ? Required<T>
  : T extends Builtin
  ? T
  : T extends Map<infer K, infer V>
  ? Map<DeepRequired<K>, DeepRequired<V>>
  : T extends ReadonlyMap<infer K, infer V>
  ? ReadonlyMap<DeepRequired<K>, DeepRequired<V>>
  : T extends WeakMap<infer K, infer V>
  ? WeakMap<DeepRequired<K>, DeepRequired<V>>
  : T extends Set<infer U>
  ? Set<DeepRequired<U>>
  : T extends ReadonlySet<infer U>
  ? ReadonlySet<DeepRequired<U>>
  : T extends WeakSet<infer U>
  ? WeakSet<DeepRequired<U>>
  : T extends Promise<infer U>
  ? Promise<DeepRequired<U>>
  : T extends {}
  ? { [K in keyof T]-?: DeepRequired<T[K]> }
  : Required<T>

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // const ssr = ssrExchange({ isClient: false })

  // const client = initUrqlClient(ssr)

  // await client.query(JobDocument, { id: params!.id }).toPromise()

  // // console.log(POKEMONS_QUERY)
  // const ccc = ssr.extractData()

  const job = await prisma.job.findFirst({
    where: {
      status: 'Live',
      id: params!.id as string,
    },
    include: {
      tags: true,
      user: {
        include: {
          company: true,
        },
      },
    },
  })

  if (!job) {
    return {
      notFound: true,
    }
  }

  const cache: DeepRequired<Omit<JobQuery, '__typename'>> = {
    job: {
      __typename: 'Job',
      id: job.id,
      position: job.position,
      type: job.type as JobType,
      role: job.role as JobRole,
      description: job.description as JsonObject,
      applyUrl: job.applyUrl,
      viewCount: job.viewCount,
      liked: false,
      tags: job.tags.map(tag => ({
        __typename: 'Tag',
        id: tag.id,
        name: tag.name,
      })),
      company: {
        __typename: 'Company',
        id: job.user.company!.id,
        name: job.user.company!.name,
        slug: job.user.company!.slug,
        email: job.user.company!.email,
        website: job.user.company!.website,
        twitter: job.user.company!.twitter,
      },
    },
  }

  const { key } = createRequest<JobQuery, JobQueryVariables>(JobDocument, {
    id: params!.id as string,
  })

  return {
    props: {
      cache: {
        [key]: {
          data: JSON.stringify(cache),
        },
      },
      job: {
        id: job.id,
        position: job.position,
        role: job.role,
        description: job.description,
        applyUrl: job.applyUrl,
        viewCount: job.viewCount,
        liked: false,
        type: job.type,
        tags: job.tags.map(tag => ({ id: tag.id, name: tag.name })),
        company: {
          id: job.user.company!.id,
          name: job.user.company!.name,
          slug: job.user.company!.slug,
          email: job.user.company!.email,
          website: job.user.company!.website,
          twitter: job.user.company!.twitter,
        },
      },
    },
    revalidate: 60,
  }
}

export default JobPage
