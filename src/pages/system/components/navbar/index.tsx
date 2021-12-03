import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import { Link } from '~/components/link'
import { Button } from '~/system/button'

import { FeedbackPopover } from './components/feedback-popover'
import { ThemeSwitcher } from './components/theme-switcher'

interface Props {}

const Logo = () => {
  return <div className="font-mono ">workverse</div>
}

export const Navbar = ({}: Props) => {
  const router = useRouter()
  const { status } = useSession()

  const handleLogout = async () => {
    await signOut({ redirect: false })
    await router.replace('/login')
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-2 backdrop-filter backdrop-blur">
      <div className="flex-1">
        <ThemeSwitcher />
      </div>
      <Link href="/">
        <a className="flex-2">
          <Logo />
        </a>
      </Link>
      <div className="flex-1 text-right">
        <div className="inline-grid grid-flow-col gap-2">
          <FeedbackPopover />
          {status === 'unauthenticated' && (
            <Button href="/login" variant="minimal">
              Login
            </Button>
          )}
          {status === 'authenticated' && (
            <>
              <Button variant="minimal" onPress={handleLogout}>
                Logout
              </Button>
              <Button href="/dashboard" variant="minimal">
                Dashboard
              </Button>
            </>
          )}
          <Button href="/dashboard/new">New Post</Button>
        </div>
      </div>
    </div>
  )
}
