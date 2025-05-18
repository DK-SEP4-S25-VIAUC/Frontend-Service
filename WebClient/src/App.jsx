import {ToastContainer} from "react-toastify";
import AppRoutes from "./appRoutes/AppRoutes.jsx";

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
