import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SoilHumidityCard from './SoilHumidityLatestCard';
import { useLatestSoilHumidity } from '../../hooks/soil-humidity/useLatestSoilHumidity';

vi.mock('../../hooks/soil-humidity/useLatestSoilHumidity', () => ({
  useLatestSoilHumidity: vi.fn(),
}));

describe('SoilHumidityCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows Loader when loading', () => {
    useLatestSoilHumidity.mockReturnValue({
      isLoading: true,
      isError: false,
      data: undefined,
      refetch: vi.fn(),
    });

    render(<SoilHumidityCard />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('shows ErrorMessage when error', () => {
    useLatestSoilHumidity.mockReturnValue({
      isLoading: false,
      isError: true,
      error: { message: 'Failed' },
      data: undefined,
      refetch: vi.fn(),
    });

    render(<SoilHumidityCard />);
    expect(screen.getByText(/failed/i)).toBeInTheDocument();
  });

  it('shows HumidityDisplay when data is available', () => {
    useLatestSoilHumidity.mockReturnValue({
      isLoading: false,
      isError: false,
      data: { soil_humidity_value: 45, time_stamp: new Date('2024-01-01T12:34:00').toISOString() },
      refetch: vi.fn(),
    });

    render(<SoilHumidityCard />);
    expect(screen.getByText('45')).toBeInTheDocument();
    expect(screen.getByText(/12.*34/i)).toBeInTheDocument();
  });

  it('refetches when refresh button is clicked', async () => {
    const refetchMock = vi.fn();
    useLatestSoilHumidity.mockReturnValue({
      isLoading: false,
      isError: false,
      data: { soil_humidity_value: 45, time_stamp: new Date().toISOString() },
      refetch: refetchMock,
    });

    render(<SoilHumidityCard />);
    const refreshButton = screen.getByRole('button', { name: /refresh data/i });

    await userEvent.click(refreshButton);

    expect(refetchMock).toHaveBeenCalledTimes(1);
  });
});