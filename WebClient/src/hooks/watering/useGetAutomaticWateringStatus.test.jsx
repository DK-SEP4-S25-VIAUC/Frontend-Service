import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import useGetAutomaticWateringStatus from '../../hooks/watering/useGetAutomaticWateringStatus.jsx';

vi.mock('axios');

describe('useGetAutomaticWateringStatus', () => {
    let queryClient;
    const createWrapper = () => {
        queryClient = new QueryClient({
            defaultOptions: {
                queries: {
                    retry: false,
                },
            },
        });
        return ({ children }) => (
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        );
    };

    afterEach(() => {
        vi.resetAllMocks();
        queryClient.clear();
    });

    it('returns loading state initially and then data on success', async () => {
        const mockData = { automatic_watering: true };
        axios.get.mockResolvedValueOnce({ data: mockData });

        const wrapper = createWrapper();
        const { result } = renderHook(() => useGetAutomaticWateringStatus(), { wrapper });

        expect(result.current.isLoading).toBe(true);
        expect(result.current.automaticWateringStatus).toBeUndefined();
        expect(result.current.error).toBeNull();

        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(result.current.automaticWateringStatus).toEqual(mockData);
        expect(result.current.error).toBeNull();
    });

    it('returns error when the fetch fails', async () => {
        const mockError = new Error('Network Error');
        axios.get.mockRejectedValueOnce(mockError);

        const wrapper = createWrapper();
        const { result } = renderHook(() => useGetAutomaticWateringStatus(), { wrapper });

        expect(result.current.isLoading).toBe(true);

        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(result.current.automaticWateringStatus).toBeUndefined();
        expect(result.current.error).toBe(mockError);
    });
});
