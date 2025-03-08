export const formateHoursToISODate = (date: string, time: string): string => {
  const dateObject = new Date(date)
  const [hours, minutes] = time.split(':')
  dateObject.setHours(Number.parseInt(hours, 10), Number.parseInt(minutes, 10))
  return new Date(
    dateObject.getTime() - dateObject.getTimezoneOffset() * 60000
  ).toISOString()
}
