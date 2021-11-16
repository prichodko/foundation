import { objectType } from 'nexus'

export * from './get-tags'
export * from './create-tag'

export const Tag = objectType({
  name: 'Tag',
  definition(t) {
    t.id('id')
    t.string('name')
    t.int('count', {
      async resolve(parent, _args, ctx) {
        if ('count' in parent) {
          // @ts-ignore
          return parent.count
        }

        const count = await ctx.db.tag.findUnique({
          where: {
            id: parent.id,
          },
          select: {
            _count: {
              select: { jobs: true },
            },
          },
          rejectOnNotFound: true,
        })

        return count._count?.jobs ?? 0
      },
    })
  },
})
