import { queryField, list, inputObjectType } from 'nexus'

export const GetJobs = queryField('jobs', {
  type: list('Job'),
  args: {
    input: inputObjectType({
      name: 'GetJobsInput',
      definition(t) {
        t.field('query', {
          type: inputObjectType({
            name: 'GetJobsInputQuery',
            definition(t) {
              t.boolean('remote')
              t.list.id('tags')
            },
          }),
        })
      },
    }),
  },
  async resolve(_, { input }, ctx) {
    // console.log(input.query.tags)

    return await ctx.db.job.findMany({
      where: {
        AND: [
          {
            remote: input.query.remote,
          },

          // TODO: migrate to postgres
          ...input.query.tags.map(tagId => ({
            tags: {
              some: {
                id: tagId,
              },
            },
          })),
        ],
      },
    })
  },
})
