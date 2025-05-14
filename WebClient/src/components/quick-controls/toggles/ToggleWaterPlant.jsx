import { Droplets } from "lucide-react";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useWateringRequest } from "../../../hooks/watering/useWateringRequest.js";

export default function ToggleWaterPlant({ isDisabled, waterAmount }) {
    useEffect(() => {
        console.debug("ToggleWaterPlant received waterAmount:", waterAmount);
    }, [waterAmount]);

    const wateringMutation = useWateringRequest({
        onSuccess: (data) => {
            const ml = data?.watered_amount ?? 'N/A';

            toast.update("watering", {
                render: `Watering successful: ${ml} ml`,
                type: "success",
                isLoading: false,
                autoClose: 2000,
            });
            console.debug("Watering successful:", data);
        },
        onError: (error) => {
            toast.update("watering", {
                render: `Watering failed: ${error.message}`,
                type: "error",
                isLoading: false,
                autoClose: 2000,
            });
            console.error("Watering failed:", error);
        }
    });

    const handleWaterPlant = () => {
        if (isDisabled) return;
        toast.loading("Watering plant...", { toastId: "watering" });
        wateringMutation.mutate(waterAmount);
    };

    return (
        <div className="flex flex-col items-center">
            <div
                className={`bg-gray-100 dark:bg-gray-700 rounded-md w-12 h-12 flex items-center justify-center mb-2 ${
                    isDisabled || wateringMutation.isPending
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
                } transition-colors`}
                onClick={handleWaterPlant}
            >
                <Droplets size={20} className="text-gray-600 dark:text-gray-300" />
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-300 whitespace-nowrap text-center">
    Water Plant{waterAmount ? ` (${waterAmount} ml)` : ""}
            </span>
        </div>
    );
}
