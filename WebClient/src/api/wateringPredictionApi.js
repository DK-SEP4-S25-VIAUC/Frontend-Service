const API_BASE_URL = 'https://sep4api.azure-api.net/api/mal/soilhumidity/forecast';
const IS_DEV_MODE = import.meta.env.MODE === 'development';

async function fetchWateringPrediction() {
    try {

        console.log('Fetching latest soil humidity data from API:', API_BASE_URL);
        const response = await fetch(API_BASE_URL);

        // Handle development mode mock data
        if (IS_DEV_MODE)
        {
            if (response.status === 404) {
                console.debug('Development mode: No data found, returning mock data');
                await new Promise(resolve => setTimeout(resolve, 1000));

                return {
                    next_watering_time: new Date(Date.now() + 3600000).toISOString(),
                };
            }
            else if (response.status === 503) {
                console.error('Server error: 500 Internal Server Error');
                await new Promise(resolve => setTimeout(resolve, 1000));

                return {
                    next_watering_time: new Date(Date.now() + 3600000).toISOString(),
                };
            }
        }

        // Handle server error and mock data
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.debug('Fetched watering prediction data:', data);
        return data;
    }
    catch (error) {
        const errorMessage = error instanceof Error 
            ? `Failed to fetch watering prediction data: ${error.message}`
            : 'Failed to fetch watering prediction data: Unknown error';
        
        console.error(errorMessage);
        throw new Error(errorMessage);
    }
}

export { fetchWateringPrediction };