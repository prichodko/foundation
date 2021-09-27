import { useEffect } from 'react'

import tinykeys from 'tinykeys'

export const useKeyboardShortcuts = () => {
  useEffect(() => {
    const unsubscribe = tinykeys(window, {})
    return () => {
      unsubscribe()
    }
  }, [])
}
