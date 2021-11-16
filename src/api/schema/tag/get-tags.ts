import { queryField, list, inputObjectType } from 'nexus'

export const GetTags = queryField('tags', {
  type: list('Tag'),
  args: {
    input: inputObjectType({
      name: 'GetTagsInput',
      definition(t) {
        t.string('query')
        t.list.string('notIn')
      },
    }),
  },
  async resolve(_root, { input }, ctx) {
    const tags = await ctx.db.tag.findMany({
      where: {
        name: {
          contains: input.query,
        },
        id: {
          notIn: input.notIn,
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
      take: 5,
    })

    return tags.map(tag => ({ ...tag, count: tag._count?.jobs ?? 0 }))
  },
})
