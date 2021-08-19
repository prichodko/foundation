import { useEffect } from 'react'

import { useUpdateAtom } from 'jotai/utils'
import tinykeys from 'tinykeys'

import { commandMenuAtom } from '~/system/command-menu'

export const useKeyboardShortcuts = () => {
  const setCommandMenu = useUpdateAtom(commandMenuAtom)

  useEffect(() => {
    const unsubscribe = tinykeys(window, {
      '$mod+K': () => {
        setCommandMenu(open => !open)
      },
    })
    return () => {
      unsubscribe()
    }
  }, [setCommandMenu])
}
