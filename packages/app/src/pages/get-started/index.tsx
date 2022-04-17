import { Button, Form, Heading, Text, TextInput } from '@example/system'
import { Link } from '@example/system/src/link'

import type { FormSubmitHandler } from '@example/system'
import type { Page } from 'next'

interface FormValues {
  email: string
  password: string
}

export const GetStartedPage: Page = () => {
  const handleSubmit: FormSubmitHandler<FormValues> = async values => {
    console.log(values)
    return new Promise(resolve => setTimeout(resolve, 2000))
  }

  return (
    <div className="flex h-screen items-center">
      <div className="mx-auto w-full max-w-sm">
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
          defaultValues={{ email: '', password: '' }}
        >
          <div className="mb-6 grid gap-3">
            <TextInput
              name="email"
              label="Email"
              placeholder="Email"
              autoComplete="username"
              rules={{ required: true }}
            />
            <TextInput
              name="password"
              label="Password"
              placeholder="Password"
              autoComplete="new-password"
              rules={{ required: true }}
            />
          </div>
          <Button type="submit" width="full">
            Sign Up
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
