const formatTime = timeStamp => {
  const timer = new Date(timeStamp * 1000)
  const year = timer.getFullYear()
  const month = timer.getMonth() + 1
  const day = timer.getDate()
  const hour = timer.getHours()
  const minute = timer.getMinutes()
  const second = timer.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

module.exports = {
  formatTime
}
