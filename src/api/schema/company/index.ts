import { list, objectType } from 'nexus'

export * from './get-company'
export * from './get-company-by-slug'
export * from './get-companies'
export * from './update-company'
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
    t.string('website')
    t.int('viewCount')
    t.nullable.string('twitter')
    t.field('jobs', {
      type: list('Job'),
      resolve: async (parent, _args, ctx) => {
        const jobs = await ctx.prisma.company
          .findUnique({
            where: { id: parent.id },
          })
          .user()
          .jobs()

        return jobs
      },
    })
  },
})
