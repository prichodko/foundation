import type { Page } from 'next'
import type { SignInResponse } from 'next-auth/react'
import { signIn } from 'next-auth/react'

import { Link } from '~/components/link'
import { Button } from '~/system/button'
import type { FormSubmitHandler } from '~/system/form'
import { Form } from '~/system/form'
import { Heading } from '~/system/heading'
import { TextInput } from '~/system/input/text-input'
import { Text } from '~/system/text'

interface FormValues {
  email: string
}

export const GetStartedPage: Page = () => {
  const handleGoogleSignIn = () => {
    signIn('google', {
      redirect: false,
      callbackUrl: 'http://localhost:3000/dashboard',
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
        callbackUrl: 'http://localhost:3000/dashboard',
      },
      { type: 'signup' }
    ))!

    if (result.error) {
      setError('email', { message: 'Email already exists' })
      return
    }
  }

  return (
    <div className="flex items-center pt-64">
      <div className="w-full max-w-sm mx-auto">
        <Heading align="center" size="32" className="mb-3">
          Create Account
        </Heading>
        <Text align="center" color="secondary" className="mb-6">
          Already have an account?{' '}
          <Link href="/login" className="underline">
            Log in
          </Link>
        </Text>

        <Form<FormValues>
          onSubmit={handleSubmit}
          defaultValues={{ email: '' }}
          className="grid gap-4"
        >
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
            rules={{ required: true }}
          />
          <Button type="submit" width="full">
            Continue
          </Button>
        </Form>
        <div className="flex flex-col items-center">
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
