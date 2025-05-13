export default function WaterLevelInfo({ isLoading, waterValue, percentage, maxLevel }) {

    let statusColor = "text-green-500 bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800"
    let statusText = "Good"
  
    if (percentage <= 10) {
      statusColor = "text-red-500 bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800"
      statusText = "Critical"
    } else if (percentage <= 30) {
      statusColor = "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800"
      statusText = "Low"
    } else if (percentage >= 90) {
      statusText = "Full"
    }
  
    return (
      <div className="text-center flex flex-col items-center space-y-3">
        {isLoading ? (
          <div className="space-y-2 w-full">
            <div className="h-8 w-32 mx-auto bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 w-40 mx-auto bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-6 w-20 mx-auto bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
        ) : (
          <>
            <div className="text-4xl font-bold text-gray-800 dark:text-gray-200 flex items-baseline">
              <span>{(waterValue / 1000).toFixed(1)}</span>
              <span className="text-xl ml-1">L</span>
            </div>
  
            <div className="text-sm text-gray-500 dark:text-gray-400">of {(maxLevel / 1000).toFixed(1)}L capacity</div>
  
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${statusColor}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              <span>
                {Math.round(percentage)}% • {statusText}
              </span>
            </div>
          </>
        )}
      </div>
    )
  }
  