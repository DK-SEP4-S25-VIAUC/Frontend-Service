import { render, screen } from '@testing-library/react';
import LightDisplay from './LightDisplay';

describe('LightDisplay', () => {
  it('renders light status', () => {
    render(<LightDisplay value={400} timestamp={new Date().toISOString()} />);
        expect(screen.getByText('Cloudy')).toBeInTheDocument();
  });

  it('renders the time correctly', () => {
    const time = new Date('2024-01-01T12:34:00');
    render(<LightDisplay value={1000} timestamp={time.toISOString()} />);
        expect(screen.getByText(/12.*34/i)).toBeInTheDocument(); 
  });
});
