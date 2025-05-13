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
        return <p className="text-gray-500">Loading soil humidity alert…</p>;
    }
    if (error || !soilHumidityThreshold || !data) {
        return <p className="text-red-500">Error loading soil humidity data.</p>;
    }

    return (
        <div className="mx-auto max-w-sm sm:max-w-md md:max-w-lg w-full">
            {/* outer card with gradient header */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl shadow-lg overflow-hidden">
                {/* header */}
                <div className="flex items-center px-6 py-4 bg-white/50">
                    {warning ? (
                        <span className="text-red-500 text-xl">⚠️</span>
                    ) : (
                        <span className="text-green-500 text-xl">✅</span>
                    )}
                    <h2 className="ml-3 text-lg font-semibold text-gray-800">
                        Soil Humidity Warning
                    </h2>
                </div>

                {/* warning message */}
                <div className="px-6 py-2">
                    <p
                        className={
                            warning
                                ? "text-red-600 font-medium"
                                : "text-green-600 font-medium"
                        }
                    >
                        {warning
                            ? "Warning: Soil humidity out of range!"
                            : "All good—no warning."}
                    </p>
                </div>

                {/* content pane */}
                <div className="bg-white rounded-t-none rounded-2xl shadow-inner px-6 py-8 m-4">
                    <h3 className="text-center text-lg font-semibold text-gray-800 mb-6">
                        Current Boundaries
                    </h3>

                    <div className="grid grid-cols-2 divide-x divide-gray-200">
                        {/* lower */}
                        <div className="text-center px-4">
                            <p className="uppercase text-xs text-gray-500 tracking-wider">
                                Lower Bound
                            </p>
                            <p className="mt-1 text-2xl font-bold text-gray-900">
                                {soilHumidityThreshold.lowerbound}
                            </p>
                        </div>
                        {/* upper */}
                        <div className="text-center px-4">
                            <p className="uppercase text-xs text-gray-500 tracking-wider">
                                Upper Bound
                            </p>
                            <p className="mt-1 text-2xl font-bold text-gray-900">
                                {soilHumidityThreshold.upperbound}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}