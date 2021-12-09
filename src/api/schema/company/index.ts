import { list, objectType } from 'nexus'

import type { JobsFilter } from '~/types/graphql'

export * from './get-company'
export * from './get-company-by-slug'
export * from './get-companies'
export * from './create-company'
export * from './update-company'
export * from './update-company-logo'
export * from './view-company'
export * from './search-companies'

export const Company = objectType({
  name: 'Company',
  definition(t) {
    t.id('id')
    t.date('createdAt')
    t.date('updatedAt')
    t.string('name')
    t.string('email')
    t.string('slug')
    t.string('description')
    t.nullable.string('logoUrl')
    t.string('website')
    t.int('viewCount')
    t.nullable.string('twitter')
    t.boolean('subscribed', {
      resolve: async (parent, _args, ctx) => {
        if (!ctx.user) {
          return false
        }

        const filter: JobsFilter = {
          company: [parent.id],
        }

        const exists = await ctx.prisma.alert.findFirst({
          where: {
            userId: ctx.user.id,
            filter: {
              equals: filter,
            },
          },
        })

        return !!exists
      },
    })
    t.field('jobs', {
      type: list('Job'),
      resolve: async (parent, _args, ctx) => {
        const company = await ctx.prisma.company.findUnique({
          where: {
            id: parent.id,
          },
          include: {
            user: {
              include: {
                jobs: {
                  where: {
                    status: 'Live',
                  },
                },
              },
            },
          },
          rejectOnNotFound: true,
        })

        return company.user.jobs
      },
    })
  },
})
