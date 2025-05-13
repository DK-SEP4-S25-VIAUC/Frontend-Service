import { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import Graph from "../../components/graph/Graph";
import CalendarModal from "../../components/calender/CalenderModal";

function LandingPage() {
    const [selectedSection, setSelectedSection] = useState("soil-sensor");

    const [soilData, setSoilData] = useState({
        moisture: 70,
        temperature: 22,
    });

    const [showCalendar, setShowCalendar] = useState(false);
    const [calendarRange, setCalendarRange] = useState([new Date(), new Date()]);

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
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const renderContent = () => {
        switch (selectedSection) {
            case "soil-sensor":
                return (
                    <div>
                        <button
                            onClick={() => setShowCalendar(true)}
                            className="mb-4 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
                        >
                            Show Calendar
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                            <Graph data={{ moisture: soilData.moisture }} title="Soil Moisture" />
                            <Graph data={{ temperature: soilData.temperature }} title="Soil Temperature" />
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
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="mb-6">
                <div className="w-full bg-white p-4">
                    <h1 className="text-3xl font-bold text-black">Smart Greenhouse</h1>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-64 border border-black p-4 rounded-lg bg-white mb-4 lg:mb-0 lg:mr-6 h-fit">
                    <Navbar setSelectedSection={setSelectedSection} />
                </div>

                <div className="flex-grow">
                    {renderContent()}
                </div>
            </div>

            {selectedSection === "soil-sensor" && showCalendar && (
                <CalendarModal
                    onClose={() => setShowCalendar(false)}
                    range={calendarRange}
                    setRange={setCalendarRange}
                />
            )}
        </div>
    );
}

export default LandingPage;
