const API_BASE_URL = 'https://sep4api.azure-api.net/api/IoT/light/latest';
const IS_DEV_MODE = import.meta.env.MODE === 'development';

async function fetchLatestLightReading() {
  try {

    const response = await fetch(API_BASE_URL);

    if (IS_DEV_MODE && (response.status === 404 || response.status === 500)  ) {
      console.debug('Development mode: No data found, returning mock data');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const randomValue = Math.floor(Math.random() * 100);
      return {
        id: 0,
        light_value: randomValue,
        time_stamp: new Date().toISOString(),
      };
    }

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.debug('Fetched light data:', data);
    return data;
  } catch (error) {
    const errorMessage = error instanceof Error
      ? `Failed to fetch light data: ${error.message}`
      : 'Failed to fetch light data: Unknown error';

    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}

export { fetchLatestLightReading };
