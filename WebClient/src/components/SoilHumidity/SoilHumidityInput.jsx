import {useState} from "react";

export default function SoilHumidityInput() {
    const [desiredSoilHumidity, setDesiredSoilHumidity] = useState(0);


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!desiredSoilHumidity) {
            return;
        }
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
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary w-full text-gray-400"
                    disabled={!desiredSoilHumidity}
                >
                    Submit!
                </button>
            </form>
        </>
    )
}