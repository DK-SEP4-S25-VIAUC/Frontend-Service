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
    return (
        <>
            <div className="grid grid-cols-1 gap-4 w-full items-start px-4">
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 w-full">
                    <LightDisplayCard/>
                    <SoilHumidityCard/>
                    <AirHumidityLatestCard/>
                    <TemperatureWidget/>
                    <WateringPredictionCard className="md:col-span-1"/>
                    <SoilHumidityAlert/>
                    <ManualWateringCard className="max-w-xs mx-auto"/>
                    <AutomaticWateringCard/>
                </div>

                <div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 w-full">
                    <ActivityHistoryCard className="md:col-span-3"/>
                    <SoilHumidityInput/>
                </div>

                <div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 w-full">
                    <SoilHumidityHistoryCard className="md:col-span-4"/>
                    <QuickControlCard/>
                </div>
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
                </div>

            </div>
        </>
    );

}

export default LandingPage;
