import { stripe } from '../lib/stripe'

import type Stripe from 'stripe'

export const handleEvent = async (event: Stripe.Event) => {
  console.log(stripe)
}
