const API_BASE_URL = '/api/IoT/soilhumidity';

export async function fetchSoilHumidityHistory() {
  try {
    const res = await fetch(API_BASE_URL);
    if (res.ok) {
      return await res.json();
    }

    if (process.env.NODE_ENV === 'development' && res.status === 404) {
      return [{
        time_stamp: new Date().toISOString(),
        soil_humidity_value: 0,
      }];
    }

    throw new Error(`HTTP Error: ${res.status} ${res.statusText || ''}`.trim());
  } catch (err) {
    console.error(`Failed to fetch soil humidity data: ${err.message}`);
    throw err;
  }
}
