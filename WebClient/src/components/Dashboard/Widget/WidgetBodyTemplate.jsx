import React from "react";

export default function WidgetBodyTemplate({
                                               children,
                                               className = ""
                                           }) {
    return (
        <div className={`widget-container p-4 bg-white dark:bg-gray-800 shadow-md dark:shadow-md border border-gray-100 dark:border-gray-700 rounded-xl ${className}`}
             style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
            {children}
        </div>
    );
}