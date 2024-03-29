import { ForbiddenError } from 'apollo-server-errors'
import { idArg, objectType, queryField } from 'nexus'

import { stripe } from '../../lib/stripe'

export const CheckoutSession = queryField('checkoutSession', {
  type: objectType({
    name: 'CheckoutSessionResult',
    definition(t) {
      t.string('id')
      t.int('amount')
    },
  }),

  args: {
    id: idArg(),
  },

  authorize: (_parent, _args, ctx) => ctx.auth.user,

  resolve: async (_root, { id }, ctx) => {
    const session = await stripe.checkout.sessions.retrieve(id)

    if (session.customer !== ctx.user!.stripeCustomerId) {
      throw new ForbiddenError('Not Authorized')
    }

    return {
      id: session.id,
      amount: session.amount_total!,
    }
  },
})
