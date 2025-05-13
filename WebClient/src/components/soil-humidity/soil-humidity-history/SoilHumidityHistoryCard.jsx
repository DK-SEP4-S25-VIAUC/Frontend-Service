import { useState, useEffect } from "react";
import { useSoilHumidityHistory } from "../../../hooks/soil-humidity/useHistorySoilHumidity";
import LineGraph from "../../graph/SoilLineGraph";
import Loader from "../../Loader";
import CalendarModal from "../../calender/CalenderModal"; 

export default function SoilHumidityHistoryCard({ className = "" }) {
  const [calendarRange, setCalendarRange] = useState([new Date(), new Date()]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [start, end] = calendarRange;

  const { data, isLoading, isError, error, refetch } = useSoilHumidityHistory(start, end, {
    refetchInterval: 1000 * 60 * 1,
  });

  const sortedData = Array.isArray(data)
    ? [...data].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
    : [];

  const currentReading = sortedData[sortedData.length - 1];

  return (
    <div
      className={`${className} p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 transition-all`}
    >

      {showCalendar && (
        <CalendarModal
          onClose={() => setShowCalendar(false)}
          range={calendarRange}
          setRange={setCalendarRange}
        />
      )}

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white relative">
          Soil Humidity
          <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"></span>
        </h2>

        {!isLoading && !isError && (
          <div className="flex space-x-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
            onClick={() => setShowCalendar(true)}
            className="px-4 py-1.5 text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            >
            Select Date Range
            </button>
          </div>
        )}
      </div>

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-400">
          <div className="font-medium mb-1">Error Loading Data</div>
          <div className="text-sm">{error?.message || "Failed to load soil humidity readings"}</div>
          <button
            onClick={() => refetch()}
            className="mt-2 text-sm font-medium text-blue-500 dark:text-blue-400 hover:underline"
          >
            Try again ( ͡° ͜ʖ ͡°)
          </button>
        </div>
      ) : (
        <div className="mt-2">
            <div className="h-80">
              <LineGraph
                soilData={sortedData}
                title="Soil Humidity History"
                className="w-full h-full"
              />
            </div>
        </div>
      )}
    </div>
  );
}
