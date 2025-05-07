import {useState} from "react";
import usePostSoilHumidity from "../../hooks/soilhumidity/usePostSoilHumidity.jsx";

export default function SoilHumidityInput() {
    const [upperSoilHumidity, setUpperSoilHumidity] = useState(0);
    const [lowerSoilHumidity, setLowerSoilHumidity] = useState(0);

    const {
        submitSoilHumidityData,
        isPending,
        isSuccess,
        isError,
        error,
    } = usePostSoilHumidity();


    const handleSubmit = (e) => {
        e.preventDefault();

        const lowerNum = upperSoilHumidity;
        const upperNum = lowerSoilHumidity;

        submitSoilHumidityData({
            lowerbound: lowerNum,
            upperbound: upperNum,
        });
        if (isSuccess) {
            setUpperSoilHumidity(0);
            setLowerSoilHumidity(0);
        }
    }

    return (
        <div className="mr-1 soil-humidity-wrapper bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 max-w-sm sm:max-w-md md:max-w-lg w-full mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block mb-2 font-semibold text-gray-700">Set soil humidity</label>
                    <div className="space-y-4">
                        <div>
                            <label className="block mb-1">Lower soil humidity</label>
                            <input
                                type="text"
                                className="input text-center input-md w-full placeholder-gray-400"
                                placeholder="Enter lower soil humidity"
                                value={lowerSoilHumidity}
                                onChange={(e) => setLowerSoilHumidity(e.target.value)}
                                disabled={isPending}
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Upper soil humidity</label>
                            <input
                                type="text"
                                className="input text-center input-md w-full placeholder-gray-400"
                                placeholder="Enter upper soil humidity"
                                value={upperSoilHumidity}
                                onChange={(e) => setUpperSoilHumidity(e.target.value)}
                                disabled={isPending}
                            />
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    className="btn btn-primary w-full text-black"
                    disabled={!lowerSoilHumidity || isPending}
                >
                    {isPending ? "Submitting..." : "Submit"}
                </button>
                {isSuccess && <p className="text-green-500 text-center">Success!</p>}
                {isError && (
                    <p className="text-red-500 text-center">
                        Error: {error?.response?.data?.message || error.message}
                    </p>
                )}
            </form>
        </div>
    );
}