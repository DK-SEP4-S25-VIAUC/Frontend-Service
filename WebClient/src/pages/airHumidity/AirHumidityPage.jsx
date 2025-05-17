import AirHumidityLatestCard from "../../components/air-humidity/AirHumidityLatestCard.jsx";

export default function AirHumidityPage () {

    return (
        <div className="grid grid-cols-1 gap-4 w-full items-start px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 w-full">
                <AirHumidityLatestCard/>
            </div>
        </div>
    )
}