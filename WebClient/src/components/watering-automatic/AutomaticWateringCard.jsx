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
        error: postError,
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
            <p className="p-4 text-center text-gray-500 whitespace-normal break-words">
                Loading current mode...
            </p>
        );
    if (isGetError)
        return (
            <p className="p-4 text-center text-red-600 whitespace-normal break-words">
                Error: {getError?.message}
            </p>
        );

    return (
        <div className="w-full">
            <div className="w-full bg-white shadow-md rounded-lg p-6 sm:p-8 flex flex-col overflow-hidden">
                <h2 className="text-lg sm:text-xl font-semibold mb-6 text-center break-words">
                    Watering Mode
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6 flex flex-col flex-1">
                    <div className="flex flex-col">
                        <label
                            htmlFor="mode"
                            className="block text-sm sm:text-base font-medium text-gray-700 whitespace-normal break-words"
                        >
                            Select Mode
                        </label>
                        <select
                            id="mode"
                            name="mode"
                            value={mode}
                            onChange={(e) => setMode(e.target.value)}
                            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 sm:py-3 whitespace-normal break-words"
                            disabled={isPending}
                        >
                            <option value="manual">Manual</option>
                            <option value="automatic">Automatic</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full py-2 sm:py-3 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 disabled:opacity-50 transition whitespace-normal break-words"
                    >
                        {isPending ? 'Submitting...' : 'Save'}
                    </button>
                </form>
                {isSuccess && (
                    <p className="mt-4 text-center text-green-600 text-sm sm:text-base whitespace-normal break-words">
                        Settings updated successfully!
                    </p>
                )}
                {isPostError && (
                    <p className="mt-4 text-center text-red-600 text-sm sm:text-base whitespace-normal break-words">
                        Error: {postError?.message}
                    </p>
                )}
            </div>
        </div>
    );
}