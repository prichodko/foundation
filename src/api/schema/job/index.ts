import { objectType } from 'nexus'

export * from './get-job'
export * from './get-jobs'
export * from './create-job'
export * from './update-job'
export * from './add-like'
export * from './remove-like'
export * from './view-job'

export const Job = objectType({
  name: 'Job',
  definition(t) {
    t.id('id')
    t.date('createdAt')
    t.date('updatedAt')
    t.string('position')
    t.string('role')
    t.string('description')
    t.string('applyUrl')
    t.boolean('remote')
    t.int('viewCount')
    t.list.field('tags', {
      type: 'Tag',
      resolve: async (parent, _args, ctx) => {
        const tags = await ctx.db.job
          .findUnique({
            where: { id: parent.id },
          })
          .tags()

        return tags
      },
    })

    t.boolean('liked', {
      resolve: async (parent, _args, ctx) => {
        if (!ctx.user) {
          return false
        }

        const liked = await ctx.db.userLikes.findUnique({
          where: {
            userId_jobId: {
              jobId: parent.id,
              userId: ctx.user.id,
            },
          },
        })

        return !!liked
      },
    })

    t.field('company', {
      type: 'Company',
      resolve: async (parent, _args, ctx) => {
        const company = await ctx.db.job
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .user()
          .company()

        return company!
      },
    })
  },
})
