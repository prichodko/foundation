import { Root } from '@radix-ui/react-alert-dialog'
import { useRef, useState } from 'react'

import { Button } from '~/system/buttons'

import { useDialog } from '../dialog'
import { useDialogState } from '../hooks/use-dialog-state'
import { Overlay } from '../overlay'
import { Content, Container, Footer, Title, Description } from './style'

export const useAlertDialog = (props: Props) => {
  const dialog = useDialog(AlertDialog)

  const open = (override?: Partial<Props>) => {
    dialog.open({ ...props, ...override })
  }

  return {
    ...dialog,
    open,
  }
}

interface Props {
  title: string
  description: string
  cancelLabel?: string
  actionLabel?: string
  action: () => void | Promise<void>
  onCancel?: () => void
  variant?: 'danger'
}

const AlertDialog = (props: Props) => {
  const {
    title,
    description,
    cancelLabel = 'Cancel',
    actionLabel = 'Confirm',
    onCancel,
    action,
    variant,
  } = props

  const state = useDialogState()

  const [loading, setLoading] = useState(false)
  const cancelRef = useRef<HTMLButtonElement>(null)

  const handleCancel = () => {
    state.close()
    onCancel?.()
  }

  const handleAction = async () => {
    try {
      setLoading(true)
      await action()
      state.close()
    } catch (error) {
      setLoading(false)
    }
  }

  const handleOpenAutoFocus = (event: Event) => {
    event.preventDefault()
    cancelRef.current?.focus()
  }

  return (
    <Root {...state}>
      <Overlay />
      <Content onOpenAutoFocus={handleOpenAutoFocus}>
        <Container>
          <Title className="text-lg font-medium">{title}</Title>
          <Description className="text-sm">{description}</Description>
        </Container>
        <Footer>
          <Button
            ref={cancelRef}
            onPress={handleCancel}
            variant="outline"
            disabled={loading}
          >
            {cancelLabel}
          </Button>
          <Button variant={variant} onPress={handleAction} loading={loading}>
            {actionLabel}
          </Button>
        </Footer>
      </Content>
    </Root>
  )
}

export { AlertDialog }
export type { Props as AlertDialogProps }
