import { useQuery } from '@tanstack/react-query'
import { fetchSoilHumidityHistory } from '../../api/soilHumidityHistoryApi'

const DEFAULT_STALE_TIME = 5 * 60 * 1000 // 5 minutes

export function useSoilHumidityHistory(options = {}) {
  return useQuery({
    queryKey: ['soilHumidity', 'history'],
    queryFn: fetchSoilHumidityHistory,
    staleTime: DEFAULT_STALE_TIME,
    refetchOnWindowFocus: false,
    ...options,
  })
}
