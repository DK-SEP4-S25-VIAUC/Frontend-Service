import { useQuery } from '@tanstack/react-query';
import { fetchSoilHumidityHistory } from '../../api/soilHumidityHistoryApi';

const DEFAULT_STALE_TIME = 5 * 60 * 1000; // 5 minutes


export function useSoilHumidityHistory(from, to, options = {}) {
  return useQuery({
    queryKey: ['soilHumidity', 'history', from, to],
    queryFn: () => fetchSoilHumidityHistory(from, to),
    enabled: !!from && !!to,
    staleTime: DEFAULT_STALE_TIME,
    refetchOnWindowFocus: false,
    ...options,
  });
}
