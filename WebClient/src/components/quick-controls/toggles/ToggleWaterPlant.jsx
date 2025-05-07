import {Droplets} from "lucide-react";
import React, {useEffect} from "react";
import {sendWateringRequest} from "../../../api/wateringApi.js";
import {toast,ToastContainer} from "react-toastify";


export default function ToggleWaterPlant({isDisabled, waterAmount}) {

    useEffect(() => {
        console.debug("ToggleWaterPlant received waterAmount:", waterAmount);
    }, [waterAmount]);

    const handleWaterPlant = async () => {
        if (isDisabled) return;

        try{
            const toastId = toast.loading("Watering plant...");

            const result = await sendWateringRequest(waterAmount);
            console.debug("Watering successful:", result);
            toast.update(toastId, {
                render: 'Watering successful: ' + result.data.waterAmount,
                type: "success",
                isLoading: false,
                autoClose: 2000,
            });

        } catch (error) {
            console.error("watering failed:", error);
            toast.error(`Watering failed: ${error.message}`);
        }
    }

    return (
        <div className="flex flex-col items-center">
            <div
                className={`bg-gray-100 dark:bg-gray-700 rounded-md w-12 h-12 flex items-center justify-center mb-2 ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer'} transition-colors`}
            onClick={handleWaterPlant}>
                <Droplets size={20} className="text-gray-600 dark:text-gray-300" />
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-300">
                Water Plant {waterAmount ? `(${waterAmount}ml)` : ''}
            </span>
        </div>
    )
}