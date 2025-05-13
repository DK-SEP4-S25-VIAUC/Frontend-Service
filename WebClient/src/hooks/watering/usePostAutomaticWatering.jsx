import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";

export default function usePostAutomaticWatering() {

    const endPoint = "https://sep4api.azure-api.net/api/iot/watering/mode";

    const queryClient = useQueryClient();

    const postAutomaticWatering = async (automaticWateringMode) => {
        const response = await axios.put(endPoint,automaticWateringMode);
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
        mutationFn: postAutomaticWatering,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['AutomaticWateringStatus'] })
        },
    });

    return {
        submitAutomaticWatering: mutate,
        isPending,
        isSuccess,
        isError,
        error,
        data
    };
}