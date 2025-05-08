import React from "react"
import { useLatestSoilHumidity } from "../../hooks/soil-humidity/useLatestSoilHumidity"
import Header from "./soil-humidity-card/Header"
import Loader from "../Loader"
import ErrorMessage from "../ErrorMessage"
import HumidityDisplay from "./soil-humidity-card/HumidityDisplay"

export default function SoilHumidityCard({ className = "" }) {
  const { data, isLoading, isError, error, refetch } = useLatestSoilHumidity({
    refetchInterval: 10_000,
  })

  return (
    <div className={`${className} p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all`}>
      <Header onRefresh={refetch} />

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ErrorMessage error={error} />
      ) : (
        <HumidityDisplay value={data.soil_humidity_value} timestamp={data.time_stamp} />
      )}
    </div>
  )
}
