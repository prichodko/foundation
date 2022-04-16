import { inputObjectType, mutationField, objectType } from 'nexus'

import { stripe } from '../../lib/stripe'

export const CreateCheckoutSession = mutationField('createCheckoutSession', {
  type: objectType({
    name: 'CreateCheckoutSessionResult',
    definition(t) {
      t.string('sessionUrl')
    },
  }),

  args: {
    input: inputObjectType({
      name: 'CreateCheckoutSessionInput',
      definition(t) {
        t.string('name')
        t.int('price')
      },
    }),
  },

  async resolve(_root, { input: _input }, ctx) {
    if (!ctx.user.stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: ctx.user.email,
        metadata: {},
      })

      ctx.user = await ctx.db.user.update({
        where: { id: ctx.user.id },
        data: {
          stripeCustomerId: customer.id,
        },
      })
    }

    const session = await stripe.checkout.sessions.create({
      customer: ctx.user.stripeCustomerId!,
      payment_method_types: ['card'],
      line_items: [
        {
          price: 'price_1JwEOPLSoNl99I43UXayHQYF',
          quantity: 5,
        },
      ],
      mode: 'subscription',
      success_url:
        'http://localhost:3000/dashboard?sessionId={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:3000/dashboard',
    })

    return { sessionUrl: session.url! }
  },
})
