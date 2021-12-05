import { FeedbackReaction } from '@prisma/client'
import { mutationField, inputObjectType, enumType } from 'nexus'

import { slack } from '~/api/services/slack'
import { createFeedbackSchema } from '~/validation/feedback'

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
    const data = createFeedbackSchema.create(input)

    await ctx.prisma.feedback.create({
      data: {
        message: data.message,
        reaction: data.reaction,
        email: ctx.user?.email ?? data.email,
        userId: ctx.user?.id,
      },
    })

    await slack.feedback(data.message)

    return {
      success: true,
    }
  },
})
