import WaterLevelInfo from "./WaterLevelInfo"
import WaterTankDisplay from "./WaterTankDisplay"

export default function WaterReadingLatest({ className = "", waterReadings }) {
  const { data, isLoading} = waterReadings

  const maxWaterLevel = 2000
  const waterValue = data || 0
  const waterPercentage = Math.min(Math.max((waterValue / maxWaterLevel) * 100, 0), 100)

  return (
    <div
      className={`${className} bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <WaterTankDisplay percentage={waterPercentage} />
        <WaterLevelInfo
          isLoading={isLoading}
          waterValue={waterValue}
          percentage={waterPercentage}
          maxLevel={maxWaterLevel}
        />
      </div>
    </div>
  )
}
