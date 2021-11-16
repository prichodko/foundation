import { PrismaAdapter } from '@next-auth/prisma-adapter'
import NextAuth from 'next-auth'
// import EmailProvider from 'next-auth/providers/email'
import GitHubProvider from 'next-auth/providers/github'

import { prisma } from '~/api/lib/prisma'

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: 'Foundation <no-reply@example.com>',
    // }),
  ],

  callbacks: {},

  pages: {
    //   signIn: '/login',
    //   signOut: '/',
    //   error: '/login', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user', // New users will be directed here on first sign in (leave the property out if not of interest)
  },

  session: {
    jwt: true,
  },
  jwt: {
    // A secret to use for key generation - you should set this explicitly
    // Defaults to NextAuth.js secret if not explicitly specified.
    // This is used to generate the actual signingKey and produces a warning
    // message if not defined explicitly.
    secret: process.env.SECRET,
  },
})
