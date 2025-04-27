import {useState} from "react";
import usePostSoilHumidity from "../../hooks/soilhumidity/usePostSoilHumidity.jsx";

export default function SoilHumidityInput() {
    const [desiredSoilHumidity, setDesiredSoilHumidity] = useState(0);

    const{
        submitSoilHumidityData,
        isPending,
        isSuccess,
        isError,
        error,
    } = usePostSoilHumidity();


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!desiredSoilHumidity) {
            return;
        }

        submitSoilHumidityData({
            desiredSoilHumidity
        });

        setDesiredSoilHumidity(0);
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-md mx-auto">
                <div>
                    <label className="block mb-1 font-semibold">Set soilhumidity</label>
                    <input
                        type="text"
                        className="input input-md w-full placeholder-gray-400 placeholder-center"
                        placeholder="Enter desired soilhumidity"
                        value={desiredSoilHumidity}
                        onChange={(e) => setDesiredSoilHumidity(e.target.value)}
                        disabled={isPending}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary w-full text-gray-400"
                    disabled={!desiredSoilHumidity}
                >
                    {isPending ? "Submitting..." : "Submit"}
                </button>
                {isSuccess && <p className="text-green-500 text-center">Success!</p>}
                {isError && <p className="text-red-500 text-center">Error: {error?.response?.data?.message || error.message}</p>}
            </form>
        </>
    )
}