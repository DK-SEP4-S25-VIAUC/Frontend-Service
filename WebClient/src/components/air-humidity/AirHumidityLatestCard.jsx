import React from "react";
import { useLatestAirHumidity } from "../../hooks/air-humidity/useLatestAirHumidity";
import Header from "./air-humidity-card/Header";
import Loader from "../Loader";
import ErrorMessage from "../ErrorMessage";
import HumidityDisplay from "../soil-humidity/soil-humidity-card/HumidityDisplay";
import { CloudIcon } from "@heroicons/react/24/outline";

export default function AirHumidityLatestCard({ className = "" }) {
    const { data, isLoading, isError, error, refetch } = useLatestAirHumidity({
        refetchInterval: 10_000,
    });

    return (
        <div className={`${className} p-6 bg-white dark:bg-gray-800 shadow-md dark:shadow-md border border-gray-100 dark:border-gray-700 rounded-xl transition-all`}>
            <Header onRefresh={refetch} />

            {isLoading ? (
                <Loader />
            ) : isError ? (
                <ErrorMessage error={error} />
            ) : (
                <HumidityDisplay value={data.air_humidity_value} timestamp={data.time_stamp} icon={CloudIcon} />
            )}
        </div>
    );
}
    