import { useState } from "react";

export default function ManualWateringCard() {
    const [amount, setAmount] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = async () => {
        if (!amount) {
            setError("Indtast venligst en vandmængde");
            return;
        }

        try {
            const response = await fetch('/api/manual-watering', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount }),
            });


            if (!response.ok) {
                throw new Error("Der opstod en fejl under gemning af informationen");
            }


            setError("");
            setAmount("");
            setSuccessMessage("Vanding er gemt!");

            console.log("Watering successful!");

        } catch (err) {
            setError("Der opstod en fejl under gemning af informationen");
            console.error("Error:", err);
        }
    };

    const handleKeyPress = (e) => {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    };

    return (
        <div className="bg-white shadow-md rounded-2xl p-4 w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-3">Manual Watering</h2>
            <input
                type="text"
                placeholder="Enter amount (ml)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                onKeyPress={handleKeyPress}
                inputMode="numeric"
                className="w-full border border-gray-300 rounded-lg p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>} {/* Fejlbesked */}
            {successMessage && <p className="text-green-500 text-sm mb-3">{successMessage}</p>} {/* Succesbesked */}
            <button
                onClick={handleSubmit}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
                Water Plant
            </button>
        </div>
    );
}
