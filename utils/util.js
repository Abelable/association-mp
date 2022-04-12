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

const debounce = (fn, delay) => {
  let timer
  return () => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(fn, delay)
  }
}

const unique = arr => Array.from(new Set(arr))

module.exports = {
  formatTime,
  debounce,
  unique
}
