import { useQuery } from '@tanstack/react-query';
import { fetchWateringPrediction } from '../../api/wateringPredictionApi';

export function useWateringPrediction(options = {}) {
    return useQuery({
        queryKey: ['wateringPrediction'],
        queryFn: fetchWateringPrediction,
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
        ...options,
    });
}