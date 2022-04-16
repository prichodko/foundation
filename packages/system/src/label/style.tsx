import { Label } from '@radix-ui/react-label'

import { styled } from '../config'

export const Root = styled(Label, {
  display: 'inline-flex',
  alignItems: 'center',
  cursor: 'default',
  userSelect: 'none',
  whiteSpace: 'nowrap',
})
