
import { BeakerIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import React from 'react';


export default function Header({ onRefresh }) {

    return (
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
                <BeakerIcon className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                <h3 className="text-base font-medium text-gray-800 dark:text-gray-100">Your plants need to be watered at:</h3>
            </div>
            <button
                onClick={onRefresh}
                className="p-1.5 rounded-full text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-gray-700 transition-colors focus:outline-none"
                aria-label="Refresh data"
            >
                <ArrowPathIcon className="h-4 w-4" />
            </button>
        </div>
    );
}