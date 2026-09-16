export function pad2(n) {
  return String(n).padStart(2, '0')
}

// ISO 8601 week number (週一為一週開始，跨年首週以「該週含週四」判定)
export function getISOWeek(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7)
}

export function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 1)
  const diff = date - start
  return Math.floor(diff / 86400000) + 1
}

export function getGreeting(date) {
  const h = date.getHours()
  if (h >= 5 && h < 12) return '早安'
  if (h >= 12 && h < 14) return '午安'
  if (h >= 14 && h < 18) return '下午好'
  return '晚安'
}

export function getDayProgress(date) {
  const secondsSinceMidnight = date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds()
  return secondsSinceMidnight / 86400
}

export function getGmtLabel(date) {
  const offsetMin = -date.getTimezoneOffset()
  const sign = offsetMin >= 0 ? '+' : '-'
  const hours = Math.floor(Math.abs(offsetMin) / 60)
  return `GMT${sign}${hours}`
}

export function formatDateFull(date) {
  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  })
}

export function formatTime(date, is24h) {
  let h = date.getHours()
  const m = pad2(date.getMinutes())
  const s = pad2(date.getSeconds())
  if (is24h) {
    return { h: pad2(h), m, s, suffix: '' }
  }
  const suffix = h >= 12 ? 'PM' : 'AM'
  h = h % 12
  if (h === 0) h = 12
  return { h: pad2(h), m, s, suffix }
}
