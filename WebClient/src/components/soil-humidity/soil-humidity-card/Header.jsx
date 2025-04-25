import React from "react"
import { ArrowPathIcon, BeakerIcon } from "@heroicons/react/24/outline"

export default function Header({ onRefresh }) {
  return (
    <div className="flex items-center justify-between mb-">
      <div className="flex items-center gap-2">
        <BeakerIcon className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
        <h3 className="text-base font-medium text-gray-800 dark:text-gray-100">Soil Humidity</h3>
      </div>
      <button
        onClick={onRefresh}
        className="p-1.5 rounded-full text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-gray-700 transition-colors focus:outline-none"
        aria-label="Refresh data"
      >
        <ArrowPathIcon className="h-4 w-4" />
      </button>
    </div>
  )
}
