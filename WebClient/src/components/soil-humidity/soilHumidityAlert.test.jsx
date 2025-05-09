import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

vi.mock('../../hooks/soil-humidity/useGetThreshold.jsx');
vi.mock('../../hooks/soil-humidity/useLatestSoilHumidity.js');

import SoilHumidityAlert from './SoilHumidityAlert';
import useGetThreshold from '../../hooks/soil-humidity/useGetThreshold.jsx';
import { useLatestSoilHumidity } from '../../hooks/soil-humidity/useLatestSoilHumidity.js';

const mockedUseGetThreshold = useGetThreshold;
const mockedUseLatestSoilHumidity = useLatestSoilHumidity;

describe('SoilHumidityAlert component', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders loading state when isLoading is true', () => {
        mockedUseGetThreshold.mockReturnValue({
            soilHumidityThreshold: null,
            error: false,
            isLoading: true,
        });
        mockedUseLatestSoilHumidity.mockReturnValue({ data: null });

        render(<SoilHumidityAlert />);

        expect(screen.getByText(/Loading soil humidity alert/i)).toBeInTheDocument();
    });

    it('renders error state when error is true', () => {
        mockedUseGetThreshold.mockReturnValue({
            soilHumidityThreshold: { lowerbound: 30, upperbound: 70 },
            error: true,
            isLoading: false,
        });
        mockedUseLatestSoilHumidity.mockReturnValue({ data: { soil_humidity_value: 50 } });

        render(<SoilHumidityAlert />);

        expect(screen.getByText(/Error loading soil humidity data/i)).toBeInTheDocument();
    });

    it('renders error state when data is missing', () => {
        mockedUseGetThreshold.mockReturnValue({
            soilHumidityThreshold: { lowerbound: 30, upperbound: 70 },
            error: false,
            isLoading: false,
        });
        mockedUseLatestSoilHumidity.mockReturnValue({ data: null });

        render(<SoilHumidityAlert />);

        expect(screen.getByText(/Error loading soil humidity data/i)).toBeInTheDocument();
    });

    it('shows success message when soil humidity is within thresholds', async () => {
        mockedUseGetThreshold.mockReturnValue({
            soilHumidityThreshold: { lowerbound: 30, upperbound: 70 },
            error: false,
            isLoading: false,
        });
        mockedUseLatestSoilHumidity.mockReturnValue({ data: { soil_humidity_value: 50 } });

        render(<SoilHumidityAlert />);

        await waitFor(() => {
            expect(screen.getByText(/✅ All good—no warning/i)).toBeInTheDocument();
        });
    });

    it('shows warning message when soil humidity is below lowerbound', async () => {
        mockedUseGetThreshold.mockReturnValue({
            soilHumidityThreshold: { lowerbound: 30, upperbound: 70 },
            error: false,
            isLoading: false,
        });
        mockedUseLatestSoilHumidity.mockReturnValue({ data: { soil_humidity_value: 20 } });

        render(<SoilHumidityAlert />);

        await waitFor(() => {
            expect(screen.getByText(/⚠️ Warning: Soil humidity out of range/i)).toBeInTheDocument();
        });
    });

    it('shows warning message when soil humidity is above upperbound', async () => {
        mockedUseGetThreshold.mockReturnValue({
            soilHumidityThreshold: { lowerbound: 30, upperbound: 70 },
            error: false,
            isLoading: false,
        });
        mockedUseLatestSoilHumidity.mockReturnValue({ data: { soil_humidity_value: 80 } });

        render(<SoilHumidityAlert />);

        await waitFor(() => {
            expect(screen.getByText(/⚠️ Warning: Soil humidity out of range/i)).toBeInTheDocument();
        });
    });
});
