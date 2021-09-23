import * as Popover from '@radix-ui/react-popover'

import { styled, theme } from '~/styles/config'

export const Content = styled(Popover.Content, {
  background: theme.colors.gray2,
  border: `1px solid ${theme.colors.border}`,
  padding: 5,
  minWidth: 130,
  borderRadius: theme.radii.overlay,
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
})
