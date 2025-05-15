import { useState } from "react";
import Navbar from "../navbar/Navbar";

import SoilHumidityHistoryCard from "../../components/soil-humidity/soil-humidity-history/SoilHumidityHistoryCard";
import WateringPredictionCard from "../../components/watering-prediction/WateringPredictionCard.jsx";
import SoilHumidityCard from "../../components/soil-humidity/SoilHumidityLatestCard.jsx";
import QuickControlCard from "../../components/quick-controls/QuickControlCard.jsx";
import ManualWateringCard from "../../components/manual-watering/ManualWateringCard.jsx";
import ActivityHistoryCard from "../../components/activity-history/ActivityHistoryCard.jsx";
import SoilHumidityInput from "../../components/soil-humidity/SoilHumidityInput.jsx";
import SoilHumidityAlert from "../../components/soil-humidity/SoilHumidityAlert.jsx";
import AirHumidityLatestCard from "../../components/air-humidity/AirHumidityLatestCard.jsx";
import AutomaticWateringCard from "../../components/watering-automatic/AutomaticWateringCard.jsx";
import LightDisplayCard from "../../components/light/LightDisplayCard.jsx";
import TemperatureWidget from "../../components/temperature/TemperatureWidget.jsx";

function LandingPage() {
    const [selectedSection, setSelectedSection] = useState("all");
    const renderContent = () => {
        switch (selectedSection) {
            case "all":
                return (
                    <div className="grid grid-cols-1 gap-4 w-full items-start px-4">

                        {/* Top section: cards in a 5-column grid on md+ */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 w-full">
                            <LightDisplayCard />
                            <SoilHumidityCard />
                            <AirHumidityLatestCard />
                            <TemperatureWidget />
                            <WateringPredictionCard className="md:col-span-1" />
                            <SoilHumidityAlert/>
                            <ManualWateringCard className="max-w-xs mx-auto" />
                            <AutomaticWateringCard />

                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 w-full">
                            <ActivityHistoryCard className="md:col-span-3" />
                            <SoilHumidityInput />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 w-full">
                            <SoilHumidityHistoryCard className="md:col-span-4" />
                            <QuickControlCard />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
                        </div>
                    </div>
                );
            case "temperature":
                return <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 w-full">
                    <h1>Empty temperature</h1>
                </div>;
            case "light":
                return <h1>Empty light</h1>;
            case "water":
                return <h1>Empty Water</h1>;
            default:
                return <div className="grid grid-cols-1 gap-1 w-full items-start">
                </div>;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-neutral-800 p-6 transition-colors duration-200">
            <div className="mb-6">
                <div className="w-full bg-white dark:bg-neutral-700 p-4 rounded-lg flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-black dark:text-white">Smart Greenhouse</h1>
                    {/* Navbar handles the burger internally */}
                    <Navbar setSelectedSection={setSelectedSection} />
                </div>
            </div>

            <div className="flex flex-col lg:flex-row">
                {/* Sidebar for large screens */}
                <div className="hidden lg:block w-full lg:w-64 border border-gray-300 dark:border-neutral-700 p-4 rounded-lg bg-white dark:bg-neutral-700 mb-4 lg:mb-0 lg:mr-6 h-fit">
                    <Navbar setSelectedSection={setSelectedSection} isSidebar />
                </div>

                <div className="flex-grow">{renderContent()}</div>
            </div>
        </div>
    );
}

export default LandingPage;
