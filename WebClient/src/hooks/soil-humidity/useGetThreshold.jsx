import {useQuery} from "@tanstack/react-query";
import axios from "axios";

export default function useGetThreshold() {
    const endPoint = "https://sep4api.azure-api.net/api/iot/soilhumidity/threshold"

    const getSoilHumidityThreshold = async () => {
        const response = await axios.get(endPoint);
        return response.data;
    }

    const {data: soilHumidityThreshold, error, isLoading} = useQuery({
        queryFn: getSoilHumidityThreshold,
        queryKey: ["soilHumidityThreshold"]
    });

    return (
        {
            soilHumidityThreshold,
            error,
            isLoading
        }
    )
}