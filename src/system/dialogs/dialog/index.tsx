import { AccessibleIcon } from '@radix-ui/react-accessible-icon'
import { Root } from '@radix-ui/react-dialog'
import type { DialogContentOwnProps } from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import { useId } from '@radix-ui/react-id'
import { atom, useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'
import { ComponentType, ReactNode } from 'react'

import { Button } from '~/system/buttons'

import { useDialogState } from '../hooks/use-dialog-state'
import { Overlay } from '../overlay'
import { Content, Header, Body, Footer, Close, Container, Title } from './style'

export const dialogAtom = atom<JSX.Element | null>(null)

export const useDialog = <Props extends {}>(
  Component: ComponentType<Props>,
  intitialProps?: Props
) => {
  const dialogId = useId()
  const [dialog, setDialog] = useAtom(dialogAtom)

  const open = (props: Props) => {
    setDialog(<Component {...intitialProps} {...props} />)
  }

  const buttonProps = {
    'aria-haspopup': 'dialog',
    'aria-expanded': !!dialog,
    'aria-controls': dialog ? dialogId : null,
    // onPress: () => open(props),
  }

  return {
    buttonProps,
    open,
  }
}

interface Props extends DialogContentOwnProps {
  children: ReactNode
  title: string
  cancelLabel?: string
  actionLabel?: string
  onAction: () => void
  onCancel?: () => void
}

const Dialog = (props: Props) => {
  const {
    children,
    title,
    cancelLabel = 'Cancel',
    actionLabel = 'Confirm',
    onAction,
    onCancel,
    ...contentProps
  } = props

  const state = useDialogState()

  return (
    <Root {...state}>
      <Overlay />
      <Content {...contentProps}>
        <Container>
          <Header>
            <Title>{title}</Title>
            <div className="ml-3 h-7 flex items-center">
              <Close>
                <AccessibleIcon label="Close">
                  <Cross2Icon className="h-6 w-6" />
                </AccessibleIcon>
              </Close>
            </div>
          </Header>
          <Body>
            <div className="border-2 border-dashed border-gray-7 rounded-lg h-96">
              {children}
            </div>
          </Body>
        </Container>
        <Footer>
          <Button onPress={() => state.close()} variant="outline">
            {cancelLabel}
          </Button>
          <Button onPress={onAction}>{actionLabel}</Button>
        </Footer>
      </Content>
    </Root>
  )
}

const DialogProvider = () => {
  return useAtomValue(dialogAtom)
}

export { DialogProvider, Dialog }
export type { Props as DialogProps }
