import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export function getDate(date: string) {
  const dateTransform = dayjs(date).format('DD/MM/YYYY HH:mm')
  return dateTransform
}
