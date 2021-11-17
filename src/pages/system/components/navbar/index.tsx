import { Link } from '~/components/link'
import { Button } from '~/system/button'

import { ThemeSwitcher } from './components/theme-switcher'

interface Props {}

const Logo = () => {
  return <div className="font-mono ">workverse</div>
}

export const Navbar = ({}: Props) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-2 border-b backdrop-filter backdrop-blur">
      <ThemeSwitcher />
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>
      <div className="grid grid-flow-col gap-2">
        <Button href="/login" variant="minimal">
          Login
        </Button>
        <Button href="/dashboard/new">New Post</Button>
      </div>
    </div>
  )
}
