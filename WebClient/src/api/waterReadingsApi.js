const API_BASE_URL = 'https://sep4api.azure-api.net/api/iot/water';
const IS_DEV_MODE = import.meta.env.MODE === 'development';

function generateMockWaterReading(time_stamp_scaler) {
    return {
        id: Math.random().toString(36).substring(2, 15),
        time_stamp: new Date(Date.now() + time_stamp_scaler).toISOString(),
        watered_amount: Math.floor(Math.random() * 20),
        water_level: Math.floor(Math.random() * 100),
    };
}

async function fetchWaterReadings() {
    try {
        const response = await fetch(API_BASE_URL);

        if (IS_DEV_MODE && response.status === 404) {
            console.debug('Development mode: 404 received, returning mock data');
            await new Promise(resolve => setTimeout(resolve, 1000));

            return Array.from({ length: 10 }, (_, i) =>
                generateMockWaterReading(-i * 60 * 60 * 1000)
            );
        }

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        const waterReadings = Array.isArray(data.list)
            ? data.list.map(item => item.WaterDTO) // <-- unwrap WaterDTO
            : [];

        if (IS_DEV_MODE && waterReadings.length <= 5) {
            console.debug('Development mode: Array too short, returning mock data');
            return Array.from({ length: 10 }, (_, i) =>
                generateMockWaterReading(-i * 60 * 60 * 1000)
            );
        }

        console.log('Water Readings:', waterReadings);

        return waterReadings.map((reading) => ({
            id: reading.id,
            time_stamp: reading.time_stamp,
            watered_amount: reading.watered_amount,
            water_level: reading.water_level,
        }));
    } catch (error) {
        const errorMessage = error instanceof Error
            ? `Failed to fetch water readings: ${error.message}`
            : 'Failed to fetch water readings: Unknown error';

        console.error(errorMessage);
        throw new Error(errorMessage);
    }
}

export { fetchWaterReadings };