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

    resolve: async (_root, {}, ctx) => {
      if (!ctx.user.stripeCustomerId) {
        throw new UserInputError('User has no customer id')
      }

      const { url } = await stripe.billingPortal.sessions.create({
        customer: ctx.user.stripeCustomerId,
        return_url: `${'http://localhost:3000'}/dashboard`,
      })

      return {
        url,
      }
    },
  }
)
