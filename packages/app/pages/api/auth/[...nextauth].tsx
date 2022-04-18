import { env, prisma } from '@example/api'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import type { NextApiHandler } from 'next'

const handler: NextApiHandler = (req, res) => {
  return NextAuth(req, res, {
    adapter: PrismaAdapter(prisma),
    providers: [
      GoogleProvider({
        clientId: env.google.clientId,
        clientSecret: env.google.clientSecret,
      }),
      // {
      //   id: 'email',
      //   type: 'email',
      //   name: 'Email',
      //   sendVerificationRequest: async ({ identifier: email, url }) => {
      //     // TODO: Send verification email
      //   },
      //   server: {},
      //   options: {},
      // },
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
    secret: env.auth.secret,
    // debug: true,
  })
}

export default handler
