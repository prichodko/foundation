import type { ConfigType } from 'dayjs'
import dayjs from 'dayjs'
import RelativeTimePlugin from 'dayjs/plugin/relativeTime'

dayjs.extend(RelativeTimePlugin)

// dayjs().from(dayjs('1990-01-01')) // in 31 years
// dayjs().from(dayjs('1990-01-01'), true) // 31 years
// dayjs().fromNow()

// dayjs().to(dayjs('1990-01-01')) // "31 years ago"
// dayjs().toNow()

const relativeTime = (date: ConfigType) => {
  return dayjs(date).fromNow()
}

interface Props {
  children: ConfigType
}

export const RelativeTime = ({ children }: Props) => {
  return <>{relativeTime(children)}</>
}
