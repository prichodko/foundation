import Stripe from 'stripe'

import { env } from '../config/env'

// https://github.com/stripe/stripe-node#configuration
export const stripe = new Stripe(env.stripe.secretKey, {
  apiVersion: '2020-08-27',
})
