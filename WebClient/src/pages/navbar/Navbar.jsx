function Navbar({ setSelectedSection }) {
    return (
        <div className="w-full">
            {/* Navbar Links */}
            <div className="flex flex-col">
                <div className="w-full mb-6 px-4 py-2 rounded hover:bg-gray-200 transition">
                    <button
                        onClick={() => setSelectedSection("soil-sensor")}
                        className="block text-gray-800 font-medium py-3 px-4 rounded-lg hover:bg-gray-200 transition"
                    >
                        Soil moisture
                    </button>
                </div>
                <div className="w-full mb-4">
                    <button
                        onClick={() => setSelectedSection("temperature")}
                        className="block text-gray-800 font-medium py-3 px-4 rounded-lg hover:bg-gray-200 transition"
                    >
                        Temperature
                    </button>
                </div>
                <div className="w-full mb-4">
                    <button
                        onClick={() => setSelectedSection("light")}
                        className="block text-gray-800 font-medium py-3 px-4 rounded-lg hover:bg-gray-200 transition"
                    >
                        Light
                    </button>
                </div>
                <div className="w-full mb-4">
                    <button
                        onClick={() => setSelectedSection("water")}
                        className="block text-gray-800 font-medium py-3 px-4 rounded-lg hover:bg-gray-200 transition"
                    >
                        Water
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Navbar;