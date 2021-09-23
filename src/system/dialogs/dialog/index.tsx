import { Title } from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'

import { Button } from '~/system/buttons'
import { Icon } from '~/system/icon'
import { Text } from '~/system/text'

import { useDialogClose } from '../dialog-trigger'

import { Content, Header, Body, Footer, Close, Container } from './style'

interface Props {
  children: React.ReactNode
  title: string
  cancelLabel?: string
  actionLabel?: string
  onAction: (close: VoidFunction) => void
  onCancel?: () => void
}

const Dialog = (props: Props) => {
  const {
    children,
    title,
    actionLabel = 'Confirm',
    cancelLabel = 'Cancel',
    onAction,
  } = props

  const close = useDialogClose()

  const handleAction = () => {
    onAction(close)
  }

  return (
    <Content>
      <Container>
        <Header>
          <Text as={Title} weight="500" size="16">
            {title}
          </Text>
          <div className="flex items-center ml-3 h-7">
            <Close>
              <Icon label="Close">
                <Cross2Icon className="w-6 h-6" />
              </Icon>
            </Close>
          </div>
        </Header>
        <Body>
          <div className="border-2 border-dashed rounded-lg border-gray-7 h-96">
            {children}
          </div>
        </Body>
      </Container>
      <Footer>
        <Button onPress={close} variant="outline">
          {cancelLabel}
        </Button>
        <Button onPress={handleAction}>{actionLabel}</Button>
      </Footer>
    </Content>
  )
}

export { Dialog }
export type { Props as DialogProps }
