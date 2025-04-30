import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing-page/LandingPage";

function App() {
    return (
        <Router>
            <div className="min-h-screen">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    {/* Hvis du har flere ruter, kan du tilføje dem her */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
