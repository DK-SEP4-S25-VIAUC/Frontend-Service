import axios from 'axios';

const API_BASE_URL = 'https://sep4api.azure-api.net/api/IoT/watering';

async function sendWateringRequest(waterAmount) {
    console.debug('Watering amount:', waterAmount);

    try {
        const response = await axios.post(API_BASE_URL, {
            WateringDTO: {
                water_amount: waterAmount
            }
        });

        console.debug('Watering request response:', response.data);
        return { data: response.data };
    }
    catch (error) {
        const errorMessage = error.response
            ? `Failed to send watering request: ${error.response.status} - ${error.response.statusText}`
            : `Failed to send watering request: ${error.message || 'Unknown error'}`;

        console.error(errorMessage);
        const enhancedError = new Error(errorMessage);
        enhancedError.originalError = error;
        throw enhancedError;
    }
}

export { sendWateringRequest };