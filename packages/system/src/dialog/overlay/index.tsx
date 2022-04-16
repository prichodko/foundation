import { DialogOverlay } from '@radix-ui/react-dialog'

import { styled } from '../../config'

export const Overlay = styled(DialogOverlay, {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  backgroundColor: 'rgba(0, 0, 0, .35)',
})
