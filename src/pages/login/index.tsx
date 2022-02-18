import { useCallback, useState } from 'react'

import type { Page } from 'next'
import type { SignInResponse } from 'next-auth/react'
import { signIn } from 'next-auth/react'
import type { Describe } from 'superstruct'
import { object } from 'superstruct'

import { Link } from '~/components/link'
import { useCallbackUrl } from '~/hooks/use-callback-url'
import { useUrlQuery } from '~/hooks/use-url-query'
import { Button } from '~/system/button'
import type { FormSubmitHandler } from '~/system/form'
import { Form } from '~/system/form/form'
import { Heading } from '~/system/heading'
import { TextInput } from '~/system/input/text-input'
import { Text } from '~/system/text'
import { email, required } from '~/validation/structs'

interface FormValues {
  email: string
}

const schema: Describe<FormValues> = object({
  email: required(email()),
})

const useGoogleSignIn = (callbackUrl: string) => {
  const [loading, setLoading] = useState(false)

  const googleSignIn = useCallback(async () => {
    try {
      setLoading(true)
      await signIn('google', {
        redirect: false,
        callbackUrl,
      })
    } catch (error) {}
  }, [callbackUrl])

  return [googleSignIn, { loading }] as const
}

export const LoginPage: Page = () => {
  useUrlQuery('error')

  const callbackUrl = useCallbackUrl('/dashboard')

  const [googleSignIn, { loading }] = useGoogleSignIn(callbackUrl)

  // const googleSignIn = async () => {
  //   signIn('google', {
  //     redirect: false,
  //     callbackUrl,
  //   })
  // }

  const handleSubmit: FormSubmitHandler<FormValues> = async (
    values,
    { setError }
  ) => {
    const result: SignInResponse = (await signIn(
      'email',
      {
        redirect: false,
        email: values.email,
        callbackUrl,
      },
      { type: 'login' }
    ))!

    if (result.error) {
      setError('email', { message: 'Email does not exists' })
      return
    }

    return new Promise(resolve => setTimeout(resolve, 2000))
  }

  return (
    <div className="flex items-center pt-64">
      <div className="w-full max-w-sm mx-auto">
        <Heading align="center" size="32" className="mb-3">
          Welcome Back
        </Heading>
        <Text align="center" color="secondary" className="mb-10">
          {"Don't"} have an account?{' '}
          <Link href="/get-started" className="underline">
            Sign up for free
          </Link>
        </Text>

        <Form<FormValues>
          defaultValues={{ email: '' }}
          onSubmit={handleSubmit}
          schema={schema}
          mode="onSubmit"
        >
          <div className="grid gap-4">
            <Button width="full" onPress={googleSignIn} loading={loading}>
              Continue with Google
            </Button>
            <div className="flex items-center justify-center">
              <Text size={12}>or</Text>
            </div>
            <TextInput
              name="email"
              placeholder="Email"
              autoComplete="username"
            />
            <Button type="submit" width="full">
              Continue
            </Button>
          </div>
        </Form>

        <div className="flex flex-col items-center mt-6">
          <Text size="12" align="center" color="secondary" className="mt-8">
            This site is protected by reCAPTCHA and the Google{' '}
            <a className="underline" href="https://policies.google.com/privacy">
              Privacy Policy
            </a>{' '}
            and{' '}
            <a className="underline" href="https://policies.google.com/terms">
              Terms of Service
            </a>{' '}
            apply.
          </Text>
        </div>
      </div>
    </div>
  )
}
