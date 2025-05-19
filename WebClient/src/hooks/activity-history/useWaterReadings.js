import { useQuery } from '@tanstack/react-query';
import { fetchWaterReadings } from '../../api/waterReadingsApi';

export function useWaterReadings(options = {}) {
    return useQuery({
        queryKey: ['waterReadings', 'latest'],
        queryFn: fetchWaterReadings,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        ...options,
    });
}
