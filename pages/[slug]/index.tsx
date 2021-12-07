import type { GetStaticPaths, GetStaticProps } from 'next'

import { prisma } from '~/api/lib/prisma'
// import type { Props } from '~/pages/company'
import { Company } from '~/pages/company'

export const getStaticPaths: GetStaticPaths = async () => {
  const companies = await prisma.company.findMany({})

  const paths = companies.map(company => ({
    params: {
      slug: company.slug,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const company = await prisma.company.findFirst({
    where: {
      slug: params!.slug as string,
    },
    include: {
      user: {
        include: {
          jobs: {
            include: {
              tags: true,
            },
          },
        },
      },
    },
  })

  if (!company) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      company: {
        id: company.id,
        name: company.name,
        slug: company.slug,
        twitter: company.twitter,
        description: company.description,
        website: company.website,
        viewCount: company.viewCount,
        subscribed: false,
        jobs: company.user.jobs.map(job => ({
          id: job.id,
          position: job.position,
          description: job.description,
          tags: job.tags.map(tag => ({ id: tag.id, name: tag.name })),
        })),
      },
    },
    revalidate: 60,
  }
}

export default Company
