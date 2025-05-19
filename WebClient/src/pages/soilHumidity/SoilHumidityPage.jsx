import WateringPredictionCard from "../../components/watering-prediction/WateringPredictionCard.jsx";
import ManualWateringCard from "../../components/manual-watering/ManualWateringCard.jsx";
import AutomaticWateringCard from "../../components/watering-automatic/AutomaticWateringCard.jsx";
import ActivityHistoryCard from "../../components/activity-history/ActivityHistoryCard.jsx";
import SoilHumidityCard from "../../components/soil-humidity/SoilHumidityLatestCard.jsx";
import SoilHumidityInput from "../../components/soil-humidity/SoilHumidityInput.jsx";
import SoilHumidityAlert from "../../components/soil-humidity/SoilHumidityAlert.jsx";
import SoilHumidityHistoryCard from "../../components/soil-humidity/soil-humidity-history/SoilHumidityHistoryCard.jsx";

export default function WaterPage() {

    return(
        <div className="grid grid-cols-1 gap-4 w-full items-start px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 w-full">
                <SoilHumidityCard />
                <SoilHumidityInput />
                <SoilHumidityAlert />
                <SoilHumidityHistoryCard className="md:col-span-4" />
            </div>
        </div>
    )
}