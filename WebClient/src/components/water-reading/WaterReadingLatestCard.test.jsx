import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useLatestWaterReading } from '../../hooks/water-reading/useLatestWaterReading.js';
import WaterReadingLatestCard from "../water-reading/WaterReadingLatestCard.jsx";

// Mock the custom hook
vi.mock('../../hooks/water-reading/useLatestWaterReading.js', () => ({
    useLatestWaterReading: vi.fn(),
}));

// Mock dayjs to have consistent date formatting in tests
vi.mock('dayjs', () => {
    return {
        default: () => {
            const mockDayjsObj = {
                format: () => '01/01/2024 12:34:56'
            };
            return mockDayjsObj;
        }
    };
});

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
    RefreshCw: (props) => <svg {...props}>RefreshCw</svg>,
    AlertCircle: (props) => <svg {...props}>AlertCircle</svg>,
    Clock: (props) => <svg {...props}>Clock</svg>,
}));

describe('WaterReadingLatestCard', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('shows loading state when data is loading', () => {
        useLatestWaterReading.mockReturnValue({
            data: undefined,
            isLoading: true,
            isError: false,
            refetch: vi.fn(),
        });

        render(<WaterReadingLatestCard />);

        // Check for title
        expect(screen.getByText('Water Tank Level')).toBeInTheDocument();

        // Check for loading state - the loading skeleton
        const loadingElements = document.querySelectorAll('.animate-pulse');
        expect(loadingElements.length).toBeGreaterThan(0);

        // The refresh icon should have animate-spin class when loading
        const refreshButton = screen.getByLabelText('Refresh water reading');
        const refreshIcon = refreshButton.querySelector('svg');
        expect(refreshIcon).toHaveClass('animate-spin');
    });

    it('shows error message when there is an error', () => {
        useLatestWaterReading.mockReturnValue({
            data: undefined,
            isLoading: false,
            isError: true,
            refetch: vi.fn(),
        });

        render(<WaterReadingLatestCard />);

        expect(screen.getByText('Failed to fetch water level')).toBeInTheDocument();
    });

    it('displays water level data correctly when data is available', () => {
        const mockData = {
            value: 1500, // 1.5L (75% of 2L)
            timestamp: new Date('2024-01-01T12:34:56').toISOString(),
        };

        useLatestWaterReading.mockReturnValue({
            data: mockData,
            isLoading: false,
            isError: false,
            refetch: vi.fn(),
        });

        render(<WaterReadingLatestCard />);

        // The value is displayed as "1.5L" together
        expect(screen.getByText('1.5L')).toBeInTheDocument();
        expect(screen.getByText('of 2L capacity')).toBeInTheDocument();
        expect(screen.getByText('75% full')).toBeInTheDocument();
        expect(screen.getByText(/Last updated:/)).toBeInTheDocument();
    });

    it('displays low water level with red color', () => {
        const mockData = {
            value: 200,
            timestamp: new Date('2024-01-01T12:34:56').toISOString(),
        };

        useLatestWaterReading.mockReturnValue({
            data: mockData,
            isLoading: false,
            isError: false,
            refetch: vi.fn(),
        });

        render(<WaterReadingLatestCard />);

        // Check for correct display (0.15L formatted as 0.2L)
        expect(screen.getByText('0.2L')).toBeInTheDocument();

        // Find the percentage text with red color
        const percentageElement = screen.getByText('10% full');
        expect(percentageElement).toHaveClass('text-red-500');
    });

    it('displays medium water level with yellow color', () => {
        const mockData = {
            value: 400, // 0.4L, which is 20% of 2L
            timestamp: new Date('2024-01-01T12:34:56').toISOString(),
        };

        useLatestWaterReading.mockReturnValue({
            data: mockData,
            isLoading: false,
            isError: false,
            refetch: vi.fn(),
        });

        render(<WaterReadingLatestCard />);

        expect(screen.getByText('0.4L')).toBeInTheDocument();

        // Find the percentage text with yellow color
        const percentageElement = screen.getByText('20% full');
        expect(percentageElement).toHaveClass('text-yellow-500');
    });

    it('displays normal water level with green color', () => {
        const mockData = {
            value: 1000, // 1.0L, which is 50% of 2L
            timestamp: new Date('2024-01-01T12:34:56').toISOString(),
        };

        useLatestWaterReading.mockReturnValue({
            data: mockData,
            isLoading: false,
            isError: false,
            refetch: vi.fn(),
        });

        render(<WaterReadingLatestCard />);

        expect(screen.getByText('1.0L')).toBeInTheDocument();

        // Find the percentage text with green color
        const percentageElement = screen.getByText('50% full');
        expect(percentageElement).toHaveClass('text-green-500');
    });

    it('calls refetch when refresh button is clicked', async () => {
        const refetchMock = vi.fn();

        useLatestWaterReading.mockReturnValue({
            data: { value: 1000, timestamp: new Date().toISOString() },
            isLoading: false,
            isError: false,
            refetch: refetchMock,
        });

        render(<WaterReadingLatestCard />);

        const refreshButton = screen.getByLabelText('Refresh water reading');
        await userEvent.click(refreshButton);

        expect(refetchMock).toHaveBeenCalledTimes(1);
    });

    it('uses fallback data when API error occurs', () => {
        useLatestWaterReading.mockReturnValue({
            data: undefined,
            isLoading: false,
            isError: true,
            refetch: vi.fn(),
        });

        // Mock Math.random to return a consistent value
        const mathRandomSpy = vi.spyOn(Math, 'random').mockImplementation(() => 0.5);

        render(<WaterReadingLatestCard />);

        // Should show error message
        expect(screen.getByText('Failed to fetch water level')).toBeInTheDocument();

        // Should show fallback data (0.5 * 2000 = 1000ml = 1.0L)
        expect(screen.getByText('1.0L')).toBeInTheDocument();
        expect(screen.getByText('50% full')).toBeInTheDocument();

        mathRandomSpy.mockRestore();
    });

    it('shows water tank visualization with correct percentage', () => {
        const mockData = {
            value: 1600, // 1.6L, which is 80% of 2L
            timestamp: new Date('2024-01-01T12:34:56').toISOString(),
        };

        useLatestWaterReading.mockReturnValue({
            data: mockData,
            isLoading: false,
            isError: false,
            refetch: vi.fn(),
        });

        render(<WaterReadingLatestCard />);

        // Check that the water level visualization has the correct height
        const waterFill = document.querySelector('.transition-all.duration-1000.ease-out');
        expect(waterFill).toBeInTheDocument();
        expect(waterFill).toHaveStyle({ height: '80%' });

        // Check that it has the correct color for high water
        expect(waterFill).toHaveClass('bg-blue-500');
    });

    it('renders measurement lines correctly', () => {
        useLatestWaterReading.mockReturnValue({
            data: { value: 1000, timestamp: new Date().toISOString() },
            isLoading: false,
            isError: false,
            refetch: vi.fn(),
        });

        render(<WaterReadingLatestCard />);

        // Check for percentage markers
        ['100%', '75%', '50%', '25%', '0%'].forEach(marker => {
            expect(screen.getByText(marker)).toBeInTheDocument();
        });
    });
});