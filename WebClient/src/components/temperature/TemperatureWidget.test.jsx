import { render, screen, fireEvent } from '@testing-library/react';
import TemperatureWidget from './TemperatureWidget.jsx';
import { useGetTemperatureLatest } from '../../hooks/temperature/useGetTemperatureLatest.jsx';
import { useQueryClient } from '@tanstack/react-query';
import { vi, describe, it, beforeEach, afterEach, expect } from 'vitest';

// Mock hooks
vi.mock('../../hooks/temperature/useGetTemperatureLatest.jsx');
vi.mock('@tanstack/react-query', () => ({
    useQueryClient: vi.fn(),
}));
vi.mock('../../hooks/Animation/useMinimumAnimation.js', () => ({
    useMinimumAnimation: (isLoading) => [isLoading, vi.fn()],
}));

describe('TemperatureWidget', () => {
    const invalidateQueriesMock = vi.fn();

    beforeEach(() => {
        useQueryClient.mockReturnValue({ invalidateQueries: invalidateQueriesMock });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('shows loading state', () => {
        useGetTemperatureLatest.mockReturnValue({
            isLoading: true,
            error: null,
            temperatureLatest: null,
        });

        render(<TemperatureWidget />);
        expect(screen.getByText(/temperature/i)).toBeInTheDocument();
    });

    it('shows temperature and time when data is available', () => {
        useGetTemperatureLatest.mockReturnValue({
            isLoading: false,
            error: null,
            temperatureLatest: {
                TemperatureDTO: {
                    id: 905,
                    temperature_value: 22.5,
                    time_stamp: '2025-05-14T10:30:00Z',
                }
            },
        });

        render(<TemperatureWidget />);
        expect(screen.getByText(/22.5°C/)).toBeInTheDocument();
        expect(screen.getByText(/Last updated:/)).toBeInTheDocument();
    });

    it('shows error message when error occurs', () => {
        useGetTemperatureLatest.mockReturnValue({
            isLoading: false,
            error: new Error('Failed'),
            temperatureLatest: null,
        });

        render(<TemperatureWidget />);
        expect(screen.getByText(/error loading temperature data/i)).toBeInTheDocument();
    });

    it('calls invalidateQueries on refresh', () => {
        const mockStartRefreshing = vi.fn();
        vi.doMock('../../hooks/Animation/useMinimumAnimation.js', () => ({
            useMinimumAnimation: () => [false, mockStartRefreshing],
        }));

        useGetTemperatureLatest.mockReturnValue({
            isLoading: false,
            error: null,
            temperatureLatest: {
                TemperatureDTO: {
                    id: 905,
                    temperature_value: 23.7,
                    time_stamp: '2025-05-14T10:00:00Z',
                }
            },
        });

        render(<TemperatureWidget />);
        const refreshButton = screen.getByRole('button'); // Assumes your WidgetHeader uses a <button>
        fireEvent.click(refreshButton);
        expect(invalidateQueriesMock).toHaveBeenCalledWith({ queryKey: ['temperatureLatest'] });
    });
});