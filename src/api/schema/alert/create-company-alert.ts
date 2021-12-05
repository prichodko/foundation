import { UserInputError } from 'apollo-server-errors'
import { mutationField } from 'nexus'

import type { JobsFilter } from '~/types/graphql'

export const CreateCompanyAlert = mutationField('createCompanyAlert', {
  type: 'Alert',

  args: {
    companyId: 'String',
  },

  authorize: (_parent, _args, ctx) => ctx.auth.user,

  async resolve(_root, { companyId }, ctx) {
    const company = ctx.prisma.company.findFirst({
      where: {
        id: companyId,
      },
    })

    if (!company) {
      throw new UserInputError('Company not found', {
        type: 'not_found',
      })
    }

    const filter: JobsFilter = {
      company: [companyId],
    }

    const alert = await ctx.prisma.alert.create({
      data: {
        userId: ctx.user!.id,
        filter,
      },
    })

    return alert
  },
})
