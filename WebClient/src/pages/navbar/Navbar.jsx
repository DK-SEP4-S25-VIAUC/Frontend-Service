function Navbar({ setSelectedSection }) {
    return (
        <div className="w-full">
            <div className="flex flex-col">
                <div
                    onClick={() => setSelectedSection("all")}
                    className="w-full mb-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-neutral-600 transition cursor-pointer"
                >
                    <div className="text-gray-800 dark:text-white font-medium py-3 px-4 rounded-lg">
                        All widgets
                    </div>
                </div>
                <div
                    onClick={() => setSelectedSection("temperature")}
                    className="w-full mb-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-neutral-600 transition cursor-pointer"
                >
                    <div className="text-gray-800 dark:text-white font-medium py-3 px-4 rounded-lg">
                        Temperature
                    </div>
                </div>
                <div
                    onClick={() => setSelectedSection("light")}
                    className="w-full mb-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-neutral-600 transition cursor-pointer"
                >
                    <div className="text-gray-800 dark:text-white font-medium py-3 px-4 rounded-lg">
                        Light
                    </div>
                </div>
                <div
                    onClick={() => setSelectedSection("water")}
                    className="w-full mb-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-neutral-600 transition cursor-pointer"
                >
                    <div className="text-gray-800 dark:text-white font-medium py-3 px-4 rounded-lg">
                        Water
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
