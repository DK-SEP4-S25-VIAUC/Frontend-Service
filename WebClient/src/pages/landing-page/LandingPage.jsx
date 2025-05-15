import { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import Graph from "../../components/graph/Graph";
import SoilHumidityHistoryCard from "../../components/soil-humidity/soil-humidity-history/SoilHumidityHistoryCard";
import WateringPredictionCard from "../../components/watering-prediction/WateringPredictionCard.jsx";
import SoilHumidityCard from "../../components/soil-humidity/SoilHumidityLatestCard.jsx";
import QuickControlCard from "../../components/quick-controls/QuickControlCard.jsx";
import ManualWateringCard from "../../components/manual-watering/ManualWateringCard.jsx";
import { Activity } from "lucide-react";
import ActivityHistoryCard from "../../components/activity-history/ActivityHistoryCard.jsx";
import SoilHumidityInput from "../../components/soil-humidity/SoilHumidityInput.jsx";
import SoilHumidityAlert from "../../components/soil-humidity/SoilHumidityAlert.jsx";
import AirHumidityLatestCard from "../../components/air-humidity/AirHumidityLatestCard.jsx";
import AutomaticWateringCard from "../../components/watering-automatic/AutomaticWateringCard.jsx";
import LightDisplayCard from "../../components/light/LightDisplayCard.jsx";

function LandingPage() {
    const [selectedSection, setSelectedSection] = useState("all");
    const [soilData, setSoilData] = useState({
        moisture: 70,
        temperature: 22,
    });
    const temperatureData = { current: 20 };
    const lightData = { intensity: 80 };
    const waterData = { level: 50 };

    useEffect(() => {
        const interval = setInterval(() => {
            const newMoisture = Math.floor(Math.random() * 100);
            setSoilData(prev => ({
                ...prev,
                moisture: newMoisture,
            }));
        }, 100000);
        return () => clearInterval(interval);
    }, []);


    const renderContent = () => {
        switch (selectedSection) {
            case "all":
                return (
                    <div className="grid grid-cols-1 gap-1 w-full items-start">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-1 w-full items-start">
                            <WateringPredictionCard className="max-w-l md:col-span-2 ml-2 mr-2 " />
                            <SoilHumidityCard/>
                            <AirHumidityLatestCard/>
                            <SoilHumidityCard className="max-w-3xs md:col-span-1 ml-2 mr-2" />
                            <LightDisplayCard className="max-w-3xs md:col-span-1 ml-2 mr-2" />
                            <SoilHumidityInput/>
                            <SoilHumidityAlert/>
                            <AutomaticWateringCard/>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-1 w-full items-start">
                            <QuickControlCard className="md:col-span-3 ml-2"></QuickControlCard>
                            <ManualWateringCard className="md:col-span-3 ml-2"></ManualWateringCard>
                            <ActivityHistoryCard className="col-span-3" />
                            <SoilHumidityInput/>
                            <SoilHumidityAlert/>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                            <SoilHumidityHistoryCard />
                        </div>
                    </div>
                );
            case "temperature":
                return <Graph data={temperatureData} title="Temperature" />;
            case "light":
                return <Graph data={lightData} title="Light Intensity" />;
            case "water":
                return <Graph data={waterData} title="Water Level" />;
            default:
                return <Graph data={soilData} title="Soil Data" />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-neutral-800 p-6 transition-colors duration-200">
            <div className="mb-6">
                <div className="w-full bg-white dark:bg-neutral-700 p-4 rounded-lg">
                    <h1 className="text-3xl font-bold text-black dark:text-white">Smart Greenhouse</h1>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-64 border border-gray-300 dark:border-neutral-700 p-4 rounded-lg bg-white dark:bg-neutral-700  mb-4 lg:mb-0 lg:mr-6 h-fit">
                    <Navbar setSelectedSection={setSelectedSection} />
                </div>
                <div className="flex-grow">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}

export default LandingPage;