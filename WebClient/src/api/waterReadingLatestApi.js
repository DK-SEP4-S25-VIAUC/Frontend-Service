import axios from 'axios';

const API_BASE_URL = 'https://sep4api.azure-api.net/api/IoT/water/latest';

async function fetchWaterReadingLatest() {
    try {
        const response = await axios.get(API_BASE_URL);

        console.debug('Fetched water reading data:', response.data);
        return { data: response.data };
    }
    catch (error) {
        const errorMessage = error.response
            ? `Failed to fetch water reading data: ${error.response.status} - ${error.response.statusText}`
            : `Failed to fetch water reading data: ${error.message || 'Unknown error'}`;

        console.error(errorMessage);
        const enhancedError = new Error(errorMessage);
        enhancedError.originalError = error;
        throw enhancedError;
    }
}

export { fetchWaterReadingLatest };