import { useState } from 'react';
import usePostManualWatering from "../../hooks/manual-watering/usePostManualWatering";

export default function ManualWateringCard() {
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    const {
        submitWatering,
        isLoading,
        successMessage,
    } = usePostManualWatering();

    const handleSubmit = () => {
        if (!amount) {
            setError('Indtast venligst en vandmængde');
            return;
        }

        if (isNaN(amount)) {
            setError('Mængden skal være et gyldigt tal');
            return;
        }

        setError('');
        submitWatering(amount).then(() => {
            setAmount('');
        });
    };

    const handleKeyPress = (e) => {
        if (!/[0-9.]$/.test(e.key)) {
            e.preventDefault();
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-4 mx-auto w-full ">
            <h2 className="text-lg font-semibold mb-3 dark:text-gray-300">Manual Watering</h2>
            <input
                type="text"
                placeholder="Enter amount (ml)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                onKeyPress={handleKeyPress}
                inputMode="decimal"
                className="w-full border border-gray-300 rounded-lg p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:focus:ring-green-600"
            />
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
            {successMessage && <p className="text-green-500 text-sm mb-3">{successMessage}</p>}
            <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            >
                {isLoading ? 'Sender...' : 'Water Plant'}
            </button>
        </div>
    );
}
