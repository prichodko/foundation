import { Heading } from '.'

// eslint-disable-next-line import/no-anonymous-default-export
export default { component: Heading }

export const Primary = () => (
  <>
    <Heading size="64">Meow party!</Heading>
    <Heading size="48">Meow party!</Heading>
    <Heading size="32">Meow party!</Heading>
    <Heading size="24">Meow party!</Heading>
  </>
)
