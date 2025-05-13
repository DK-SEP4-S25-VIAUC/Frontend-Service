const API_BASE_URL = 'https://sep4api.azure-api.net/api/IoT/water';
const IS_DEV_MODE = import.meta.env.MODE === 'development';

function generateMockWaterReading(time_stamp_scaler) {
    return {
        id: Math.random().toString(36).substring(2, 15),
        timestamp: new Date(Date.now() + time_stamp_scaler).toISOString(),
        watered_amount: Math.floor(Math.random() * 20),
    };
}

async function fetchWaterReadings() {

    try {
        const response = await fetch(API_BASE_URL);
        
        // Handle development mode mock data
        if (IS_DEV_MODE && response.status === 404) {
            console.debug('Development mode: No data found, returning mock data');
            await new Promise(resolve => setTimeout(resolve, 1000));

            const water_readings = [];

            for (let i = 0; i < 10; i++) {
                water_readings.push(generateMockWaterReading(-i * 1000 * 60 * 60));
            }
            return water_readings;
        }

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }
    
        const data = await response.json();
        if (data.length <= 5) {
            console.debug('Development mode: No data in array, returning mock data');
            const water_readings = [];

            for (let i = 0; i < 10; i++) {
                water_readings.push(generateMockWaterReading(-i * 1000 * 60 * 60));
            }
            
            return water_readings;
        }

        

        console.debug('Fetched water readings data:', data);
        return data;
    }
    catch (error) {
        const errorMessage = error instanceof Error
            ? `Failed to fetch water readings: ${error.message}`
            : 'Failed to fetch water readings: Unknown error';

        console.error(errorMessage);
        throw new Error(errorMessage);
    }

}

export { fetchWaterReadings };