import React from "react"
import { useLatestSoilHumidity } from "../../hooks/soil-humidity/useLatestSoilHumidity"
import { ArrowPathIcon, BeakerIcon } from "@heroicons/react/24/outline"
import { BeakerIcon as BeakerIconSolid } from "@heroicons/react/24/solid"

/**
 * SoilHumidityCard
 * A minimalistic, modern card component to display the latest soil humidity reading.
 * Designed specifically for smart greenhouse monitoring.
 */
export default function SoilHumidityCard({ className = "" }) {
  const { data, isLoading, isError, error, refetch } = useLatestSoilHumidity({
    refetchInterval: 10_000, // refetch every 10 seconds
  })

  // Calculate humidity level for visual representation
  const getHumidityLevel = (value) => {
    if (value >= 70) return "optimal"
    if (value >= 40) return "moderate"
    return "low"
  }

  // Get color based on humidity level
  const getHumidityColor = (value) => {
    const level = getHumidityLevel(value)
    return {
      optimal: "text-emerald-600 dark:text-emerald-400",
      moderate: "text-amber-500 dark:text-amber-400",
      low: "text-rose-500 dark:text-rose-400",
    }[level]
  }

  return (
    <div
      className={`${className} p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BeakerIcon className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
          <h3 className="text-base font-medium text-gray-800 dark:text-gray-100">Soil Humidity</h3>
        </div>
        <button
          onClick={() => refetch()}
          className="p-1.5 rounded-full text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-gray-700 transition-colors focus:outline-none"
          aria-label="Refresh data"
        >
          <ArrowPathIcon className="h-4 w-4" />
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-emerald-500" />
        </div>
      ) : isError ? (
        <div className="text-center text-sm text-rose-500 dark:text-rose-400 p-4 bg-rose-50 dark:bg-gray-700/50 rounded-lg">
          {error.message.includes("CORS") ? "Connection issue — please check network." : error.message}
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className={`text-4xl font-light ${getHumidityColor(data.soil_humidity_value)}`}>
                {data.soil_humidity_value}
              </span>
              <span className="text-lg text-gray-400">%</span>
            </div>
            <span className="text-xs text-gray-400 mt-1">
              {new Date(data.time_stamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((level) => (
              <BeakerIconSolid
                key={level}
                className={`h-5 w-5 ${
                  level * 20 <= data.soil_humidity_value
                    ? "text-emerald-500 dark:text-emerald-400"
                    : "text-gray-200 dark:text-gray-700"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
