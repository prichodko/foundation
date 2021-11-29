import { enumType, objectType } from 'nexus'

export * from './get-job'
export * from './get-jobs'
export * from './create-job'
export * from './update-job'
export * from './add-like'
export * from './remove-like'
export * from './view-job'
export * from './publish-job'
export * from './unpublish-job'
export * from './archive-job'

import { JobRole, JobStatus, JobType } from '.prisma/client'

export const JobRoleEnum = enumType({
  name: 'JobRole',
  members: Object.keys(JobRole),
})

export const JobStatusEnum = enumType({
  name: 'JobStatus',
  members: Object.keys(JobStatus),
})

export const JobTypeEnum = enumType({
  name: 'JobType',
  members: Object.keys(JobType),
})

export const Job = objectType({
  name: 'Job',
  definition(t) {
    t.id('id')
    t.date('createdAt')
    t.date('updatedAt')
    t.nullable.date('archivedAt')
    t.string('position')
    t.field('type', { type: 'JobType' })
    t.field('role', { type: 'JobRole' })
    t.json('description', {
      resolve(parent) {
        return parent.description as JsonObject
      },
    })
    t.string('applyUrl')
    t.boolean('remote')
    t.field('status', {
      type: 'JobStatus',
      authorize: (parent, _args, ctx) => ctx.auth.owner.job(parent.id),
    })
    t.int('viewCount')
    t.list.field('tags', {
      type: 'Tag',
      resolve: async (parent, _args, ctx) => {
        const tags = await ctx.prisma.job
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

        const liked = await ctx.prisma.userLikes.findUnique({
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
        const company = await ctx.prisma.job
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
