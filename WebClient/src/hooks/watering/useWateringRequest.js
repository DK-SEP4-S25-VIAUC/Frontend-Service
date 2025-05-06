import { useMutation } from "@tanstack/react-query";
import { sendWateringRequest } from "../../api/wateringApi";

export function useWateringRequest(options = {}) {
    return useMutation({
        mutationFn: (waterAmount) => sendWateringRequest(waterAmount),
        ...options,
    });
}