import React from "react"

function getLumenCondition(lumen) {
    if (lumen >= 70000) return "Sunny";
    if (lumen >= 30000) return "Bright Overcast";
    if (lumen >= 10000) return "Cloudy";
    if (lumen >= 100) return "Dim";
    return "Very Dark";
  }
  

export default function LightDisplay({ value, timestamp }) {
  const lightCondition = getLumenCondition(value)

  return (
    <div className="items-center justify-between">
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1">
          <span className={`text-4xl font-light text-white`}>{lightCondition}</span>
        </div>
        <span className="flex text-xs text-gray-400 mt-2">
          {new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
    </div>
  )
}
