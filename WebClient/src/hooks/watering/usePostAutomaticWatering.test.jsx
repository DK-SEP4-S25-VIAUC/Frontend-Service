import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import { vi } from 'vitest';
import usePostAutomaticWatering from '../../hooks/watering/usePostAutomaticWatering.jsx';

vi.mock('axios');

describe('usePostAutomaticWatering', () => {
    let queryClient;
    const createWrapper = () => {
        queryClient = new QueryClient({
            defaultOptions: {
                queries: { retry: false },
                mutations: { retry: false },
            },
        });
        vi.spyOn(queryClient, 'invalidateQueries').mockResolvedValue();

        return ({ children }) => (
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        );
    };

    afterEach(() => {
        vi.resetAllMocks();
        queryClient.clear();
    });

    it('has correct initial state', () => {
        const wrapper = createWrapper();
        const { result } = renderHook(() => usePostAutomaticWatering(), { wrapper });

        expect(result.current.isPending).toBe(false);
        expect(result.current.isSuccess).toBe(false);
        expect(result.current.isError).toBe(false);
        expect(result.current.error).toBeNull();
        expect(result.current.data).toBeUndefined();
    });

    it('submits data and invalidates queries on success', async () => {
        const mockResponse = { data: { success: true } };
        axios.put.mockResolvedValueOnce(mockResponse);

        const wrapper = createWrapper();
        const { result } = renderHook(() => usePostAutomaticWatering(), { wrapper });

        act(() => {
            result.current.submitAutomaticWatering({ automatic_watering: true });
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(axios.put).toHaveBeenCalledWith(
            'https://sep4api.azure-api.net/api/iot/watering/mode',
            { automatic_watering: true }
        );
        expect(queryClient.invalidateQueries).toHaveBeenCalledWith({ queryKey: ['AutomaticWateringStatus'] });
        expect(result.current.data).toEqual(mockResponse.data);
    });

    it('handles error state on mutation failure', async () => {
        const mockError = new Error('Network Error');
        axios.put.mockRejectedValueOnce(mockError);

        const wrapper = createWrapper();
        const { result } = renderHook(() => usePostAutomaticWatering(), { wrapper });

        act(() => {
            result.current.submitAutomaticWatering({ automatic_watering: false });
        });

        await waitFor(() => expect(result.current.isError).toBe(true));

        expect(axios.put).toHaveBeenCalledWith(
            'https://sep4api.azure-api.net/api/iot/watering/mode',
            { automatic_watering: false }
        );
        expect(result.current.error).toBe(mockError);
    });
});
