import { vi } from 'vitest';
import axios from 'axios';
import { renderHook, waitFor, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import usePostSoilHumidity from './usePostSoilHumidity.jsx';

vi.mock('axios');

describe('usePostSoilHumidity hook', () => {
    let queryClient, invalidateSpy;
    const wrapper = ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    beforeEach(() => {
        queryClient = new QueryClient();
        invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');
    });

    it('posts and invalidates on success', async () => {
        axios.post.mockResolvedValue({ data: { success: true } });

        const { result } = renderHook(() => usePostSoilHumidity(), { wrapper });

        act(() => {
            result.current.submitSoilHumidityData({ upperbound: 80, lowerbound: 20 });
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(axios.post).toHaveBeenCalledWith(
            'https://sep4api.azure-api.net/api/iot/soilhumidity/threshold',
            { upperbound: 80, lowerbound: 20 }
        );
        expect(invalidateSpy).toHaveBeenCalledWith({
            queryKey: ['soilHumidityThreshold'],
        });
    });
});
