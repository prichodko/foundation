import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

import { stripe } from '~/api/lib/stripe'

export const config = {
  api: {
    bodyParser: false,
  },
}

async function buffer(readable: NextApiRequest) {
  const chunks = []
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks)
}

// const relevantEvents = new Set([
//   'product.created',
//   'product.updated',
//   'price.created',
//   'price.updated',
//   'checkout.session.completed',
//   'customer.subscription.created',
//   'customer.subscription.updated',
//   'customer.subscription.deleted',
// ])

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const buf = await buffer(req)
    const sig = req.headers['stripe-signature'] as string
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret)
    } catch (err: unknown) {
      if (err instanceof Stripe.StripeSignatureVerificationError) {
        console.log(`❌ Error message: ${err.message}`)
      }
      return res.status(400).send(`Webhook Error: ${(err as any).message}`)
    }

    try {
      switch (event.type) {
        case 'checkout.session.completed': {
          const session = event.data.object as Stripe.Checkout.Session
          console.log(session)
          // session.mode==='payment'
        }
      }
    } catch (error) {}

    // switch (event.type) {
    //   case 'checkout.session.completed':
    //     const session = event.data.object;
    //     // Then define and call a function to handle the event checkout.session.completed
    //     break;
    // case 'checkout.session.expired':
    //   const session = event.data.object;
    // break
    //   case 'customer.subscription.created':
    //     const subscription = event.data.object;
    //     // Then define and call a function to handle the event customer.subscription.created
    //     break;
    //   case 'customer.subscription.deleted':
    //     const subscription = event.data.object;
    //     // Then define and call a function to handle the event customer.subscription.deleted
    //     break;
    //   case 'customer.subscription.updated':
    //     const subscription = event.data.object;
    //     // Then define and call a function to handle the event customer.subscription.updated
    //     break;
    //   // ... handle other event types
    //   default:
    //     console.log(`Unhandled event type ${event.type}`);
    // }

    // if (relevantEvents.has(event.type)) {
    // try {
    //   switch (event.type) {
    //     case 'product.created':
    //     case 'product.updated':
    //       await upsertProductRecord(event.data.object)
    //       break
    //     case 'price.created':
    //     case 'price.updated':
    //       await upsertPriceRecord(event.data.object)
    //       break
    //     case 'customer.subscription.created':
    //     case 'customer.subscription.updated':
    //     case 'customer.subscription.deleted':
    //       await manageSubscriptionStatusChange(
    //         event.data.object.id,
    //         event.data.object.customer,
    //         event.type === 'customer.subscription.created'
    //       )
    //       break
    //     case 'checkout.session.completed':
    //       const checkoutSession = event.data.object
    //       if (checkoutSession.mode === 'subscription') {
    //         const subscriptionId = checkoutSession.subscription
    //         await manageSubscriptionStatusChange(
    //           subscriptionId,
    //           checkoutSession.customer,
    //           true
    //         )
    //       }
    //       break
    //     default:
    //       throw new Error('Unhandled relevant event!')
    //   }
    // } catch (error) {
    //   console.log(error)
    //   return res
    //     .status(400)
    //     .send('Webhook error: "Webhook handler failed. View logs."')
    // }
    // }

    res.json({ success: true })
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
