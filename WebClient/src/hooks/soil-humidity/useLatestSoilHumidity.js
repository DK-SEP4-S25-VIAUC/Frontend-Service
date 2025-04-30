import { useQuery } from '@tanstack/react-query';
import { fetchLatestSoilHumidity } from '../../api/soilHumidityLatestApi';

export function useLatestSoilHumidity(options = {}) {
  return useQuery({
    queryKey: ['soilHumidity', 'latest'],
    queryFn: fetchLatestSoilHumidity,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    ...options,
  });
}