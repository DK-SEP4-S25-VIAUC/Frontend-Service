import React from "react"
import { BeakerIcon as BeakerIconSolid } from "@heroicons/react/24/solid"

function getHumidityLevel(value) {
  if (value >= 70) return "optimal"
  if (value >= 40) return "moderate"
  return "low"
}

function getHumidityColor(value) {
  const level = getHumidityLevel(value)
  return {
    optimal: "text-emerald-600 dark:text-emerald-400",
    moderate: "text-amber-500 dark:text-amber-400",
    low: "text-rose-500 dark:text-rose-400",
  }[level]
}

export default function HumidityDisplay({ value, timestamp, icon }) {
  const color = getHumidityColor(value)

  const Icon = icon;

  return (
    <div className="items-center justify-between">
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1">
          <span className={`text-4xl font-light ${color}`}>{value}</span>
          <span className="text-lg text-gray-400">%</span>
        </div>
        <span className="flex text-xs text-gray-400 mt-2">
          {new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((level) => (
          <Icon
            key={level}
            className={`h-5 w-5 ${
              level * 20 <= value
                ? "text-emerald-500 dark:text-emerald-400"
                : "text-gray-200 dark:text-gray-700"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
