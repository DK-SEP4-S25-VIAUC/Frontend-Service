// WidgetHeaderTemplate.jsx
import React from "react"
import { RefreshCw } from "lucide-react";
import * as LucideIcons from "lucide-react";

export default function WidgetHeaderTemplate({ onRefresh,
                                         icon,
                                         iconColor = "text-emerald-500",
                                         iconColorDark = "dark:text-emerald-400",
                                         title,
                                         isLoading = false
}) {
    const IconComponent = LucideIcons[icon.charAt(0).toUpperCase() + icon.slice(1)] || LucideIcons.Info;
    return (
        <div className="flex items-center justify-between mb-">
            <div className="flex items-center gap-2">
                <IconComponent className={`h-5 w-5 ${iconColor} ${iconColorDark}`} />
                <h3 className="text-base font-medium text-gray-800 dark:text-gray-100">{title}</h3>
            </div>
            <button
                onClick={onRefresh}
                className="p-1.5 rounded-full text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-gray-700 transition-colors focus:outline-none"
                aria-label="Refresh data"
            >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
        </div>
    )
}