import type { Page } from 'next'
import type { SignInResponse } from 'next-auth/react'
import { signIn } from 'next-auth/react'

import { Link } from '~/components/link'
import { useUrlQuery } from '~/hooks/use-url-query'
import { Button } from '~/system/button'
import type { FormSubmitHandler } from '~/system/form'
import { Form } from '~/system/form/form'
import { Heading } from '~/system/heading'
import { TextInput } from '~/system/input/text-input'
import { Text } from '~/system/text'

interface FormValues {
  email: string
}

export const LoginPage: Page = () => {
  useUrlQuery('error')
  const callbackUrl =
    useUrlQuery('callbackUrl') ?? 'http://localhost:3000/dashboard'

  const handleGoogleSignIn = async () => {
    signIn('google', {
      redirect: false,
      callbackUrl,
    })
  }

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

        <Form<FormValues> defaultValues={{ email: '' }} onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <Button width="full" onPress={handleGoogleSignIn}>
              Continue with Google
            </Button>
            <div className="flex items-center justify-center">
              <Text size={12}>or</Text>
            </div>
            <TextInput
              name="email"
              placeholder="Email"
              autoComplete="username"
              rules={{ required: true, validate: value => !!value.trim() }}
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
