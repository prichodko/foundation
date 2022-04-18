import Stripe from 'stripe'

import { env } from '../config/env'

export const stripe = new Stripe(env.stripe.secretKey, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2020-08-27',
})
