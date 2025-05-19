import React from "react"
import { useLatestLightReading } from "../../hooks/light/useLatestLightReading";
import Header from "./Header";
import Loader from "../Loader"
import ErrorMessage from "../ErrorMessage"
import LightDisplay from "./LightDisplay"

export default function LightDisplayCard({ className = "" }) {
  const { data, isLoading, isError, error, refetch } = useLatestLightReading({
    refetchInterval: 10_000,
  })

  return (
    <div className={`${className} p-6 bg-white dark:bg-gray-800 shadow-md dark:shadow-md border border-gray-100 dark:border-gray-700 rounded-xl transition-all`}>
      <Header onRefresh={refetch} />

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ErrorMessage error={error} />
      ) : (
        <LightDisplay value={data.LightDTO.light_value} timestamp={data.LightDTO.time_stamp} />
      )}
    </div>
  )
}
