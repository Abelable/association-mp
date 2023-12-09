export const formatTime = timeStamp => {
  const timer = new Date(timeStamp * 1000)
  const year = timer.getFullYear()
  const month = timer.getMonth() + 1
  const day = timer.getDate()
  const hour = timer.getHours()
  const minute = timer.getMinutes()
  const second = timer.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

export const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

export const debounce = (fn, delay = 200) => {
  let timeout = null;
  return function () {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, arguments), delay);
  };
};

export const unique = arr => Array.from(new Set(arr))

export const isVoid = (value) =>
  value === undefined || value === null || value === "";
export const cleanObject = (object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    if (isVoid(result[key])) delete result[key];
  });
  return result;
};
