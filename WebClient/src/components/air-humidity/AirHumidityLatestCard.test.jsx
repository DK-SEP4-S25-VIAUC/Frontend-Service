import { render, screen } from '@testing-library/react'
import AirHumidityLatestCard from './AirHumidityLatestCard'
import * as useLatestAirHumidityModule from '../../hooks/air-humidity/useLatestAirHumidity'

// Mock subcomponents to isolate logic
vi.mock('./air-humidity-card/Header', () => ({
  default: ({ onRefresh }) => <div data-testid="header" onClick={onRefresh}>Header</div>,
}))
vi.mock('../Loader', () => ({
  default: () => <div data-testid="loader">Loading...</div>,
}))
vi.mock('../ErrorMessage', () => ({
  default: ({ error }) => <div data-testid="error">Error: {error?.message}</div>,
}))
vi.mock('../soil-humidity/soil-humidity-card/HumidityDisplay', () => ({
  default: ({ value, timestamp }) => (
    <div data-testid="humidity-display">
      {value} at {timestamp}
    </div>
  ),
}))

describe('AirHumidityLatestCard', () => {
  it('shows loading state', () => {
    vi.spyOn(useLatestAirHumidityModule, 'useLatestAirHumidity').mockReturnValue({
      isLoading: true,
      isError: false,
      error: null,
      data: null,
      refetch: vi.fn(),
    })

    render(<AirHumidityLatestCard />)
    expect(screen.getByTestId('loader')).toBeInTheDocument()
  })

  it('shows error state', () => {
    vi.spyOn(useLatestAirHumidityModule, 'useLatestAirHumidity').mockReturnValue({
      isLoading: false,
      isError: true,
      error: { message: 'Failed to fetch data' },
      data: null,
      refetch: vi.fn(),
    })

    render(<AirHumidityLatestCard />)
    expect(screen.getByTestId('error')).toHaveTextContent('Error: Failed to fetch data')
  })

  it('shows humidity display when data is loaded', () => {
    vi.spyOn(useLatestAirHumidityModule, 'useLatestAirHumidity').mockReturnValue({
      isLoading: false,
      isError: false,
      error: null,
      data: {
        air_humidity_value: 65,
        time_stamp: '2025-05-14T14:00:00Z',
      },
      refetch: vi.fn(),
    })

    render(<AirHumidityLatestCard />)
    expect(screen.getByTestId('humidity-display')).toHaveTextContent('65 at 2025-05-14T14:00:00Z')
  })
})
