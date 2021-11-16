import type { Page } from 'next'
// import { signIn, useSession, signOut } from 'next-auth/react'

import { Link } from '~/components/link'
import { Button } from '~/system/button'
import type { FormSubmitHandler } from '~/system/form'
import { Form } from '~/system/form/form'
import { Heading } from '~/system/heading'
import { TextInput } from '~/system/input/text-input'
import { Text } from '~/system/text'

interface FormValues {
  email: string
  password: string
}

export const LoginPage: Page = () => {
  // const { data: session } = useSession()

  const handleSubmit: FormSubmitHandler<FormValues> = async values => {
    console.log(values)
    return new Promise(resolve => setTimeout(resolve, 2000))
  }

  return (
    <div className="flex items-center min-h-screen">
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
          defaultValues={{ email: '', password: '' }}
          onSubmit={handleSubmit}
        >
          <div className="grid gap-4">
            <TextInput
              name="email"
              // label="Email"
              placeholder="Email"
              autoComplete="username"
              rules={{ required: true, validate: value => !!value.trim() }}
            />
            {/* <TextInput
              name="password"
              type="password"
              label="Password"
              placeholder="Password"
              autoComplete="current-password"
              rules={{ required: true }}
            /> */}
            <Button type="submit" width="full">
              Continue
            </Button>
          </div>
        </Form>

        <div className="flex flex-col items-center mt-6">
          {/* <Link href="/" className="hover:underline">
            Forgot password?
          </Link> */}
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
