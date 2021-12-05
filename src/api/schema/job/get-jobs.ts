import type { Prisma } from '@prisma/client'
import { queryField, list, inputObjectType } from 'nexus'

// - (in the) Last day
// - Last 7 days
// - Last month
// - Last 3 months

// export const CreatedFiterEnum = enumType({
//   name: 'JobCreatedFilter',
//   members: ['Last'],
// })

export const GetJobs = queryField('jobs', {
  type: list('Job'),

  args: {
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

  async resolve(_, { filter }, ctx) {
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

    return await ctx.prisma.job.findMany({
      where: {
        status: 'Live',
        AND: where,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
  },
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
