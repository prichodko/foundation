import { inputObjectType, mutationField, objectType } from 'nexus'

import { stripe } from '~/api/lib/stripe'
import { createCheckoutSessionSchema } from '~/validation/checkout-session'

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

  authorize: (_parent, _args, ctx) => ctx.auth.user,

  async resolve(_root, { input }, ctx) {
    createCheckoutSessionSchema.create(input)

    const user = ctx.user!

    if (!user.stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {},
      })

      ctx.user = await ctx.prisma.user.update({
        where: { id: user.id },
        data: {
          stripeCustomerId: customer.id,
        },
      })
    }

    const session = await stripe.checkout.sessions.create({
      customer: user.stripeCustomerId!,
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
