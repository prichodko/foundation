import type { NextApiRequest } from 'next'
import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(req: NextApiRequest) {
  const session = await getToken({
    req,
    secret: process.env.SECRET!,
  })

  if (!session) {
    return NextResponse.redirect('/login')
  }

  return NextResponse.next()
}
