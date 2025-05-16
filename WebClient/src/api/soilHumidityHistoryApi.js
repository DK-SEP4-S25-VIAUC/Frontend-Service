const API_BASE_URL = 'https://sep4api.azure-api.net/api/iot/soilhumidity';

async function fetchSoilHumidityHistory(from, to) {
  const fromIso = from.toISOString(); //Converts ISO string to ensure it works in query param, otherwise it adds timezone and location
  const toIso = to.toISOString();

  const url = `${API_BASE_URL}?from=${encodeURIComponent(fromIso)}&to=${encodeURIComponent(toIso)}`; //

  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  try {
    const res = await fetch(url, requestOptions);
    
    console.log(`[API] Request URL: ${url}`);

    if (res.ok) {
      const json = await res.json();
      const list = json?.list || [];
      return list.map(entry => entry.SoilHumidityDTO);
    }

    if (import.meta.env.DEV && res.status === 404) { //Mocks if 404 and dev
      return [{
        SoilHumidityDTO:{
          id: 0,
          time_stamp: new Date().toISOString(),
          soil_humidity_value: "45.2"
        }
      }];
    }

    throw new Error(`HTTP Error: ${res.status} ${res.statusText || ''}`.trim());
  } catch (err) {
    console.error(`Failed to fetch soil humidity data: ${err.message}`);
    throw err;
  }
}

export { fetchSoilHumidityHistory }