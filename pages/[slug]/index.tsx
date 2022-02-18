import type { GetStaticPaths, GetStaticProps } from 'next'

import { prisma } from '~/api/lib/prisma'
// import type { Props } from '~/pages/company'
import { CompanyPage } from '~/pages/company'
import type { CompanyBySlugQuery } from '~/pages/company/graphql/company-by-slug'

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
            where: {
              status: 'Live',
            },
            include: {
              tags: true,
            },
            orderBy: {
              createdAt: 'desc',
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

  const cache: DeepRequired<CompanyBySlugQuery> = {
    __typename: 'Query',
    companyBySlug: {
      __typename: 'Company',
      id: company.id,
      logoUrl: company.logoUrl,
      name: company.name,
      slug: company.slug,
      twitter: company.twitter,
      description: company.description,
      website: company.website,
      viewCount: company.viewCount,
      subscribed: false,
      jobs: company.user.jobs.map(job => ({
        __typename: 'Job',
        id: job.id,
        position: job.position,
        description: job.description as JsonObject,
        tags: job.tags.map(tag => ({
          __typename: 'Tag',
          id: tag.id,
          name: tag.name,
        })),
      })),
    },
  }

  return {
    props: {
      company: cache.companyBySlug,
    },
    revalidate: 60,
  }
}

export default CompanyPage
