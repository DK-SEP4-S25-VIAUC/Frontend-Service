import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const endpoint = "https://sep4api.azure-api.net/api/IoT/water/manual";

const sendWateringRequest = async (wateredAmount) => {
    const response = await axios.post(endpoint, {
        watered_amount: wateredAmount
    });
    return response.data;
};

export function useWateringRequest(options = {}) {
    return useMutation({
        mutationFn: sendWateringRequest,
        ...options
    });
}
