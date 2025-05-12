import React from 'react';
import { useLatestWaterReading } from "../../hooks/water-reading/useLatestWaterReading.js";
import { RefreshCw, AlertCircle, Clock } from "lucide-react";
import dayjs from 'dayjs';

export default function WaterReadingLatestCard() {
    const {
        data: apiReadingData,
        isLoading: isReadingLoading,
        isError: isReadingError,
        refetch: refetchReading
    } = useLatestWaterReading({
        refetchInterval: 100_000,
    });

    // Remove this line when using real API data
    const readingData = isReadingError || !apiReadingData
        ? {
            value: Math.floor(Math.random() * 2000),
            timestamp: new Date().toISOString()
        }
        : apiReadingData;

    // Calculate percentage for water level (0-100%)
    const maxWaterLevel = 2000; // 2000 ml or 2L
    const waterValue = readingData?.value || 0;
    const waterPercentage = Math.min(Math.max((waterValue / maxWaterLevel) * 100, 0), 100);


    const formatTimestamp = (timestamp) => {
        return timestamp
            ? dayjs(timestamp).format('DD/MM/YYYY HH:mm:ss')
            : 'N/A';
    };

    // Determine water level color based on percentage
    let waterColor = "bg-blue-500";
    if (waterPercentage <= 10) {
        waterColor = "bg-red-500";
    } else if (waterPercentage <= 30) {
        waterColor = "bg-yellow-500";
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden w-70">
            <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Water Tank Level
                </h2>
                <button
                    onClick={refetchReading}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Refresh water reading"
                >
                    <RefreshCw size={18} className={`text-gray-600 dark:text-gray-300 ${isReadingLoading ? 'animate-spin' : ''}`} />
                </button>
            </div>

            <div className="p-6 flex flex-col items-center">
                <div className="h-10 mb-4 w-full">
                    {isReadingError ? (
                        <div className="flex items-center justify-center bg-red-100 dark:bg-red-900/30 p-3 rounded-md h-full">
                            <AlertCircle size={18} className="text-red-500 dark:text-red-400 mr-2" />
                            <span className="text-red-600 dark:text-red-400 text-sm font-medium">Failed to fetch water level</span>
                        </div>
                    ) : null}
                </div>

                <div className="relative w-32 h-64 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden mb-3">
                    {/* Water fill animation */}
                    <div
                        className={`absolute bottom-0 w-full ${waterColor} transition-all duration-1000 ease-out`}
                        style={{ height: `${waterPercentage}%` }}
                    ></div>

                    {/* Water measurement lines */}
                    <div className="absolute inset-0 flex flex-col justify-between py-2 px-1">
                        {[100, 75, 50, 25, 0].map((percentage) => (
                            <div key={percentage} className="w-full flex items-center">
                                <div className="w-3 h-0.5 bg-gray-400 dark:bg-gray-500"></div>
                                <span className="ml-1 text-xs text-gray-600 dark:text-gray-400">
                                {percentage}%
                                </span>
                            </div>
                        ))}
                    </div>
                </div>


                <div className="text-center h-24 flex flex-col justify-center">
                    {isReadingLoading ? (
                        <div className="flex items-center justify-center h-full">
                            <div className="animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 h-6 w-24"></div>
                        </div>
                    ) : (
                        <>
                            <div className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                                {(waterValue / 1000).toFixed(1)}L
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                of 2L capacity
                            </div>
                            <div className={`mt-1 text-sm font-medium ${
                                waterPercentage <= 10 ? 'text-red-500' :
                                    waterPercentage <= 30 ? 'text-yellow-500' :
                                        'text-green-500'
                            }`}>
                                {Math.round(waterPercentage)}% full
                            </div>

                            <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center">
                                <Clock size={12} className="mr-1" />
                                Last updated: {formatTimestamp(readingData?.timestamp)}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}