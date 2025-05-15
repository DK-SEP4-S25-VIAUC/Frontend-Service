const API_BASE_URL = 'https://sep4api.azure-api.net/api/IoT/airhumidity/latest';
const IS_DEV_MODE = import.meta.env.MODE === 'development';

async function fetchLatestAirHumidity() {
    try {
        const response = await fetch(API_BASE_URL);
        
        // Handle development mode mock data
        if (IS_DEV_MODE && response.status === 404 || response.status === 500) {
            console.debug('Development mode: No data found, returning mock data');
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const randomValue = Math.floor(Math.random() * 100);
            return {
            id: 0,
            air_humidity_value: randomValue,
            time_stamp: new Date().toISOString(),
            };
        }
        
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.debug('Fetched air humidity data:', data);
        return data;
    }catch (error) {
        const errorMessage = error instanceof Error
            ? `Failed to fetch air humidity data: ${error.message}`
            : 'Failed to fetch air humidity data: Unknown error';
        
        console.error(errorMessage);
        throw new Error(errorMessage);
    }
}
export { fetchLatestAirHumidity };
