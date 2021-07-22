import { cloneElement, ReactElement } from 'react'

import { Wrapper, Label, Error } from './style'

interface Props {
  label: string
  error?: string
}

interface InnerProps extends Props {
  id: string
  children: ReactElement
  showLabel?: boolean
}

const Field = (props: InnerProps) => {
  const { id, children, label, showLabel = false, error } = props

  const errorId = `${id}-error`

  return (
    <Wrapper>
      {showLabel && <Label htmlFor={id}>{label}</Label>}
      {cloneElement(children, {
        'aria-label': showLabel ? undefined : label,
        'aria-errormessage': error ? errorId : undefined,
      })}
      {error && <Error id={errorId}>{error}</Error>}
    </Wrapper>
  )
}

export { Field }
export type { Props as FieldProps }
