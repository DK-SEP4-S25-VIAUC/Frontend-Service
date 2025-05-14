import {PlusCircle} from "lucide-react";
import React from "react";

export default function AddDevice(isDisabled) {
    return (
        <div className="flex flex-col items-center">
            <div className={`bg-gray-100 dark:bg-gray-700 rounded-md w-12 h-12 flex items-center justify-center mb-2 ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer'} transition-colors`}>
                <PlusCircle size={20} className="text-gray-600 dark:text-gray-300" />
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-300">Add Device</span>
        </div>
        )
}
