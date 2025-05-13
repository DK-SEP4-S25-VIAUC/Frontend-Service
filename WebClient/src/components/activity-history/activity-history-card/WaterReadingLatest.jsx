import React from 'react';
import  WaterLevelInfo from "./WaterLevelInfo";
import WaterTankDisplay from "./WaterTankDisplay";


export default function WaterReadingLatestCard({ className = "", waterReadings }) {
    const { data, isLoading, isError, error, refetch } = waterReadings;

    const maxWaterLevel = 2000;
    const waterValue = data || 0;
    const waterPercentage = Math.min(Math.max((waterValue / maxWaterLevel) * 100, 0), 100);

    return (
        <div className={`${className} bg-white dark:bg-gray-800`}>
            <div className="p-6 flex flex-col items-center">
                <WaterTankDisplay percentage={waterPercentage}/>
                <WaterLevelInfo
                    isLoading={isLoading}
                    waterValue={waterValue}
                    percentage={waterPercentage}
                    maxLevel={maxWaterLevel}
                />
            </div>
        </div>
    );
}