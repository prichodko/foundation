import { Error, Label, Wrapper } from './style'

interface Props {
  label?: string
  error?: string
}

interface InnerProps extends Props {
  htmlFor: string
  children: React.ReactNode
}

const Field = (props: InnerProps) => {
  const { htmlFor, children, label, error } = props

  return (
    <Wrapper>
      {label && <Label htmlFor={htmlFor}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </Wrapper>
  )
}

export { Field }
export type { Props as FieldProps }
