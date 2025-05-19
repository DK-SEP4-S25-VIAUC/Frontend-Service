import React from "react"
import { LightBulbIcon } from "@heroicons/react/24/outline"
function getLumenCondition(lumen) {
    if (lumen >= 800) return "Sunny";
    if (lumen >= 400) return "Cloudy";
    if (lumen >= 300) return "Dim";
    if (lumen >= 100) return "Dark";
    if (lumen >= 0) return "Very Dark";
    return "";
  }
  

export default function LightDisplay({ value, timestamp }) {
  const lightCondition = getLumenCondition(value)

  return (
    <div className="items-center justify-between">
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1">
          <span className={`text-4xl font-light text-gray-800 dark:text-white`}>{lightCondition}</span>
        </div>
        <span className="flex text-xs text-gray-400 mt-2">
          {new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((level) => (
          <LightBulbIcon
            key={level}
            className={`h-5 w-5 ${
              level * 200 <= value
                ? "text-emerald-500 dark:text-emerald-400"
                : "text-gray-200 dark:text-gray-700"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
