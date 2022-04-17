import { Button } from '@example/system'

import { ThemeSwitcher } from './components/theme-switcher'

export const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between border-b px-4 py-2 backdrop-blur backdrop-filter">
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
