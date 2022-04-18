import { Button } from '.'

// eslint-disable-next-line import/no-anonymous-default-export
export default { component: Button }
export const Primary = () => (
  <div
    style={{
      padding: 20,
      display: 'grid',
      gap: 12,
      alignItems: 'flex-start',
      justifyItems: 'flex-start',
    }}
  >
    <Button variant="default">Meow party!</Button>
    <Button variant="outline">Meow party!</Button>
    <Button variant="minimal">Meow party!</Button>
    <Button variant="danger">Meow party!</Button>
    <Button disabled>Meow party!</Button>
  </div>
)
