import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";

export default function usePostSoilHumidity() {
    const endPoint = ""

    const queryClient = useQueryClient();

    const postSoilHumidityData = async (desiredSoilHumidity) => {
        const response = await axios.post(endPoint,desiredSoilHumidity);
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