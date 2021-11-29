import { Button } from '~/system/button'

import type { UserQuery } from '../../graphql/user'
import { useRemoveAlertMutation } from '../job-alerts/graphql/remove-alert'

interface Props {
  alerts: UserQuery['user']['alerts']
}

export const JobAlerts = (props: Props) => {
  const { alerts } = props

  const [, removeAlert] = useRemoveAlertMutation()

  const handleRemove = async (id: string) => {
    await removeAlert({
      id,
    })
  }

  return (
    <div>
      {alerts.map(alert => (
        <div key={alert.id} className="flex justify-between">
          <pre>{JSON.stringify(alert.filter, null, 2)}</pre>
          <div>
            {/* <Button
              href={{
                pathname: '/',
                query: { filter: JSON.stringify(alert.filter) },
              }}
            >
              Show
            </Button> */}
            <Button onPress={() => handleRemove(alert.id)}>Remove</Button>
          </div>
        </div>
      ))}
    </div>
  )
}
