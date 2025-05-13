import React from 'react';

export default function WaterTankDisplay({ percentage }) {
    let waterColor = "bg-blue-400";
    if (percentage <= 10) {
        waterColor = "bg-red-400";
    } else if (percentage <= 30) {
        waterColor = "bg-yellow-400";
    }

    return (
        <div className="relative w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-4 border-4 border-white dark:border-gray-900">
            <div
                className={`absolute bottom-0 w-full ${waterColor} transition-all duration-1000 ease-out`}
                style={{ height: `${percentage}%` }}
            ></div>

            <div className="absolute inset-0 flex flex-col justify-between py-2 px-4">
                {[100, 75, 50, 25, 0].map((p) => (
                    <div key={p} className="flex items-center space-x-2">
                        <div className="w-5 h-0.5 bg-gray-400 dark:bg-gray-500"></div>
                        <span className="text-xs text-gray-600 dark:text-gray-400">{p}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
