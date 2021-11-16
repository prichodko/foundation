import { SunIcon, MoonIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'

import { BaseButton } from '~/system/button'

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
      className="p-1 hover:bg-primary rounded text"
    >
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </BaseButton>
  )
}
