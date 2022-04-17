import { BaseButton } from '@example/system/src/button'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()

  const handlePress = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  return (
    <BaseButton
      onPress={handlePress}
      className="hover:bg-primary text rounded p-1"
    >
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </BaseButton>
  )
}
