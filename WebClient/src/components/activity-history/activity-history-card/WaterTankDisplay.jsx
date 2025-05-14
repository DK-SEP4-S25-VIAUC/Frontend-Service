"use client"

import { useEffect, useState } from "react"

export default function WaterTankDisplay({ percentage, className = "" }) {
  const [animatedPercentage, setAnimatedPercentage] = useState(0)

  useEffect(() => {
    // Animate the water level change
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage)
    }, 100)

    return () => clearTimeout(timer)
  }, [percentage])

  // Determine water color based on level
  let waterColor = "bg-blue-400"
  if (percentage <= 10) {
    waterColor = "bg-red-400"
  } else if (percentage <= 30) {
    waterColor = "bg-yellow-400"
  }

  return (
    <div className={`${className}relative w-40 h-40 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mb-6 border-4 border-white dark:border-gray-900 shadow-inner`}>
      {/* Water level with transition */}
      <div
        className={`absolute bottom-0 w-full ${waterColor} transition-all duration-1000 ease-out`}
        style={{ height: `${animatedPercentage}%` }}
      >
        {/* Simple wave effect using a gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>
      </div>

      {/* Measurement lines */}
      <div className="absolute inset-0 flex flex-col justify-between py-3 px-4">
        {[100, 75, 50, 25, 0].map((p) => (
          <div key={p} className="flex items-center space-x-2">
            <div className="w-5 h-0.5 bg-gray-400 dark:bg-gray-500"></div>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{p}%</span>
          </div>
        ))}
      </div>

      {/* Empty tank icon */}
      {percentage < 5 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-gray-300 dark:text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
        </div>
      )}
    </div>
  )
}
