import React from "react";

export default function WidgetBodyTemplate({
                                               children,
                                               className = ""
                                           }) {
    return (
        <div className={`widget-container p-4 bg-white dark:bg-gray-800 rounded-lg shadow ${className}`}
             style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
            {children}
        </div>
    );
}