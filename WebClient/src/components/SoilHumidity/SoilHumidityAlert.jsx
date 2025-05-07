import useGetThreshold from "../../hooks/soilhumidity/useGetThreshold.jsx";
import { useState, useEffect } from "react";

export default function SoilHumidityAlert() {
    const [warning, setWarning] = useState(false);

    const {
        soilHumidityThreshold,
        error,
        isLoading
    } = useGetThreshold();

    useEffect(() => {
        if (!isLoading && !error) {
            if (
                soilHumidityThreshold.lowerbound <  ||
                soilHumidityThreshold.upperbound >
            ) {
                setWarning(true);
            } else {
                setWarning(false);
            }
        }
    }, [soilHumidityThreshold, lowerThreshold, upperThreshold, isLoading, error]);

    return (
        <div className="mx-auto max-w-sm sm:max-w-md md:max-w-lg w-full">
            <div className="mr-1 bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
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
