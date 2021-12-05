import { UserInputError } from 'apollo-server-errors'
import { mutationField, inputObjectType } from 'nexus'

import type { NexusGenInputs } from '~/api/types/nexus'

const validateFilter = (filter: NexusGenInputs['JobsFilter']) => {
  const values = Object.values(filter)

  if (values.length === 0) {
    throw new UserInputError('Filter cannot be empty', {
      type: 'invalid_filter',
    })
  }
}

export const CreateAlert = mutationField('createAlert', {
  type: 'Alert',

  args: {
    input: inputObjectType({
      name: 'CreateAlertInput',
      definition(t) {
        t.field('filter', {
          type: 'JobsFilter',
        })
      },
    }),
  },

  authorize: (_parent, _args, ctx) => ctx.auth.user,

  async resolve(_root, { input }, ctx) {
    validateFilter(input.filter)

    // sort keys to ensure where condition is always the same
    const filter: NexusGenInputs['JobsFilter'] = {
      company: input.filter.company,
      position: input.filter.position,
      remote: input.filter.remote,
      role: input.filter.role,
      salaryMax: input.filter.salaryMax,
      salaryMin: input.filter.salaryMin,
      tags: input.filter.tags,
    }

    const exists = await ctx.prisma.alert.findFirst({
      where: {
        userId: ctx.user!.id,
        filter: {
          equals: filter,
        },
      },
    })

    if (exists) {
      throw new UserInputError('Alert already exists', {
        type: 'alert_exists',
      })
    }

    const alert = await ctx.prisma.alert.create({
      data: {
        userId: ctx.user!.id,
        filter: filter,
      },
    })

    return alert
  },
})
