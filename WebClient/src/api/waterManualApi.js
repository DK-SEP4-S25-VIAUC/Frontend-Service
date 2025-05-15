import axios from 'axios';

const API_POST_URL = 'https://sep4api.azure-api.net/api/iot/water/manual';

export async function postManualWatering(wateredAmount) {
    const response = await axios.post(API_POST_URL, {
        watered_amount: wateredAmount
    });

    return response.data;
}
