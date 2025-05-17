// src/layout/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../pages/navbar/Navbar.jsx";

export default function Layout() {
    return (
        <div className="flex flex-col w-screen h-screen ">
            <Navbar />
            <div
                className="flex-1 pt-2 overflow-auto bg-gray-50 dark:bg-neutral-800" style={{ scrollbarGutter: "stable" }}>
                    <Outlet />
            </div>
        </div>
    );
}