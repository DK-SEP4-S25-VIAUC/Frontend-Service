import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WateringPredictionCard from './WateringPredictionCard';
import { useWateringPrediction } from '../../hooks/watering-prediction/useWateringPrediction';

vi.mock('../../hooks/watering-prediction/useWateringPrediction', () => ({
    useWateringPrediction: vi.fn(),
}));
    
describe('WateringPredictionCard', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('shows Loader when loading', () => {
        useWateringPrediction.mockReturnValue({
            isLoading: true,
            isError: false,
            data: undefined,
            refetch: vi.fn(),
        });

        render(<WateringPredictionCard />);
        expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('shows ErrorMessage when error', () => {
        useWateringPrediction.mockReturnValue({
            isLoading: false,
            isError: true,
            error: { message: 'Failed' },
            data: undefined,
            refetch: vi.fn(),
        });

        render(<WateringPredictionCard />);
        expect(screen.getByText(/failed/i)).toBeInTheDocument();
    });

    it('shows PredictionDisplay when data is available', () => {
        const testDate = new Date('2025-05-07T14:30:00Z'); // Use a fixed date for deterministic test
        useWateringPrediction.mockReturnValue({
            isLoading: false,
            isError: false,
            data: { next_watering_time: testDate.toISOString() },
            refetch: vi.fn(),
        });

        render(<WateringPredictionCard />);
        expect(screen.getByText(/your plants need to be watered at/i)).toBeInTheDocument();
    });

    it('refetches when refresh button is clicked', async () => {
        const refetchMock = vi.fn();
        useWateringPrediction.mockReturnValue({
            isLoading: false,
            isError: false,
            data: { next_watering_time: new Date().toISOString() },
            refetch: refetchMock,
        });

        render(<WateringPredictionCard />);
        await userEvent.click(screen.getByRole('button', { name: /refresh data/i }));
        expect(refetchMock).toHaveBeenCalledTimes(1);
    });
}
);