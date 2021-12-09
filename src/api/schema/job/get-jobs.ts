import type { Prisma } from '@prisma/client'
import { queryField, inputObjectType } from 'nexus'

// - (in the) Last day
// - Last 7 days
// - Last month
// - Last 3 months

// export const CreatedFiterEnum = enumType({
//   name: 'JobCreatedFilter',
//   members: ['Last'],
// })

export const GetJobs = queryField(t => {
  t.connectionField('jobs', {
    type: 'Job',
    additionalArgs: {
      filter: inputObjectType({
        name: 'JobsFilter',
        definition(t) {
          t.nullable.boolean('remote')
          t.nullable.list.id('tags')
          t.nullable.list.id('company')
          t.nullable.field('role', { type: 'JobRole' })
          t.nullable.string('position')
          t.nullable.int('salaryMin')
          t.nullable.int('salaryMax')
        },
      }),
    },
    disableBackwardPagination: true,
    resolve: async (_root, args, ctx) => {
      // Fetch one additional record to determine if there is a next page
      const take = args.first + 1

      // Convert `after` into prisma `cursor` & `skip`
      const cursor = args.after ? { id: args.after } : undefined
      const skip = cursor ? 1 : undefined

      const { filter } = args

      const where: Prisma.JobWhereInput[] = []

      if (filter.tags) {
        where.push({
          tags: {
            some: {
              id: {
                in: filter.tags,
              },
            },
          },
        })
      }

      if (filter.remote) {
        where.push({
          remote: true,
        })
      }

      if (filter.company) {
        where.push({
          user: {
            company: {
              id: {
                in: filter.company,
              },
            },
          },
        })
      }

      if (filter.role) {
        where.push({
          role: {
            in: [filter.role],
          },
        })
      }

      if (filter.position) {
        where.push({
          position: {
            contains: filter.position,
            mode: 'insensitive',
          },
        })
      }

      if (filter.salaryMin) {
        where.push({
          salaryMin: {
            gte: filter.salaryMin,
          },
        })
      }

      if (filter.salaryMax) {
        where.push({
          salaryMax: {
            gte: filter.salaryMax,
          },
        })
      }

      // Execute the underlying query operations
      const nodes = await ctx.prisma.job.findMany({
        take,
        cursor,
        skip,
        where: {
          status: 'Live',
          AND: where,
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
      // totalCount = await aggregate()

      // See if we are "after" another record, indicating a previous page
      const hasPreviousPage = !!args.after

      // See if we have an additional record, indicating a next page
      const hasNextPage = nodes.length > args.first

      // Remove the extra record (last element) from the results
      if (hasNextPage) {
        nodes.pop()
      }

      // The cursors are always the first & last elements of the result set
      const startCursor = nodes[0]?.id // jobs.length > 0 ? jobs[0].id : undefined
      const endCursor = nodes[nodes.length - 1]?.id //jobs.length > 0 ? jobs[jobs.length - 1].id : undefined

      return {
        edges: nodes.map(job => ({
          cursor: job.id,
          node: job,
        })),
        pageInfo: {
          hasNextPage,
          hasPreviousPage,
          startCursor,
          endCursor,
        },
      }
    },
  })
})

// AND: [
//   {
//     remote: input.query.remote,
//   },

//   // TODO: migrate to postgres
//   ...input.query.tags.map(tagId => ({
//     tags: {
//       some: {
//         id: tagId,
//       },
//     },
//   })),
// ],
