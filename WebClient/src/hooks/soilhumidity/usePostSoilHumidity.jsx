import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";

export default function usePostSoilHumidity() {
    const endPoint = "https://sep4api.azure-api.net/api/iot/soilhumidity/threshold"

    const queryClient = useQueryClient();

    const postSoilHumidityData = async (soilHumidity) => {
        const response = await axios.post(endPoint,soilHumidity);
        return response.data;
    }

    const {
        mutate,
        isPending,
        isSuccess,
        isError,
        error,
        data
    } = useMutation({
        mutationFn: postSoilHumidityData,
        onSuccess: async () => {
            await queryClient.invalidateQueries({})
        },
    });

    return {
        submitSoilHumidityData: mutate,
        isPending,
        isSuccess,
        isError,
        error,
        data
    };
}