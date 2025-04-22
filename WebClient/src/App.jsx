import './App.css'
import FetchExample from "./components/FetchExample.jsx";
import SoilHumidityCard from './components/soil-humidity/SoilHumidityLatestCard.jsx';

function App() {


  return (

    <div className="App">
      <header className="App-header">
        <h1>Testing API Endpoint</h1>
      </header>
      <main>
        <FetchExample />
        <SoilHumidityCard className="" />
      </main>
    </div>

  )
}

export default App
