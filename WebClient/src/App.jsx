import './App.css'
import FetchExample from "./components/FetchExample.jsx";
import SoilHumidityCard from './components/soil-humidity/SoilHumidityLatestCard.jsx';
import RemoteWateringCard from "./components/remote-watering/RemoteWateringCard.jsx";

function App() {


  return (

    <div className="App">
      <header className="App-header">
        <h1>Testing API Endpoint</h1>
      </header>
      <main>
        <FetchExample />
        <div className="flex justify-center items-center h-full">
          <SoilHumidityCard className="max-w-3xs " />
        </div>
          <RemoteWateringCard className="max-w-3xs " />
      </main>
    </div>

  )
}

export default App
