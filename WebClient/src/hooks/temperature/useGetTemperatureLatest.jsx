import axios from "axios";
import {useQuery} from "@tanstack/react-query";

export function useGetTemperatureLatest() {
    const endpoint = 'https://sep4api.azure-api.net/api/IoT/temperature/latest';


    const fetchTemperatureLatest = async () => {
        const response = await axios.get(endpoint);
        return response.data;
    }

    const {data: temperatureLatest, error, isLoading} = useQuery({
        queryFn: fetchTemperatureLatest,
        queryKey: ['temperatureLatest'],
        }
    )
    return {temperatureLatest, error, isLoading}
}