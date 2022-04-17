import { UserInputError } from 'apollo-server-errors'
import { mutationField, objectType } from 'nexus'

import { stripe } from '../../lib/stripe'

export const CreateBillingPortalSession = mutationField(
  'createBillingPortalSession',
  {
    type: objectType({
      name: 'CreateBillingPortalSessionResult',
      definition(t) {
        t.string('url')
      },
    }),

    authorize: (_parent, _args, ctx) => ctx.auth.user,

    resolve: async (_root, {}, ctx) => {
      const user = ctx.user!

      if (!user.stripeCustomerId) {
        throw new UserInputError('User has no customer id')
      }

      const { url } = await stripe.billingPortal.sessions.create({
        customer: user.stripeCustomerId,
        return_url: `${'http://localhost:3000'}/dashboard`,
      })

      return {
        url,
      }
    },
  }
)
