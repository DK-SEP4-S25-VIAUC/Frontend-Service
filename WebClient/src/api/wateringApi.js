const API_BASE_URL = 'https://sep4api.azure-api.net/api/IoT/watering';
const IS_DEV_MODE = import.meta.env.MODE === 'development';

async function sendWateringRequest(waterAmount) {
    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                WateringDTO: {
                    water_amount: waterAmount
                }
            })
        });

        // Return a mock successful response
        if (IS_DEV_MODE && (response.status === 404 || response.status === 500)) {
            console.debug('Development mode: Request failed, returning mock response');
            await new Promise(resolve => setTimeout(resolve, 1000));
            return {
                status: 200,
                data: {
                    WateringDTO: {
                        water_amount: waterAmount
                    }
                }
            };
        }

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.debug('Watering request response:', data);
        return {
            data: data
        };
    } catch (error) {
        if (IS_DEV_MODE && error instanceof TypeError && error.message.includes('Failed to fetch')) {
            console.debug('Development mode: Network error, returning mock response');
            await new Promise(resolve => setTimeout(resolve, 1000));
            return {
                status: 200,
                data: {
                    WateringDTO: {
                        water_amount: waterAmount
                    }
                }
            };
        }

        const errorMessage = error instanceof Error
            ? `Failed to send watering request: ${error.message}`
            : 'Failed to send watering request: Unknown error';
        console.error(errorMessage);
        const enhancedError = new Error(errorMessage);
        enhancedError.originalError = error;
        throw enhancedError;
    }
}

export { sendWateringRequest };