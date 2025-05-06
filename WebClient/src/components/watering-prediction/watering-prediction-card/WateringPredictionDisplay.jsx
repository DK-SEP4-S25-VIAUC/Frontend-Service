import React from 'react';

export default function WateringPredictionDisplay({ value, timestamp }) {
    const date = new Date(timestamp);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    return (
        <div className="flex flex-col gap-4">
            <div className="text-3xl font-bold text-gray-800 dark:text-gray-100">{value}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{formattedDate}</div>
        </div>
    );
}