import { mutationField, idArg } from 'nexus'

export const UnpublishJob = mutationField('unpublishJob', {
  type: 'Job',
  args: {
    id: idArg(),
  },
  authorize: (_parent, args, ctx) => ctx.auth.owner.job(args.id),
  async resolve(_root, { id }, ctx) {
    const job = await ctx.prisma.job.update({
      where: {
        id,
      },
      data: {
        status: 'Draft',
      },
    })

    return job
  },
})
