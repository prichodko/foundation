import { Button } from '~/system/buttons'

import { ThemeSwitcher } from './components/theme-switcher'

interface Props {}

export const Navbar = ({}: Props) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-2 border-b backdrop-filter backdrop-blur">
      <ThemeSwitcher />
      <div className="grid grid-flow-col gap-2">
        <Button href="/login" variant="minimal">
          Sign In
        </Button>
        <Button href="/get-started">Start for Free</Button>
      </div>
    </div>
  )
}
