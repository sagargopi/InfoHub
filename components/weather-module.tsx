"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Sun, Wind, Droplets, Loader2, Search } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface WeatherData {
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
  location: string
}

export default function WeatherModule() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [city, setCity] = useState("San Francisco")
  const [searchInput, setSearchInput] = useState("")

  const fetchWeather = async (cityName: string) => {
    try {
      setLoading(true)
      setError("")
      const response = await fetch(`/api/weather?city=${encodeURIComponent(cityName)}`)
      if (!response.ok) {
        throw new Error("Failed to fetch weather data")
      }
      const data = await response.json()
      setWeather(data)
      setCity(cityName)
      setSearchInput("")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not fetch weather data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWeather(city)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchInput.trim()) {
      fetchWeather(searchInput.trim())
    }
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          placeholder="Enter city name..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" disabled={loading}>
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
      </form>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            <p className="text-slate-600 dark:text-slate-300">Loading weather...</p>
          </div>
        </div>
      ) : !weather ? (
        <Alert>
          <AlertDescription>No weather data available</AlertDescription>
        </Alert>
      ) : (
        <>
          {/* Main Weather Display */}
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-700 dark:to-blue-900 rounded-lg p-8 text-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-3xl font-bold">{weather.location}</h2>
                <p className="text-blue-100 mt-1">{weather.condition}</p>
              </div>
              <Sun className="w-16 h-16 opacity-80" />
            </div>
            <div className="text-6xl font-bold">{weather.temperature}°C</div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Humidity</span>
              </div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{weather.humidity}%</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Wind className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Wind</span>
              </div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{weather.windSpeed} m/s</p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
