import { objectType } from 'nexus'

export * from './get-user'
export * from './update-user'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.id('id')
    t.nullable.string('name')
    t.nullable.string('email')
    t.nullable.field('company', {
      type: 'Company',
      resolve: async (parent, _args, ctx) => {
        const user = await ctx.prisma.user.findUnique({
          where: {
            id: parent.id,
          },
          include: {
            company: true,
          },
          rejectOnNotFound: true,
        })

        return user.company
      },
    })
    t.list.field('jobs', {
      type: 'Job',
      resolve: async (parent, _args, ctx) => {
        const user = await ctx.prisma.user.findUnique({
          where: {
            id: parent.id,
          },
          include: {
            jobs: {
              orderBy: {
                createdAt: 'desc',
              },
            },
          },
          rejectOnNotFound: true,
        })

        return user.jobs
      },
    })
    t.list.field('likes', {
      type: 'Job',
      resolve: async (parent, _args, ctx) => {
        const user = await ctx.prisma.user.findUnique({
          where: {
            id: parent.id,
          },
          include: {
            likes: {
              include: {
                job: true,
              },
            },
          },
          rejectOnNotFound: true,
        })

        return user.likes.map(({ job }) => job)
      },
    })
  },
})
