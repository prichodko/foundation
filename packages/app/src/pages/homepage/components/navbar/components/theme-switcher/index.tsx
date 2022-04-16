import { BaseButton } from '@example/system/src/button'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'

interface Props {}

export const ThemeSwitcher = ({}: Props) => {
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
      className="p-1 rounded hover:bg-primary text"
    >
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </BaseButton>
  )
}
