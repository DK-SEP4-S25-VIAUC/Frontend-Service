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
            className="soil-humidity-wrapper bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-lg p-4 sm:p-6 md:p-8 max-w-sm sm:max-w-md md:max-w-lg w-full mx-auto"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center">
                    <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300 text-xl">
                        Set soil humidity
                    </label>
                </div>
                <div className="border-gray-300 dark:border-gray-600 rounded-lg p-4 space-y-6 text-center">
                    <div>
                        <label className="block mb-1 text-gray-700 dark:text-gray-300">Lower soil humidity</label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            step="1"
                            className="input input-md w-full text-center placeholder-gray-400 dark:placeholder-gray-500 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-md"
                            placeholder="Enter lower soil humidity"
                            value={lowerSoilHumidity}
                            onChange={(e) =>
                                setLowerSoilHumidity(clamp(e.target.valueAsNumber))
                            }
                            disabled={isPending}
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-gray-700 dark:text-gray-300">Upper soil humidity</label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            step="1"
                            className="input input-md w-full text-center placeholder-gray-400 dark:placeholder-gray-500 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-md"
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
                    className={`cursor-pointer w-full py-3 px-6 font-semibold text-white bg-gray-500 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-700 rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-700 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed`}
                    disabled={isPending}
                >
                    {isPending ? "Submitting..." : "Submit"}
                </button>

                {isSuccess && (
                    <p className="text-green-500 dark:text-green-400 text-center">Success!</p>
                )}
                {isError && (
                    <p className="text-red-500 dark:text-red-400 text-center">
                        Something went wrong try again!
                    </p>
                )}
            </form>
        </div>
    );
}
