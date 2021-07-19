import { useId } from '@radix-ui/react-id'
import { useUpdateAtom } from 'jotai/utils'
import { useEffect, useState } from 'react'

import { dialogAtom } from '../dialog'

export const useDialogState = () => {
  const dialogId = useId()

  const [open, setOpen] = useState(true)
  const setDialog = useUpdateAtom(dialogAtom)

  useEffect(() => {
    if (!open) {
      setDialog(null)
    }
  }, [open, setDialog])

  return {
    id: dialogId,
    open,
    onOpenChange: setOpen,
    close: () => {
      setOpen(false)
    },
  }
}
