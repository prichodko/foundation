import { FeedbackReaction } from '@prisma/client'
import { mutationField, inputObjectType, enumType } from 'nexus'

import { slack } from '../../services/slack'

export const FeedbackReactionEnum = enumType({
  name: 'FeedbackReaction',
  members: Object.keys(FeedbackReaction),
})

export const CreateFeedback = mutationField('createFeedback', {
  type: 'SuccessResult',

  args: {
    input: inputObjectType({
      name: 'CreateFeedbackInput',
      definition(t) {
        t.string('message')
        t.field('reaction', {
          type: 'FeedbackReaction',
        })
        t.nullable.string('email')
      },
    }),
  },

  async resolve(_root, { input }, ctx) {
    await ctx.prisma.feedback.create({
      data: {
        message: input.message,
        reaction: input.reaction,
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
