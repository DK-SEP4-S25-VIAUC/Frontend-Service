import { useWaterReadings } from "../../hooks/activity-history/useWaterReadings";
import Loader from "../Loader";
import ErrorMessage from "../ErrorMessage";
import React from "react";
import LineGraph from "../graph/LineGraph"; 
import WaterReadingLatest from "./activity-history-card/WaterReadingLatest";

export default function ActivityHistoryCard({ className = "" }) {
    const { data, isLoading, isError, error, refetch } = useWaterReadings({
        refetchInterval: 1000 * 60 * 1, 
    });

    return (
        <div className={`${className} p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all`}>
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Activity History
            </h2>

            {isLoading ? (
                <Loader />
            ) : isError ? (
                <ErrorMessage error={error} />
            ) : (
                <>
                    <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">
                        Current Water Level: {data.currentLevel} mL
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        <LineGraph
                            waterData={data.readings}
                            title="Watered Amount History"
                            className="md:col-span-8 col-span-12"
                        />
                        <WaterReadingLatest
                            className="md:col-span-4 col-span-12"
                            waterReadings={{
                                data: data.currentLevel,
                                isLoading,
                                isError,
                                error,
                                refetch
                            }}
                        />
                </div>

                </>
            )}
        </div>
    );
}

