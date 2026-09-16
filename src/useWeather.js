import { useEffect, useState } from 'react'

const TAICHUNG = { lat: 24.1477, lon: 120.6736, name: 'Taichung' }

const WEATHER_ICONS = {
  0: '☀️',
  1: '🌤️',
  2: '⛅',
  3: '☁️',
  45: '🌫️',
  48: '🌫️',
  51: '🌦️',
  61: '🌧️',
  63: '🌧️',
  65: '🌧️',
  71: '🌨️',
  80: '🌦️',
  95: '⛈️',
}

function iconFor(code) {
  return WEATHER_ICONS[code] ?? '🌡️'
}

export function useWeather() {
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${TAICHUNG.lat}&longitude=${TAICHUNG.lon}&current=temperature_2m,weather_code&timezone=Asia%2FTaipei`

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('weather fetch failed')
        return res.json()
      })
      .then((data) => {
        if (cancelled) return
        setWeather({
          temp: Math.round(data.current.temperature_2m),
          icon: iconFor(data.current.weather_code),
          city: TAICHUNG.name,
        })
      })
      .catch(() => {
        if (!cancelled) setError(true)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { weather, error }
}
