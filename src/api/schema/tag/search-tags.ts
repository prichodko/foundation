import { list, objectType, queryField, stringArg } from 'nexus'

export const TagSearch = objectType({
  name: 'TagSearch',
  definition(t) {
    t.id('id')
    t.string('name')
    t.int('count')
  },
})

export const SearchTags = queryField('searchTags', {
  type: list('TagSearch'),

  args: {
    name: stringArg(),
    not: list(stringArg()),
  },

  async resolve(_root, { name, not }, ctx) {
    const tags = await ctx.prisma.tag.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
        id: {
          notIn: not,
        },
      },
      include: {
        _count: {
          select: {
            jobs: true,
          },
        },
      },
      orderBy: {
        jobs: {
          _count: 'desc',
        },
      },
      take: 10,
    })

    return tags.map(tag => ({ ...tag, count: tag._count.jobs }))
  },
})
