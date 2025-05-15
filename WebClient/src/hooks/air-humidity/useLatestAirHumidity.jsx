import { useQuery } from '@tanstack/react-query';
import { fetchLatestAirHumidity } from '../../api/airHumidityLatestApi';

export function useLatestAirHumidity(options = {}) {
  return useQuery({
    queryKey: ['airHumidity', 'latest'],
    queryFn: fetchLatestAirHumidity,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    ...options,
  });
}