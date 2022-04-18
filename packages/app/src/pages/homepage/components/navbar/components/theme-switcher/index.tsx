import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()

  const handleClick = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  return (
    <button onClick={handleClick} className="hover:bg-primary text rounded p-1">
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </button>
  )
}
