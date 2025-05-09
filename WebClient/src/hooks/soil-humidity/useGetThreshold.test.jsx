// useGetThreshold.test.js
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook} from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import useGetThreshold from './useGetThreshold';

vi.mock('axios');

const createWrapper = () => {
    const queryClient = new QueryClient();
    return ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
};

describe('useGetThreshold hook', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('fetches and returns soil humidity threshold data on success', async () => {
        const mockData = { threshold: 50 };
        axios.get.mockResolvedValue({ data: mockData });

        const { result } = renderHook(() => useGetThreshold(), {
            wrapper: createWrapper(),
        });

        await waitFor(() => expect(result.current.soilHumidityThreshold).toEqual(mockData));

        expect(result.current.error).toBeNull();
        expect(result.current.isLoading).toBe(false);
    });
});
