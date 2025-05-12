import React from "react";

export default function WidgetContentTemplate({
                                                  isLoading,
                                                  error,
                                                  loadingMessage = "Loading data...",
                                                  errorMessage = "Error loading data",
                                                  children
                                              }) {
    return (
        <div className="widget-content mt-4" style={{ height: 'calc(100% - 40px)', overflow: 'auto' }}>
            {isLoading ? (
                <div className="flex justify-center items-center h-24">
                    <p className="text-gray-500 dark:text-gray-400">{loadingMessage}</p>
                </div>
            ) : error ? (
                <div className="text-red-500 dark:text-red-400">
                    {typeof errorMessage === 'function' ? errorMessage(error) : errorMessage}
                </div>
            ) : (
                children
            )}
        </div>
    );
}