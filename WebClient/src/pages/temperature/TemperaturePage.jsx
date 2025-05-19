import TemperatureWidget from "../../components/temperature/TemperatureWidget.jsx";


export default function  TemperaturePage () {
    return (
        <div className="grid grid-cols-1 gap-4 w-full items-start px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 w-full">
                <TemperatureWidget/>
            </div>
        </div>
    )
}