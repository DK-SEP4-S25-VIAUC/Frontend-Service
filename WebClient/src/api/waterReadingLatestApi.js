const API_BASE_URL = 'https://sep4api.azure-api.net/api/IoT/water/latest';
const IS_DEV_MODE = import.meta.env.MODE === 'development';

async function fetchWaterReadingLatest() {
    try {
        const response = await fetch(API_BASE_URL);


        //Handle Mock data in development mode
        if (IS_DEV_MODE && response.status === 404 || response.status === 500) {
            console.debug('Development mode: No data found, returning mock data');
            await new Promise(resolve => setTimeout(resolve, 1000));
            const randomValue = Math.floor(Math.random() * 100);
            return {
                status: 200,
                data: {
                    waterReading: randomValue,
                    timestamp: new Date().toISOString(),
                },
            };
        }

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.debug('Fetched water reading data:', data);
        return {
            data: data,
        };
    } catch (error) {
        const errorMessage = error instanceof Error
            ? `Failed to fetch water reading data: ${error.message}`
            : 'Failed to fetch water reading data: Unknown error';

        console.error(errorMessage);
        const enhancedError = new Error(errorMessage);
        enhancedError.originalError = error;
        throw enhancedError;
    }
}

export {fetchWaterReadingLatest};