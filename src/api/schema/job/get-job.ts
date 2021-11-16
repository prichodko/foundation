import { queryField, idArg } from 'nexus'

export const GetJob = queryField('job', {
  type: 'Job',
  args: {
    id: idArg(),
  },
  async resolve(_, { id }, ctx) {
    const job = await ctx.db.job.findUnique({
      where: {
        id,
      },
    })

    if (!job) {
      throw new Error(`Job with id '${id}' not found!`)
    }

    return job
  },
})
