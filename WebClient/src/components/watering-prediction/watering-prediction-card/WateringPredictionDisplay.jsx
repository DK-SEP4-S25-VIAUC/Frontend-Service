import React from 'react';

export default function WateringPredictionDisplay({ next_watering_time }) {
    const date = new Date(next_watering_time);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const formattedDate = date.toLocaleDateString('en-UK', options);

    return (
        <div className="flex flex-col gap-4">
            <div className="text-3xl font-bold text-gray-800 dark:text-gray-100">{formattedDate}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{"*This is a prediction made on the basis of thousands of flora, yet please acknowledge that this is not 100% accurate."}</div>
        </div>
    );
}