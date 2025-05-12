
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing-page/LandingPage";
import {ToastContainer} from "react-toastify";



function App() {
    return (
        <Router>
            <div className="min-h-screen">
       <ToastContainer
            position="top-right">
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        </ToastContainer>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    {/* Tilføj ekstra ruter hvis nødvendigt */}
                </Routes>
                {/* Hvis du vil inkludere komponenterne som en del af landing page */}
                <div className="flex justify-center items-center h-full">

                </div>
            </div>
        </Router>
    );
}

export default App;
