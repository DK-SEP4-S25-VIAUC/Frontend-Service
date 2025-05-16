// src/components/Navbar.jsx
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const links = [
        { to: "/",             label: "Home" },
        { to: "/water",        label: "Water" },
        { to: "/soilhumidity", label: "Soil Humidity" },
        { to: "/light",        label: "Light" },
        { to: "/temperature",  label: "Temperature" },
        { to: "/airhumidity",  label: "Air Humidity" },
    ];

    return (
        <nav className="w-full  bg-white dark:bg-gray-800 shadow">
            <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4">
                <Link to="/" className="text-2xl font-bold text-black dark:text-white">
                    Smart Greenhouse
                </Link>

                <div className="hidden lg:flex lg:space-x-6 dark:text-white">
                    {links.map(({ to, label }) => (
                        <Link key={to} to={to} className="hover:underline">
                            {label}
                        </Link>
                    ))}
                </div>

                <div className="lg:hidden">
                    <button
                        onClick={() => setMenuOpen(true)}
                        className="text-2xl text-gray-800 dark:text-white focus:outline-none"
                        aria-label="Open menu"
                    >
                        <FiMenu />
                    </button>
                </div>
            </div>

            {menuOpen && (
                <div className="fixed inset-0 bg-white dark:bg-gray-800 z-50 p-4 overflow-y-auto">
                    <div className="flex justify-between items-center mb-8">
                        <Link to="/" onClick={() => setMenuOpen(false)}
                              className="text-2xl font-bold text-black dark:text-white">
                            Smart Greenhouse
                        </Link>
                        <button
                            onClick={() => setMenuOpen(false)}
                            className="text-2xl text-gray-800 dark:text-white focus:outline-none"
                            aria-label="Close menu"
                        >
                            <FiX />
                        </button>
                    </div>
                    <div className="flex flex-col space-y-4 dark:text-white">
                        {links.map(({ to, label }) => (
                            <Link
                                key={to}
                                to={to}
                                onClick={() => setMenuOpen(false)}
                                className="text-lg"
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
