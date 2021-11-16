import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const middleware = (req: NextRequest) => {
  const basicAuth = req.headers.get('authorization')

  if (basicAuth) {
    const auth = basicAuth.split(' ')[1]
    const [user, pwd] = Buffer.from(auth, 'base64').toString().split(':')

    if (user === 'workverse' && pwd === '8ssfyapcYjbh6GoB7PZBNrN2N9X2kjLr3e') {
      return NextResponse.next()
    }
  }

  return new Response('Authentication Required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  })
}
