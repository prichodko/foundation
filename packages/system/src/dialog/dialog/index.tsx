import { Title } from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'

import { Button } from '../../button'
import { Icon } from '../../icon'
import { Text } from '../../text'
import { useDialogClose } from '../dialog-trigger'
import { Body, Close, Container, Content, Footer, Header } from './style'

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
          <div className="ml-3 flex h-7 items-center">
            <Close>
              <Icon label="Close">
                <Cross2Icon className="h-6 w-6" />
              </Icon>
            </Close>
          </div>
        </Header>
        <Body>
          <div className="border-gray-7 h-96 rounded-lg border-2 border-dashed">
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
