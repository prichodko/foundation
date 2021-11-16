import { useEffect } from 'react'

import tinykeys from 'tinykeys'

export const useKeyboardShortcuts = () => {
  useEffect(() => {
    const unsubscribe = tinykeys(window, {
      '$mod+/': event => {
        console.log('here', document.getElementById('search'))
        event.preventDefault()

        document.getElementById('search')?.focus()
      },
    })
    return () => {
      unsubscribe()
    }
  }, [])
}
