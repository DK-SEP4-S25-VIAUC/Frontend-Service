import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing-page/LandingPage";
import FetchExample from "./components/FetchExample.jsx";
import SoilHumidityCard from './components/soil-humidity/SoilHumidityLatestCard.jsx';
import WateringPredictionCard from './components/watering-prediction/WateringPredictionCard.jsx';
import CalendarCard from "./components/calender/CalenderCard.jsx";

function App() {
    return (
        <Router>
            <div className="min-h-screen">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    {/* Tilføj ekstra ruter hvis nødvendigt */}
                </Routes>
                {/* Hvis du vil inkludere komponenterne som en del af landing page */}
                <div className="flex justify-center items-center h-full">
                   {/*<SoilHumidityCard className="max-w-3xs" />
                    <WateringPredictionCard className="max-w-l" />*/}
                    {/*<FetchExample  />*/}
                </div>
            </div>
        </Router>
    );
}

export default App;
