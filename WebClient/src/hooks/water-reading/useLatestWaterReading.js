import {useQuery} from "@tanstack/react-query";
import {fetchWaterReadingLatest} from "../../api/waterReadingLatestApi";

export function useLatestWaterReading(options = {}) {
    return useQuery({
        queryKey: ['waterReading', 'latest'],
        queryFn: fetchWaterReadingLatest,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        ...options,
    });
}