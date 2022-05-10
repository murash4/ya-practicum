import moment from 'moment'

export const orderDate = (orderDate: string) => {
  const date = moment(orderDate)
  const dateNum = date.format('DD-MM-YYYY')
  const dateStr = moment().format('DD-MM-YYYY') === dateNum ? 'Сегодня' : dateNum
  const time = date.format('HH:MM')

  return `${dateStr}, ${time}, i-GMT+3`
}
