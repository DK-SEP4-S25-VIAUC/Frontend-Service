import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const endpoint = "https://sep4api.azure-api.net/api/IoT/watering";

const sendWateringRequest = async (seconds) => {
    const response = await axios.post(endpoint, {
        cmd: "water",
        sec: seconds
    });
    return response.data;
};

export function useWateringRequest(options = {}) {
    return useMutation({
        mutationFn: sendWateringRequest,
        ...options
    });
}
