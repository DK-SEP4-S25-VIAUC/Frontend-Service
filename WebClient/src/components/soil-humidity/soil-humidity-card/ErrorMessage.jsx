import React from "react"

export default function ErrorMessage({ error }) {
  return (
    <div className="text-center text-sm text-rose-500 dark:text-rose-400 p-4 bg-rose-50 dark:bg-gray-700/50 rounded-lg">
      {error.message.includes("CORS")
        ? "Connection issue — please check network."
        : error.message}
    </div>
  )
}
