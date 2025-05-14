import { useQuery } from '@tanstack/react-query';
import { fetchLatestLightReading } from '../../api/lightReadingApi';

export function useLatestLightReading(options = {}) {
  return useQuery({
    queryKey: ['light', 'latest'],
    queryFn: fetchLatestLightReading,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    ...options,
  });
}