import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export const extractTime = (dateString: string): string => {
  return dayjs.utc(dateString).format('HH:mm')
}
