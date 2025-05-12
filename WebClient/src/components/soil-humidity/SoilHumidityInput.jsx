import {useState} from "react";
import usePostSoilHumidity from "../../hooks/soil-humidity/usePostSoilHumidity.jsx";

function clamp(value, min = 0, max = 100) {
    if (Number.isNaN(value)) return min;
    return Math.min(Math.max(value, min), max);
}

export default function SoilHumidityInput() {
    const [lowerSoilHumidity, setLowerSoilHumidity] = useState(0);
    const [upperSoilHumidity, setUpperSoilHumidity] = useState(100);

    const {
        submitSoilHumidityData,
        isPending,
        isSuccess,
        isError,
        error,
    } = usePostSoilHumidity();

    const handleSubmit = (e) => {
        e.preventDefault();
        submitSoilHumidityData({
            lowerbound: lowerSoilHumidity,
            upperbound: upperSoilHumidity,
        });
        if (isSuccess) {
            setLowerSoilHumidity(0);
            setUpperSoilHumidity(100);
        }
    };

    return (
        <div
            className="soil-humidity-wrapper bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 max-w-sm sm:max-w-md md:max-w-lg w-full mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center">
                    <label className="block mb-2 font-semibold text-gray-700 text-xl">
                        Set soil humidity
                    </label>
                </div>
                <div className="border-gray-300 rounded-lg p-4 space-y-6 text-center">
                    <div>
                        <label className="block mb-1">Lower soil humidity</label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            step="1"
                            className="input input-md w-full text-center placeholder-gray-400 border border-gray-300 rounded-md"
                            placeholder="Enter lower soil humidity"
                            value={lowerSoilHumidity}
                            onChange={(e) =>
                                setLowerSoilHumidity(clamp(e.target.valueAsNumber))
                            }
                            disabled={isPending}
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Upper soil humidity</label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            step="1"
                            className="input input-md w-full text-center placeholder-gray-400 border border-gray-300 rounded-md"
                            placeholder="Enter upper soil humidity"
                            value={upperSoilHumidity}
                            onChange={(e) =>
                                setUpperSoilHumidity(clamp(e.target.valueAsNumber))
                            }
                            disabled={isPending}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className={`cursor-pointer w-full py-3 px-6 font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg hover:from-indigo-600 hover:to-blue-500 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed`}
                    disabled={isPending}
                >
                    {isPending ? "Submitting..." : "Submit"}
                </button>

                {isSuccess && (
                    <p className="text-green-500 text-center">Success!</p>
                )}
                {isError && (
                    <p className="text-red-500 text-center">
                        Error: {error?.response?.data?.message || error.message}
                    </p>
                )}
            </form>
        </div>
    );
}
