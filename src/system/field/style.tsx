import { Root as LabelPrimitive } from '@radix-ui/react-label'
import { styled } from 'stitches.config'

export const Wrapper = styled('div', {
  position: 'relative',
})

export const Label = styled(LabelPrimitive, {
  display: 'flex',
  fontSize: '$small',
  fontWeight: '$400',
  color: '$gray12',
  marginBottom: 2,
  userSelect: 'none',
})

export const Error = styled('span', {
  display: 'flex',
  fontSize: '$small',
  color: '$red11',
  marginTop: '$1',
  marginLeft: '$1',
})
