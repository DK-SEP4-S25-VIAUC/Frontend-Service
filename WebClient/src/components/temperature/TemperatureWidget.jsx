import React from 'react';
import WidgetHeader from '../Dashboard/Widget/WidgetHeaderTemplate.jsx';
import WidgetBody from '../Dashboard/Widget/WidgetBodyTemplate.jsx';
import WidgetContent from '../Dashboard/Widget/WidgetContentTemplate.jsx';
import { useGetTemperatureLatest } from "../../hooks/temperature/useGetTemperatureLatest.jsx";
import { useQueryClient } from '@tanstack/react-query';
import { useMinimumAnimation } from "../../hooks/Animation/useMinimumAnimation.js";
import dayjs from 'dayjs';

function TemperatureWidget() {

    const queryClient = useQueryClient();

    const { temperatureLatest, error, isLoading } = useGetTemperatureLatest();

    const [isRefreshing, startRefreshing] = useMinimumAnimation(isLoading);

    const handleRefresh = () => {
        startRefreshing();
        queryClient.invalidateQueries({ queryKey: ['temperatureLatest'] });
    };

    return (
        <WidgetBody>
            <WidgetHeader
                icon="thermometer"
                iconColor="text-red-500"
                iconColorDark="dark:text-red-400"
                title="Temperature"
                onRefresh={handleRefresh}
                isLoading={isRefreshing}
            />

            <WidgetContent
                isLoading={isLoading}
                error={error}
                errorMessage="Error loading temperature data"
            >
                <div className="flex flex-col items-center">
                    <span className="text-4xl font-bold text-gray-800 dark:text-white">
                        {temperatureLatest?.TemperatureDTO?.temperature_value}°C
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        Last updated: {temperatureLatest?.TemperatureDTO?.time_stamp ?
                        dayjs().format('HH:mm:ss') : ''}
                    </span>
                </div>
            </WidgetContent>
        </WidgetBody>
    );
}

export default TemperatureWidget;