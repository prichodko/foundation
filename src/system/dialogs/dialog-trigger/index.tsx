import { createContext, useCallback, useContext, useState } from 'react'

import { Root, Trigger } from '@radix-ui/react-dialog'

import { Overlay } from '../overlay'

interface Props {
  children: React.ReactElement
  dialog: React.ComponentType
}

const DialogContext = createContext<VoidFunction | undefined>(undefined)

const DialogTrigger = (props: Props) => {
  const { children, dialog: Component } = props

  const [open, setOpen] = useState(false)

  const close = useCallback(() => setOpen(false), [setOpen])

  return (
    <DialogContext.Provider value={close}>
      <Root open={open} onOpenChange={setOpen}>
        <Trigger asChild>{children}</Trigger>
        {open && (
          <>
            <Overlay />
            <Component />
          </>
        )}
      </Root>
    </DialogContext.Provider>
  )
}

const useDialogClose = () => {
  const context = useContext(DialogContext)
  if (context === undefined) {
    throw new Error('useDialogClose must be used within a DialogProvider')
  }
  return context
}

export { DialogTrigger, useDialogClose }
export type { Props as DialogTriggerProps }
