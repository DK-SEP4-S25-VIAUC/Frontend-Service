import { useQuery } from '@tanstack/react-query';
import { fetchWaterReadings } from '../../api/waterReadingsApi';

const MAX_WATER_CAPACITY = 2000;

export function useWaterReadings(options = {}) {
    return useQuery({
        queryKey: ['waterReadings', 'latest'],
        queryFn: fetchWaterReadings,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        select: (readings) => {
            const totalWaterUsed = readings.reduce((sum, reading) => sum + reading.watered_amount, 0);
            const currentLevel = Math.max(0, MAX_WATER_CAPACITY - totalWaterUsed);

            return {
                readings,
                currentLevel,
            };
        },
        ...options,
    });
}
