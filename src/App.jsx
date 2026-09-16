import { useEffect, useState } from 'react'
import {
  getISOWeek,
  getDayOfYear,
  getGreeting,
  getDayProgress,
  getGmtLabel,
  formatDateFull,
  formatTime,
} from './timeUtils'
import { useWeather } from './useWeather'

const PROFILE = {
  nameZh: '李偉聖',
  nameEn: 'Andy Li',
  school: '國立中興大學 資訊工程學系 碩士在職專班',
  workplace: '精誠資訊股份有限公司',
  initials: 'AL',
}

const RADIUS = 130
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function App() {
  const [now, setNow] = useState(new Date())
  const [is24h, setIs24h] = useState(true)
  const [copyStatus, setCopyStatus] = useState('idle')
  const { weather, error: weatherError } = useWeather()

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const greeting = getGreeting(now)
  const dayProgress = getDayProgress(now)
  const week = getISOWeek(now)
  const dayOfYear = getDayOfYear(now)
  const gmt = getGmtLabel(now)
  const dateFull = formatDateFull(now)
  const { h, m, s, suffix } = formatTime(now, is24h)
  const unixTime = Math.floor(now.getTime() / 1000)

  const dashOffset = CIRCUMFERENCE * (1 - dayProgress)

  const handleCopyTime = async () => {
    const text = `${h}:${m}:${s}${suffix ? ' ' + suffix : ''}`
    try {
      await navigator.clipboard.writeText(text)
      setCopyStatus('success')
    } catch {
      setCopyStatus('failed')
    }
    setTimeout(() => setCopyStatus('idle'), 1500)
  }

  return (
    <div className="page">
      <div className="topbar">
        <div className="weather-chip">
          {weatherError ? (
            <span>天氣讀取失敗</span>
          ) : weather ? (
            <span>
              {weather.icon} {weather.temp}°C {weather.city}
            </span>
          ) : (
            <span>讀取天氣中…</span>
          )}
        </div>
      </div>

      <div className="card">
        <div className="header-row">
          <div className="avatar">{PROFILE.initials}</div>
          <div className="header-text">
            <span className="greeting-pill">{greeting}</span>
            <h1>{PROFILE.nameZh}</h1>
            <p className="subtitle">{PROFILE.school}</p>
          </div>
        </div>

        <div className="clock-wrap">
          <svg width="300" height="300" viewBox="0 0 300 300">
            <circle
              cx="150"
              cy="150"
              r={RADIUS}
              className="clock-track"
              fill="none"
              strokeWidth="6"
            />
            <circle
              cx="150"
              cy="150"
              r={RADIUS}
              className="clock-progress"
              fill="none"
              strokeWidth="6"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              transform="rotate(-90 150 150)"
            />
          </svg>
          <div className="clock-center">
            <div className="clock-digits">
              <span>{h}</span>
              <span className="colon">:</span>
              <span>{m}</span>
              <span className="colon">:</span>
              <span>{s}</span>
              {suffix && <span className="ampm">{suffix}</span>}
            </div>
            <div className="clock-labels">
              <span>HOURS</span>
              <span>MINUTES</span>
              <span>SECONDS</span>
            </div>
            <div className="unix-chip">UNIX: {unixTime}</div>
          </div>
        </div>

        <p className="date-full">{dateFull}</p>
        <div className="meta-row">
          <span className="meta-chip">Week {week}</span>
          <span className="meta-chip">Day {dayOfYear}</span>
          <span className="meta-chip">{gmt}</span>
        </div>

        <div className="action-row">
          <button className="action-btn" type="button">
            📁 Projects
          </button>
          <button className="action-btn" type="button">
            👤 About
          </button>
          <button className="action-btn" type="button">
            🔗 Connect
          </button>
        </div>

        <div className="info-section">
          <div className="info-item">
            <span className="info-label">中文姓名</span>
            <span className="info-value">{PROFILE.nameZh}</span>
          </div>
          <div className="info-item">
            <span className="info-label">英文姓名</span>
            <span className="info-value">{PROFILE.nameEn}</span>
          </div>
          <div className="info-item">
            <span className="info-label">學校/學系</span>
            <span className="info-value">{PROFILE.school}</span>
          </div>
          <div className="info-item">
            <span className="info-label">工作地點</span>
            <span className="info-value">{PROFILE.workplace}</span>
          </div>
        </div>

        <div className="footer-row">
          <div className="toggle-group">
            <button
              className={`toggle-btn ${is24h ? 'active' : ''}`}
              type="button"
              onClick={() => setIs24h(true)}
            >
              24H
            </button>
            <button
              className={`toggle-btn ${!is24h ? 'active' : ''}`}
              type="button"
              onClick={() => setIs24h(false)}
            >
              12H
            </button>
          </div>
          <button className="copy-btn" type="button" onClick={handleCopyTime}>
            {copyStatus === 'success'
              ? '已複製 ✓'
              : copyStatus === 'failed'
                ? '複製失敗 ✕'
                : '⧉ Copy Time'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
