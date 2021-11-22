import Stripe from 'stripe'

// https://github.com/stripe/stripe-node#configuration
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2020-08-27',
})
