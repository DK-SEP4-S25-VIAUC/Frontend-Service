import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ActivityHistoryCard from './ActivityHistoryCard';
import { useWaterReadings } from '../../hooks/activity-history/useWaterReadings';
import LineGraph from '../graph/LineGraph';
import WaterReadingLatest from './activity-history-card/WaterReadingLatest';

// Mock the hook and components
vi.mock('../../hooks/activity-history/useWaterReadings', () => ({
  useWaterReadings: vi.fn(),
}));

vi.mock('../graph/LineGraph', () => ({
  default: vi.fn(() => <div>Mocked LineGraph</div>),
}));

vi.mock('./activity-history-card/WaterReadingLatest', () => ({
  default: vi.fn(() => <div>Mocked WaterReadingLatest</div>),
}));

describe('ActivityHistoryCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows Loader when loading', () => {
    useWaterReadings.mockReturnValue({
      isLoading: true,
      isError: false,
      data: undefined,
      error: null,
      refetch: vi.fn(),
    });

    render(<ActivityHistoryCard />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    // Tabs should not be visible during loading
    expect(screen.queryByRole('button', { name: /usage history/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /current level/i })).not.toBeInTheDocument();
  });

  it('shows ErrorMessage when error', () => {
    useWaterReadings.mockReturnValue({
      isLoading: false,
      isError: true,
      data: undefined,
      error: { message: 'Failed to load water readings' },
      refetch: vi.fn(),
    });

    render(<ActivityHistoryCard />);
    expect(screen.getByText(/failed to load water readings/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
    // Tabs should not be visible in error state
    expect(screen.queryByRole('button', { name: /usage history/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /current level/i })).not.toBeInTheDocument();
  });

  it('refetches when "Try again" button is clicked', async () => {
    const refetchMock = vi.fn();
    useWaterReadings.mockReturnValue({
      isLoading: false,
      isError: true,
      data: undefined,
      error: { message: 'Failed to load water readings' },
      refetch: refetchMock,
    });

    render(<ActivityHistoryCard />);
    const tryAgainButton = screen.getByRole('button', { name: /try again/i });
    await userEvent.click(tryAgainButton);
    expect(refetchMock).toHaveBeenCalledTimes(1);
  });

  it('shows tabs and LineGraph when data is available', () => {
    useWaterReadings.mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        readings: [{ date: '2024-01-01', value: 10 }],
        currentLevel: { value: 15, timestamp: '2024-01-03T12:00:00' },
      },
      error: null,
      refetch: vi.fn(),
    });

    render(<ActivityHistoryCard />);
    // Check for tabs
    expect(screen.getByRole('button', { name: /usage history/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /current level/i })).toBeInTheDocument();
    // Default tab is "chart", so LineGraph should be rendered
    expect(screen.getByText('Mocked LineGraph')).toBeInTheDocument();
    expect(screen.queryByText('Mocked WaterReadingLatest')).not.toBeInTheDocument();
  });

  it('shows WaterReadingLatest when "Current Level" tab is clicked', async () => {
    useWaterReadings.mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        readings: [{ date: '2024-01-01', value: 10 }],
        currentLevel: { value: 15, timestamp: '2024-01-03T12:00:00' },
      },
      error: null,
      refetch: vi.fn(),
    });

    render(<ActivityHistoryCard />);
    const currentLevelButton = screen.getByRole('button', { name: /current level/i });
    await userEvent.click(currentLevelButton);
    expect(screen.getByText('Mocked WaterReadingLatest')).toBeInTheDocument();
    expect(screen.queryByText('Mocked LineGraph')).not.toBeInTheDocument();
  });
});