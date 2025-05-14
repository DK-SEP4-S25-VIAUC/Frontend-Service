import { useState } from "react";

import Navbar from "../navbar/Navbar";
import WateringPredictionCard from "../../components/watering-prediction/WateringPredictionCard.jsx";
import SoilHumidityCard from "../../components/soil-humidity/SoilHumidityLatestCard.jsx";
import SoilHumidityInput from "../../components/soil-humidity/SoilHumidityInput.jsx";
import SoilHumidityAlert from "../../components/soil-humidity/SoilHumidityAlert.jsx";
import QuickControlCard from "../../components/quick-controls/QuickControlCard.jsx";

function LandingPage() {
    const [selectedSection, setSelectedSection] = useState("all");
    const renderContent = () => {
        switch (selectedSection) {
            case "all":
                return (
                    <div className="grid grid-cols-1 gap-1 w-full items-start">
                        <div className="grid grid-cols-1 gap-1 w-full items-start">
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-1 w-full items-start">
                                <WateringPredictionCard className="max-w-l md:col-span-2 ml-2 mr-2 " />
                                <SoilHumidityCard className="max-w-3xs md:col-span-1 ml-2 mr-2" />
                                <SoilHumidityInput/>
                                <SoilHumidityAlert/>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-2 gap-1 w-full items-start">
                                <QuickControlCard className="md:col-span-2 ml-2"></QuickControlCard>
                            </div>
                        </div>
                    </div>
                );
            case "temperature":
                return <div className="grid grid-cols-1 gap-1 w-full items-start">
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
