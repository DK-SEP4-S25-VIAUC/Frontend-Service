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
        soilHumidityThreshold?.lowerbound,
        soilHumidityThreshold?.upperbound,
        data?.soil_humidity_value,
    ]);

    if (isLoading) {
        return <p className="text-gray-500">Loading soil humidity alert…</p>;
    }
    if (error || !soilHumidityThreshold || !data) {
        return <p className="text-red-500">Error loading soil humidity data.</p>;
    }

    return (
        <div className="mx-auto max-w-sm sm:max-w-md md:max-w-lg w-full">
            <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
                <div className="font-semibold text-gray-700">Soil Humidity Warning</div>
                <div className="space-y-6 font-semibold text-gray-700">
                    {warning ? (
                        <p className="text-red-600">⚠️ Warning: Soil humidity out of range!</p>
                    ) : (
                        <p className="text-green-600">✅ All good—no warning.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
