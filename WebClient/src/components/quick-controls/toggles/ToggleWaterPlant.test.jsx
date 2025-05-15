import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useWateringRequest } from "../../../hooks/watering/useWateringRequest.js";

vi.mock('axios');

const createWrapper = () => {
    const queryClient = new QueryClient();
    return ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
};

describe('useWateringRequest', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('sends POST request with correct payload (ml)', async () => {
        const mockResponse = { data: { success: true } };
        axios.post.mockResolvedValue(mockResponse);

        const { result } = renderHook(() => useWateringRequest(), {
            wrapper: createWrapper()
        });

        await act(async () => {
            result.current.mutate(500); // 500 ml
        });

        expect(axios.post).toHaveBeenCalledWith(
            'https://sep4api.azure-api.net/api/IoT/water/manual',
            {watered_amount: 500 }
        );
    });

    it('calls onSuccess when provided', async () => {
        const onSuccess = vi.fn();
        axios.post.mockResolvedValue({ data: { success: true } });

        const { result } = renderHook(() => useWateringRequest({ onSuccess }), {
            wrapper: createWrapper()
        });

        await act(() => {
            result.current.mutate(300, { onSuccess }); // 300 ml
        });

        expect(onSuccess).toHaveBeenCalled();
    });

    it('calls onError when request fails', async () => {
        const onError = vi.fn();
        axios.post.mockRejectedValue(new Error('Network error'));

        const { result } = renderHook(() => useWateringRequest({ onError }), {
            wrapper: createWrapper()
        });

        await act(async () => {
            result.current.mutate(250); // 250 ml
        });

        expect(onError).toHaveBeenCalled();

        const [[errorArg]] = onError.mock.calls;
        expect(errorArg).toBeInstanceOf(Error);
        expect(errorArg.message).toBe('Network error');
    });
});
