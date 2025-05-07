import './App.css'
import FetchExample from "./components/FetchExample.jsx";
import SoilHumidityCard from './components/soil-humidity/SoilHumidityLatestCard.jsx';
import RemoteWateringCard from "./components/remote-watering/RemoteWateringCard.jsx";
import QuickControlCard from "./components/quick-controls/QuickControlCard.jsx";
import {ToastContainer} from "react-toastify";

function App() {


  return (
    <div className="App">
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
      <header className="App-header">
        <h1>Testing API Endpoint</h1>
      </header>
      <main>
        <div className="flex justify-center items-center h-full">
          <SoilHumidityCard className="max-w-3xs " />
        </div>
          <div className={"m-4"}> <QuickControlCard></QuickControlCard></div>
          <RemoteWateringCard className="max-w-3xs " />
      </main>
    </div>

  )
}

export default App
