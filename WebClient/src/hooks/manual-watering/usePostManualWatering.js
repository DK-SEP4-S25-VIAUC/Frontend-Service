import { useState } from 'react';
import { postManualWatering } from '../../api/waterManualApi';


export default function usePostManualWatering() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const submitWatering = async (amount) => {
        setIsLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            const parsedAmount = parseFloat(amount);

            if (isNaN(parsedAmount)) {
                setError('Mængden skal være et gyldigt tal');
                return;
            }

            await postManualWatering(parsedAmount);
            setSuccessMessage('Vanding er gemt!');
        } catch (err) {
            console.error('Fejl:', err);
            setError(err.message || 'Der opstod en fejl under gemning af informationen');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        submitWatering,
        isLoading,
        error,
        successMessage,
        setError,
        setSuccessMessage,
    };
}
