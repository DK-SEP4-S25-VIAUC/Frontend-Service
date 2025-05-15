import React, { useState, useEffect } from "react";
import useGetThreshold from "../../hooks/soil-humidity/useGetThreshold.jsx";
import { useLatestSoilHumidity } from "../../hooks/soil-humidity/useLatestSoilHumidity.js";

export default function SoilHumidityAlert() {
    const [warning, setWarning] = useState(false);

    const { soilHumidityThreshold, error, isLoading } = useGetThreshold();
    const { data } = useLatestSoilHumidity();

    useEffect(() => {
        if (
            isLoading ||
            error ||
            !soilHumidityThreshold ||
            typeof soilHumidityThreshold.lowerbound !== "number" ||
            typeof soilHumidityThreshold.upperbound !== "number" ||
            !data ||
            typeof data.soil_humidity_value !== "number"
        ) {
            return;
        }

        const { lowerbound, upperbound } = soilHumidityThreshold;
        const value = data.soil_humidity_value;

        setWarning(value < lowerbound || value > upperbound);
    }, [
        isLoading,
        error,
        soilHumidityThreshold,
        data,
    ]);

    if (isLoading) {
        return <p className="text-gray-500 dark:text-gray-400">Loading soil humidity alert…</p>;
    }
    if (error || !soilHumidityThreshold || !data) {
        return <p className="text-red-500 dark:text-red-400">Error loading soil humidity data.</p>;
    }

    return (
        <div className="mx-auto w-full">
            <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-lg rounded-2xl p-4 sm:p-6 md:p-8">
                <div className="font-semibold text-gray-700 dark:text-gray-300">Soil Humidity Warning</div>
                <div className="space-y-6 font-semibold text-gray-700 dark:text-gray-300">
                    {warning ? (
                        <p className="text-red-600 dark:text-red-500">⚠️ Warning: Soil humidity out of range!</p>
                    ) : (
                        <p className="text-green-600 dark:text-green-400">✅ All good—no warning.</p>
                    )}
                </div>
                <div className="mt-2 mx-auto max-w-full sm:max-w-sm p-6 bg-white dark:bg-gray-700 rounded-2xl shadow-lg dark:shadow-lg">
                    <div className="text-center text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 break-words">
                        Current Boundaries
                    </div>

                    <div className="flex flex-col sm:flex-row flex-wrap sm:flex-nowrap justify-between gap-6">
                        <div className="flex-1 min-w-0 text-center">
                            <p className="uppercase text-xs text-gray-500 dark:text-gray-400 tracking-wider break-normal">
                                Lower Bound
                            </p>
                            <p className="mt-1 text-xl sm:text-2xl font-medium text-gray-900 dark:text-gray-100 break-words">
                                {soilHumidityThreshold.lowerbound}
                            </p>
                        </div>
                        <div className="flex-1 min-w-0 text-center">
                            <p className="uppercase text-xs text-gray-500 dark:text-gray-400 tracking-wider break-normal">
                                Upper Bound
                            </p>
                            <p className="mt-1 text-xl sm:text-2xl font-medium text-gray-900 dark:text-gray-100 break-words">
                                {soilHumidityThreshold.upperbound}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}