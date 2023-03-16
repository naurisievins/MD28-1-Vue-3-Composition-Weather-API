const getMonthNameAndDate = (date: string) => {
  const monthNumber = Number(date.slice(5, 7))
  const dateNumber = date.slice(8)

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  return `${months[monthNumber - 1]} ${dateNumber}`
}

export default getMonthNameAndDate
