import { useState } from "react";
import Navbar from "../navbar/Navbar";
import Graph from "../../components/graph/Graph";

function LandingPage() {
    const [selectedSection, setSelectedSection] = useState("soil-sensor");

    const soilData = {
        moisture: 20,
        temperature: 22,
    };
    const temperatureData = { current: 20 };
    const lightData = { intensity: 80 };
    const waterData = { level: 50 };

    const renderContent = () => {
        switch (selectedSection) {
            case "soil-sensor":
                return (
                    <div className="flex flex-col gap-6 w-full">
                        <Graph data={{ moisture: soilData.moisture }} title="Soil Moisture" />
                        <Graph data={{ temperature: soilData.temperature }} title="Soil Temperature" />
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
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-black">Smart Greenhouse</h1>
            </div>

            {/* Layout: Sidebar + Content */}
            <div className="flex">
                {/* Navbar (Sidebar) */}
                <div className="w-64 border border-black p-4 rounded-lg bg-white mr-6 h-fit">
                    <Navbar setSelectedSection={setSelectedSection} />
                </div>

                {/* Graphs */}
                <div className="flex-grow">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
