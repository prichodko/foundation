import type { GetStaticPaths, GetStaticProps } from 'next'

import { prisma } from '~/api/lib/prisma'
// import type { Props } from '~/pages/job'
import { Job } from '~/pages/job'

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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const job = await prisma.job.findFirst({
    where: {
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

  return {
    props: {
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

export default Job
