const convertMsToTime = (ms: number) => {
  const sunriseTimestamp = ms // Unix timestamp for sunrise time
  const sunriseDate = new Date(sunriseTimestamp * 1000) // Create a new Date object from the timestamp
  const timezoneOffsetInMinutes = sunriseDate.getTimezoneOffset() // Get the timezone offset in minutes
  const timezoneOffsetInMilliseconds = timezoneOffsetInMinutes * 60 * 1000 // Convert the offset to milliseconds

  // Convert the timestamp to your local time by adding the timezone offset
  const sunriseLocalDate = new Date(sunriseTimestamp * 1000 - timezoneOffsetInMilliseconds)
    .toISOString()
    .slice(11, 19)
  return sunriseLocalDate
}

export default convertMsToTime
