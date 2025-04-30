import { Link } from "react-router-dom";

function Navbar() {
    return (
        <div className="w-48 bg-white p-4 rounded-lg shadow-lg border border-gray-300">
            {/* Navbar header */}
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Navbar</h2>

            {/* Navbar Links */}
            <div className="flex flex-col space-y-2">
                <div className="w-full">
                    <Link
                        to="/soil-sensor"
                        className="block text-black font-semibold py-2 px-4 rounded transition-all duration-300 hover:bg-gray-500 "
                    >
                        Soil Sensor
                    </Link>
                </div>
                <div className="w-full">
                    <Link
                        to="/temperature"
                        className="block text-gray-800 font-semibold py-2 px-4 rounded transition-all duration-300 hover:bg-gray-500 "
                    >
                        Temperature
                    </Link>
                </div>
                <div className="w-full">
                    <Link
                        to="/light"
                        className="block text-gray-800 font-semibold py-2 px-4 rounded transition-all duration-300 hover:bg-gray-500 "
                    >
                        Light
                    </Link>
                </div>
                <div className="w-full">
                    <Link
                        to="/water"
                        className="block text-gray-800 font-semibold py-2 px-4 rounded transition-all duration-300 hover:bg-gray-500 "
                    >
                        Water
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
