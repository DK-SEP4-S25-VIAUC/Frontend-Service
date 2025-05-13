const API_BASE_URL = 'https://sep4api.azure-api.net/api/iot/sample';

export async function fetchSoilHumidityHistory(from, to) {
  const fromIso = from.toISOString(); 
  const toIso = to.toISOString();

  const url = `${API_BASE_URL}?from=${encodeURIComponent(fromIso)}&to=${encodeURIComponent(toIso)}`;

  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  try {
    const res = await fetch(url, requestOptions);
    console.log(`[API] Request URL: ${url}`);

    if (res.ok) {
      const json = await res.json();
      const list = json?.response?.list || [];

      return list.map(entry => entry.SampleDTO);
    }

    if (import.meta.env.DEV && res.status === 404) {
      return [{
        timestamp: new Date().toISOString(),
        soil_humidity: 0,
        id: 0,
        air_humidity: null,
        air_temperature: null,
        light_value: null,
        lower_threshold: null,
      }];
    }

    throw new Error(`HTTP Error: ${res.status} ${res.statusText || ''}`.trim());
  } catch (err) {
    console.error(`Failed to fetch soil humidity data: ${err.message}`);
    throw err;
  }
}
