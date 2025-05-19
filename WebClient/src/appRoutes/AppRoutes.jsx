import {Routes, Route} from "react-router-dom";
import LandingPage from "../pages/landing-page/LandingPage.jsx";
import WaterPage from "../pages/water/WaterPage.jsx";
import SoilHumidityPage from "../pages/soilHumidity/SoilHumidityPage.jsx";
import Layout from "../layout/Layout.jsx";
import LightPage from "../pages/light/LightPage.jsx";
import TemperaturePage from "../pages/temperature/TemperaturePage.jsx";
import AirHumidityPage from "../pages/airHumidity/AirHumidityPage.jsx";

export default function AppRoutes() {
    return (
        <>
            <Routes>
                <Route element={<Layout/>}>
                    <Route path="/" element={<LandingPage/>}/>
                    <Route path="/water" element={<WaterPage/>}/>
                    <Route path="/soilhumidity" element={<SoilHumidityPage/>}/>
                    <Route path="/light" element={<LightPage/>}/>
                    <Route path="/temperature" element={<TemperaturePage/>}/>
                    <Route path="/airhumidity" element={<AirHumidityPage/>}/>
                </Route>
            </Routes>
        </>
    )
}