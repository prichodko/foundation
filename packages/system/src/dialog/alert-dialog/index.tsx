import { useRef, useState } from 'react'

import { Description, Title } from '@radix-ui/react-alert-dialog'

import { Button } from '../../button'
import { Text } from '../../text'
import { DialogTrigger, useDialogClose } from '../dialog-trigger'
import { Container, Content, Footer } from './style'

interface Props {
  title: string
  description: string
  actionLabel?: string
  cancelLabel?: string
  onAction: () => void | Promise<void>
  onCancel?: () => void
  variant?: 'danger'
}

const AlertDialog = (props: Props) => {
  const {
    title,
    description,
    cancelLabel = 'Cancel',
    actionLabel = 'Confirm',
    onAction,
    onCancel,
    variant,
  } = props

  const close = useDialogClose()

  const [loading, setLoading] = useState(false)
  const cancelRef = useRef<HTMLButtonElement>(null)

  const handleOpenAutoFocus = (event: Event) => {
    event.preventDefault()
    cancelRef.current?.focus()
  }

  const handleCancel = () => {
    close()
    onCancel?.()
  }

  const handleAction = async () => {
    try {
      setLoading(true)
      await onAction()
      setLoading(false)
      close()
    } catch (error) {}
  }

  return (
    <Content onOpenAutoFocus={handleOpenAutoFocus}>
      <Container>
        <Text as={Title} align="center" size="16" weight="500" className="mb-3">
          {title}
        </Text>
        <Text as={Description} align="center" color="secondary">
          {description}
        </Text>
      </Container>
      <Footer>
        <Button
          ref={cancelRef}
          onClick={handleCancel}
          variant="outline"
          disabled={loading}
        >
          {cancelLabel}
        </Button>
        <Button variant={variant} onClick={handleAction} loading={loading}>
          {actionLabel}
        </Button>
      </Footer>
    </Content>
  )
}

interface AlertDialogTriggerProps extends Props {
  children: React.ReactElement
}

const AlertDialogTrigger = (props: AlertDialogTriggerProps) => {
  const { children, ...alertDialogProps } = props

  return (
    <DialogTrigger dialog={() => <AlertDialog {...alertDialogProps} />}>
      {children}
    </DialogTrigger>
  )
}

export { AlertDialogTrigger }
export type { Props as AlertDialogProps }
