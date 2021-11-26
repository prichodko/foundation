import { PrismaAdapter } from '@next-auth/prisma-adapter'
import type { NextApiHandler } from 'next'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import { prisma } from '~/api/lib/prisma'

const handler: NextApiHandler = (req, res) => {
  return NextAuth(req, res, {
    adapter: PrismaAdapter(prisma),
    providers: [
      {
        id: 'email',
        type: 'email',
        name: 'Email',
        sendVerificationRequest: async ({ identifier: email, url }) => {
          // const { host } = new URL(url)

          console.log(`Verification for ${email}`, url)

          // await postmark.sendEmail({
          //   From: 'pavel@workverse.xyz',
          //   To: 'pavel@workverse.xyz',
          //   Subject: `Sign in to ${host}`,
          //   HtmlBody: html({ url, host, email }),
          //   TextBody: text({ url, host }),
          //   MessageStream: 'outbound',
          // })
        },
        server: {},
        options: {},
      },
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
    ],

    callbacks: {
      async signIn(options) {
        const { user, email } = options

        if (email?.verificationRequest) {
          const type = req.query.type as 'login' | 'signup'

          const existingUser = await prisma.user.findFirst({
            where: {
              id: user.id,
            },
          })

          if (type === 'login' && !existingUser) {
            throw new Error('User not found')
          }

          if (type === 'signup' && existingUser) {
            throw new Error('User already exists')
          }
        }

        return true
      },
    },

    pages: {
      signIn: '/login',
      //   signOut: '/',
      error: '/login', // Error code passed in query string as ?error=
      verifyRequest: '/verify', // (used for check email message)
      newUser: '/dashboard', // New users will be directed here on first sign in (leave the property out if not of interest)
    },

    session: {
      strategy: 'jwt',
    },
    jwt: {
      // A secret to use for key generation - you should set this explicitly
      // Defaults to NextAuth.js secret if not explicitly specified.
      // This is used to generate the actual signingKey and produces a warning
      // message if not defined explicitly.
      // secret: process.env.SECRET,
    },
    secret: process.env.SECRET,
    // debug: true,
  })
}

export default handler
