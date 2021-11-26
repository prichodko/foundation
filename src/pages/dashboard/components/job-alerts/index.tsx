import type { UserQuery } from '../../graphql/user'

interface Props {
  alerts: UserQuery['user']['alerts']
}

export const JobAlerts = (props: Props) => {
  const { alerts } = props

  return (
    <div>
      {alerts.map(alert => (
        <div key={alert.id}>
          <pre>{JSON.stringify(alert.filter, null, 2)}</pre>
        </div>
      ))}
    </div>
  )
}
