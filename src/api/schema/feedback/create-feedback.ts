import { mutationField, inputObjectType } from 'nexus'

import { slack } from '../../services/slack'

export const CreateFeedback = mutationField('createFeedback', {
  type: 'SuccessResult',

  args: {
    input: inputObjectType({
      name: 'CreateFeedbackInput',
      definition(t) {
        t.string('message')
        t.nullable.string('email')
      },
    }),
  },

  async resolve(_root, { input }, ctx) {
    await ctx.prisma.feedback.create({
      data: {
        message: input.message,
        email: ctx.user?.email ?? input.email,
        userId: ctx.user?.id,
      },
    })

    await slack.feedback(input.message)

    return {
      success: true,
    }
  },
})
