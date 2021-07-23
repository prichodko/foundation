import { NextPage } from 'next'

import { Link } from '~/components/link'
import { Button } from '~/system/buttons'
import { Form, SubmitHandler } from '~/system/forms'
import { TextInput } from '~/system/inputs/text-input'

interface FormValues {
  email: string
  password: string
}

export const GetStartedPage: NextPage = () => {
  const handleSubmit: SubmitHandler<FormValues> = async values => {
    console.log(values)
    return new Promise(resolve => setTimeout(resolve, 2000))
  }

  return (
    <div className="h-screen flex items-center">
      <div className="w-full max-w-sm mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">Create Account</h1>
        <div className="text-sm mb-6 text-center text-gray-700">
          Already have an account?{' '}
          <Link href="/login" className="underline">
            Log in
          </Link>
        </div>

        <Form<FormValues>
          values={{ email: '', password: '' }}
          onSubmit={handleSubmit}
        >
          <div className="grid gap-3 mb-6">
            <TextInput
              name="email"
              label="Email"
              placeholder="Email"
              autoComplete="username"
            />
            <TextInput
              name="password"
              label="Password"
              placeholder="Password"
              autoComplete="new-password"
            />
          </div>
          <Button type="submit" width="full">
            Sign In
          </Button>
        </Form>
        <div className="flex items-center mt-6 flex-col">
          <Link href="/" className="text-sm hover:underline">
            Forgot password?
          </Link>

          <div className="text-xs text-center mt-8 text-gray-500">
            This site is protected by reCAPTCHA and the Google{' '}
            <a className="underline" href="https://policies.google.com/privacy">
              Privacy Policy
            </a>{' '}
            and{' '}
            <a className="underline" href="https://policies.google.com/terms">
              Terms of Service
            </a>{' '}
            apply.
          </div>
        </div>
      </div>
    </div>
  )
}
