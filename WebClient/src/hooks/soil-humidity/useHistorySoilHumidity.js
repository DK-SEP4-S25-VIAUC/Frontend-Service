import { useQuery } from '@tanstack/react-query'
import { fetchSoilHumidityHistory } from '../api/soilHumidityHistoryApi'

const DEFAULT_STALE_TIME = 5 * 60 * 1000 // 5 minutes

export function useSoilHumidityHistory(options = {}) { //If options is not filled out, it defaults to an empty object {}
  const { //Const as it wont be changed
    staleTime = DEFAULT_STALE_TIME,
    refetchOnWindowFocus = false,
    ...restOptions // Rest of options, if options contains extra variables
  } = options

  const { data, isLoading, error } = useQuery( //Const as it wont be changed
    ['soilHumidityHistory'],
    fetchSoilHumidityHistory,
    {
      staleTime,
      refetchOnWindowFocus,
      ...restOptions,
    }
  )

  return { data, isLoading, error }
}

