import React from "react";
import { useWateringPrediction } from "../../hooks/watering-prediction/useWateringPrediction";
import Header from "./watering-prediction-card/Header";
import Loader from "../Loader";
import ErrorMessage from "../ErrorMessage";
import PredictionDisplay from "./watering-prediction-card/WateringPredictionDisplay";

export default function WateringPredictionCard({ className = "" }) {

    const { data, isLoading, isError, error, refetch } = useWateringPrediction({
        refetchInterval: 1000 * 60 * 5, // 5 minutes
    });
    
    return (
        <div className={`${className} p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all`}>
        <Header onRefresh={refetch} />
    
        {isLoading ? (
            <Loader />
        ) : isError ? (
            <ErrorMessage error={error} />
        ) : (
            <PredictionDisplay next_watering_time={data.forecastDTO.next_watering_time} />
        )}
        </div>
    );
}
