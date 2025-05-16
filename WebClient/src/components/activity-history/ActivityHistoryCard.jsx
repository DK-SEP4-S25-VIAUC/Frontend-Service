import { useWaterReadings } from "../../hooks/activity-history/useWaterReadings"
import { useState } from "react"
import LineGraph from "../graph/LineGraph"
import WaterReadingLatest from "./activity-history-card/WaterReadingLatest"
import Loader from "../../components/Loader"

export default function ActivityHistoryCard({ className = "" }) {
  const { data, isLoading, isError, error, refetch } = useWaterReadings({
    refetchInterval: 1000 * 60 * 1,
  })

  const [activeTab, setActiveTab] = useState("chart")

  console.log("ActivityHistoryCard data", data);

  return (
    <div
      className={`${className} p-6 bg-white dark:bg-gray-800 shadow-md dark:shadow-md border border-gray-100 dark:border-gray-700 rounded-xl transition-all`}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white relative">
          Activity History
          <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></span>
        </h2>

        {!isLoading && !isError && (
          <div className="flex space-x-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setActiveTab("chart")}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                activeTab === "chart"
                  ? "bg-white dark:bg-gray-600 text-blue-500 dark:text-blue-400 shadow-sm"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Usage History
            </button>
            <button
              onClick={() => setActiveTab("current")}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                activeTab === "current"
                  ? "bg-white dark:bg-gray-600 text-blue-500 dark:text-blue-400 shadow-sm"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Current Level
            </button>
          </div>
        )}
      </div>

      {isLoading ? (
        <Loader/>
      ) : isError ? (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-400">
          <div className="font-medium mb-1">Error Loading Data</div>
          <div className="text-sm">{error?.message || "Failed to load water readings"}</div>
          <button
            onClick={() => refetch()}
            className="mt-2 text-sm font-medium text-blue-500 dark:text-blue-400 hover:underline"
          >
            Try again
          </button>
        </div>
      ) : (
        <div className="mt-2">
          {activeTab === "chart" ? (
            <div className="h-80">
              <LineGraph waterData={data} title="Watered Amount History" className="w-full h-full" />
            </div>
          ) : (
            <div className="flex justify-center py-4">
              <WaterReadingLatest
                className="max-w-md w-full"
                waterReadings={{
                  data: data[data.length - 1]?.water_level,
                  isLoading,
                  isError,
                  error,
                  refetch,
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
