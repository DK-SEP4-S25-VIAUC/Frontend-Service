import React, { useState } from "react";
import { useLatestWaterReading } from "../../hooks/water-reading/useLatestWaterReading";
import { useWateringRequest } from "../../hooks/watering/useWateringRequest";

export default function RemoteWateringCard() {
    const [waterAmount, setWaterAmount] = useState(5);

    // Fetch the latest water reading data
    const {
        data: readingData,
        isLoading: isReadingLoading,
        refetch: refetchReading
    } = useLatestWaterReading({
        refetchInterval: 10_000,
    });

    // Watering request
    const {
        mutate: waterPlant,
        isLoading: isWatering,
        isError: isWateringError,
        error: wateringError
    } = useWateringRequest({
        onSuccess: () => {
            // Refetch the water reading data after watering
            refetchReading();
        }
    });

    const handleWateringSubmit = (e) => {
        e.preventDefault();
        waterPlant(waterAmount);
    };

    return (
        <div className="card">
            <h2 className={"font-extrabold"}>Plant Watering Station</h2>


            <div className="reading-section">
                <h3 className={"font-bold"}>Current Water Reading</h3>
                {isReadingLoading ? (
                    <p>Loading water reading data...</p>
                ) : readingData && readingData.data ? (
                    <div>
                        <p>Timestamp: {new Date(readingData.data.timestamp).toLocaleString()} | Reading: {readingData.data.waterReading}</p>
                    </div>
                ) : (
                    <p>No water reading data available</p>
                )}
            </div>


            <div className="watering-section">
                <h3 className={"font-bold"}>Water Plant</h3>
                <form onSubmit={handleWateringSubmit}>
                    <div>
                        <label htmlFor="water-amount">Water amount:</label>
                        <input
                            id="water-amount"
                            type="number"
                            min="1"
                            max="100"
                            value={waterAmount}
                            onChange={(e) => setWaterAmount(Number(e.target.value))}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isWatering}
                    >
                        {isWatering ? 'Watering...' : 'Water Plant'}
                    </button>
                </form>

                {isWateringError && (
                    <div className="error">Error: {wateringError.message}</div>
                )}
            </div>
        </div>
    );
}