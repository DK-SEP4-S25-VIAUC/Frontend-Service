import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import ToggleLight from './toggles/ToggleLight.jsx';
import ToggleVentilation from './toggles/ToggleVentilation.jsx';
import ToggleWaterPlant from './toggles/ToggleWaterPlant.jsx';
import AddDevice from './toggles/AddDevice.jsx';
import { toast } from 'react-toastify';

export default function QuickControlCard() {
    const [showControls, setShowControls] = useState(true);
    const [inputValue, setInputValue] = useState('5'); // default to 5 seconds
    const [wateringSeconds, setWateringSeconds] = useState(5);

    const toggleControls = () => {
        setShowControls(!showControls);
    };

    const handleInputChange = (event) => {
        const value = event.target.value.replace(/[^0-9]/g, '');
        setInputValue(value);
    };

    const handleSubmit = () => {
        const seconds = parseInt(inputValue, 10);
        if (!seconds || seconds <= 0) {
            toast.warning('Please enter a valid number of seconds');
            return;
        }
        setWateringSeconds(seconds);
        setShowControls(true);
        toast.success(`Watering duration set to ${seconds} second${seconds === 1 ? '' : 's'}`);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 w-full h-full flex flex-col">
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
                    <ToggleWaterPlant isDisabled={false} waterAmount={wateringSeconds} />
                    <AddDevice isDisabled={true} />
                </div>
            ) : (
                <div className="w-full flex flex-col space-y-2">
                    <label htmlFor="wateringInput" className="text-xs text-gray-700 dark:text-gray-300">
                        Watering duration (in seconds):
                    </label>
                    <input
                        id="wateringInput"
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="e.g. 5"
                        className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                    />
                    <button
                        onClick={handleSubmit}
                        disabled={!inputValue || parseInt(inputValue) <= 0}
                        className="bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors text-sm py-2 px-3 w-full"
                    >
                        Save
                    </button>
                </div>
            )}
        </div>
    );
}