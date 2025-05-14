import React, { useState, useEffect } from 'react';
import usePostAutomaticWatering from '../../hooks/watering/usePostAutomaticWatering.jsx';
import useGetAutomaticWateringStatus from '../../hooks/watering/useGetAutomaticWateringStatus.jsx';

export default function AutomaticWateringCard() {
    const [mode, setMode] = useState('manual');

    const {
        automaticWateringStatus,
        isLoading: isGetLoading,
        isError: isGetError,
        error: getError,
    } = useGetAutomaticWateringStatus();

    const {
        submitAutomaticWatering,
        isPending,
        isSuccess,
        isError: isPostError,
    } = usePostAutomaticWatering();

    useEffect(() => {
        if (
            automaticWateringStatus &&
            typeof automaticWateringStatus.automatic_watering === 'boolean'
        ) {
            setMode(
                automaticWateringStatus.automatic_watering ? 'automatic' : 'manual'
            );
        }
    }, [automaticWateringStatus]);

    const handleSubmit = (e) => {
        e.preventDefault();
        submitAutomaticWatering({ automatic_watering: mode === 'automatic' });
    };

    if (isGetLoading)
        return (
            <p className="p-4 text-center text-gray-500 dark:text-gray-400 whitespace-normal break-words">
                Loading current mode...
            </p>
        );
    if (isGetError)
        return (
            <p className="p-4 text-center text-red-600 dark:text-red-500 whitespace-normal break-words">
                Error: {getError?.message}
            </p>
        );

    return (
        <div className="w-full">
            <div className="w-full bg-white dark:bg-gray-800 shadow-md dark:shadow-lg rounded-lg p-6 sm:p-8 flex flex-col overflow-hidden">
                <h2 className="text-lg sm:text-xl font-semibold mb-6 text-center text-gray-900 dark:text-white break-words">
                    Watering Mode
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6 flex flex-col flex-1">
                    <div className="flex flex-col">
                        <label
                            htmlFor="mode"
                            className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 whitespace-normal break-words"
                        >
                            Select Mode
                        </label>
                        <select
                            id="mode"
                            name="mode"
                            value={mode}
                            onChange={(e) => setMode(e.target.value)}
                            className="mt-2 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 sm:py-3 whitespace-normal break-words"
                            disabled={isPending}
                        >
                            <option value="manual">Manual</option>
                            <option value="automatic">Automatic</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full py-2 sm:py-3 px-4 bg-gray-500 dark:bg-gray-600 text-white font-medium rounded-md hover:bg-gray-600 dark:hover:bg-gray-700 hover:cursor-pointer disabled:opacity-50 transition whitespace-normal break-words"
                    >
                        {isPending ? 'Submitting...' : 'Save'}
                    </button>
                </form>
                {isSuccess && (
                    <p className="mt-4 text-center text-green-600 dark:text-green-400 text-sm sm:text-base whitespace-normal break-words">
                        Settings updated successfully!
                    </p>
                )}
                {isPostError && (
                    <p className="mt-4 text-center text-red-600 dark:text-red-500 text-sm sm:text-base whitespace-normal break-words">
                        Something went wrong try again!
                    </p>
                )}
            </div>
        </div>
    );
}
