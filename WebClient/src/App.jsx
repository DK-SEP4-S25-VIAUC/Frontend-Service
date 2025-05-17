
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing-page/LandingPage";
import {ToastContainer} from "react-toastify";
import AppRoutes from "./appRoutes/AppRoutes.jsx";
import Navbar from "./pages/navbar/Navbar.jsx";
import Layout from "./layout/Layout.jsx";
function App() {
    return (
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
                <div className="flex justify-center items-center h-full">
                    <AppRoutes />
                </div>
            </div>
    );
}

export default App;
