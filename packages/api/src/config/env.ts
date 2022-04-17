import { Env } from '@humanwhocodes/env'

const e = process.env.NEXUS_REFLECTION
  ? { require: () => '', get: () => '' }
  : new Env()

export const env = {
  databaseUrl: e.require('DATABASE_URL'), // prisma://aws-us-east-1.prisma-data.com/?api_key=mdge2mZh0cKUj4kDrgqgJ3fdMGn23z4qdrn_5J-MH6IWrr23jENewayyNfANKAzk

  auth: {
    secret: e.require('AUTH_SECRET'),
  },

  vercel: {
    env: e.get('VERCEL_ENV') as "production" | "preview" | 'development', // prettier-ignore
    url: e.get('VERCEL_URL'),
  },

  // https://dashboard.stripe.com/apikeys
  stripe: {
    publishableKey: e.require('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY'),
    secretKey: e.require('STRIPE_SECRET_KEY'),
    webhookSecret: e.require('STRIPE_WEBHOOK_SECRET'),
  },

  google: {
    clientId: e.require('GOOGLE_CLIENT_ID'),
    clientSecret: e.require('GOOGLE_CLIENT_SECRET'),
  },
}
