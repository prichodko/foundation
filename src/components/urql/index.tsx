import { createClient, Provider } from 'urql'

const urqlClient = createClient({
  url: 'http://localhost:3000/api/graphql',
})

interface Props {
  children: React.ReactNode
}

export const UrqlProvider = (props: Props) => {
  const { children } = props

  return <Provider value={urqlClient}>{children}</Provider>
}
