import React from 'react';
import WidgetBodyTemplate from "./WidgetBodyTemplate.jsx";
import dayjs from "dayjs";
import WidgetContent from "./WidgetContentTemplate.jsx";
import {useGetTemperatureLatest} from "../../../hooks/temperature/useGetTemperatureLatest.jsx";
import {useMinimumAnimation} from "../../../hooks/Animation/useMinimumAnimation.js";
import WidgetHeader from "./WidgetHeaderTemplate.jsx";


export default function WidgetCompleteTest() {

    // Use your React Query hook
    const { temperatureLatest, error, isLoading } = useGetTemperatureLatest();

    // Animation for refresh button
    const [isRefreshing, startRefreshing] = useMinimumAnimation(isLoading);

    const handleRefresh = () => {
        startRefreshing();
    };
  return (

      <WidgetBodyTemplate breakpoint="md">
          <WidgetHeader
              icon="thermometer"
              iconColor="text-red-500"
              iconColorDark="dark:text-red-400"
              title="Temperature"
              isLoading={isRefreshing}
              onRefresh={handleRefresh}
          />
          <WidgetContent
              isLoading={isLoading}
              error={error}
              errorMessage="Error loading temperature data"
          >
              <div className="flex flex-col items-center">
                    <span className="text-4xl font-bold text-gray-800 dark:text-white">
                        {temperatureLatest?.temperature_value}°C
                    </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        Last updated: {temperatureLatest?.time_stamp ?
                      dayjs(temperatureLatest.time_stamp).format('HH:mm:ss') : ''}
                    </span>
              </div>
          </WidgetContent>

      </WidgetBodyTemplate>
  );
}