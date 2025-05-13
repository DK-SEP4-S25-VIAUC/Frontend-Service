import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

function Navbar({ setSelectedSection, isSidebar = false }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleSelect = (section) => {
        setSelectedSection(section);
        if (!isSidebar) setMenuOpen(false);
    };

    const menuItems = [
        { key: "all", label: "All Widgets" },
        { key: "temperature", label: "Temperature" },
        { key: "light", label: "Light" },
        { key: "water", label: "Water" },
    ];

    const renderMenu = () => (
        <div className="flex flex-col space-y-2">
            {menuItems.map(item => (
                <div
                    key={item.key}
                    onClick={() => handleSelect(item.key)}
                    className="cursor-pointer w-full py-2 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-neutral-600 text-gray-800 dark:text-white font-medium transition"
                >
                    {item.label}
                </div>
            ))}
        </div>
    );

    if (isSidebar) {
        return renderMenu();
    }

    return (
        <div className="relative lg:hidden">
            <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-2xl text-gray-800 dark:text-white"
                aria-label="Toggle menu"
            >
                {menuOpen ? <FiX /> : <FiMenu />}
            </button>

            {menuOpen && (
                <div className={`fixed top-0 left-0 w-64 h-full bg-white dark:bg-neutral-800 z-50 shadow-lg p-4 overflow-y-auto transform transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>

                {renderMenu()}
                </div>
            )}
        </div>
    );
}

export default Navbar;
