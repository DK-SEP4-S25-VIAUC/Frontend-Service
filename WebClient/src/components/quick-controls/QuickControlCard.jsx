import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import ToggleLight from './toggles/ToggleLight.jsx';
import ToggleVentilation from './toggles/ToggleVentilation.jsx';
import ToggleWaterPlant from './toggles/ToggleWaterPlant.jsx';
import AddDevice from './toggles/AddDevice.jsx';
import { toast } from 'react-toastify';

export default function QuickControlCard() {
    const [showControls, setShowControls] = useState(true);
    const [inputValue, setInputValue] = useState('100'); // Default to 100ml
    const [waterAmount, setWaterAmount] = useState(100);

    const toggleControls = () => {
        setShowControls(!showControls);
    };

    const handleInputChange = (event) => {
        const value = event.target.value.replace(/[^0-9]/g, '');
        setInputValue(value);
    };

    const handleSubmit = () => {
        const ml = parseInt(inputValue, 10);

        if (!ml || ml <= 0) {
            toast.warning('Please enter a valid water amount in ml');
            return;
        }

        setWaterAmount(ml);
        setShowControls(true);
        toast.success(`Water amount set to ${ml} ml`);
    };

    return (
        <div className="md:col-span-2 bg-white dark:bg-gray-800 shadow-md dark:shadow-md border border-gray-100 dark:border-gray-700 rounded-xl p-4 w-full max-w-md">
            <div className="flex items-center relative mb-3">
                <Settings
                    size={15}
                    className="text-gray-600 dark:text-gray-300 absolute left-0 cursor-pointer"
                    onClick={toggleControls}
                    title="Toggle settings"
                />
                <h2 className="text-sm font-medium text-gray-700 dark:text-gray-200 w-full text-center">
                    Quick Controls
                </h2>
            </div>

            {showControls ? (
                <div className="grid grid-cols-4 gap-2">
                    <ToggleLight isDisabled={true} />
                    <ToggleVentilation isDisabled={true} />
                    <ToggleWaterPlant isDisabled={false} waterAmount={waterAmount} />
                    <AddDevice isDisabled={true} />
                </div>
            ) : (
                <div className="w-full">
                    <label htmlFor="waterInput" className="block pb-1 text-xs text-gray-700 dark:text-gray-300">
                        Water amount (ml):
                    </label>
                    <input
                        id="waterInput"
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="e.g. 100"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                    />
                    <button
                        onClick={handleSubmit}
                        disabled={!inputValue || parseInt(inputValue) <= 0}
                        className="bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-200 mt-2 px-4 py-2 w-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Save
                    </button>
                </div>
            )}
        </div>
    );
}
