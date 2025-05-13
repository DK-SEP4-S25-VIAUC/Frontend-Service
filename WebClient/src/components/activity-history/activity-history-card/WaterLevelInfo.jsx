import React from 'react';

export default function WaterLevelInfo({ isLoading, waterValue, percentage, maxLevel }) {
    const displayColor =
        percentage <= 10 ? 'text-red-500' :
        percentage <= 30 ? 'text-yellow-500' :
        'text-green-500';

    return (
        <div className="text-center h-24 flex flex-col justify-center">
            {isLoading ? (
                <div className="flex items-center justify-center h-full">
                    <div className="animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 h-6 w-24"></div>
                </div>
            ) : (
                <>
                    <div className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                        {(waterValue / 1000).toFixed(1)}L
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        of {(maxLevel / 1000).toFixed(1)}L capacity
                    </div>
                    <div className={`mt-1 text-sm font-medium ${displayColor}`}>
                        {Math.round(percentage)}% full
                    </div>
                </>
            )}
        </div>
    );
}
