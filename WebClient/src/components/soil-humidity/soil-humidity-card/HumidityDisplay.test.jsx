import { render, screen } from '@testing-library/react';
import HumidityDisplay from './HumidityDisplay';

describe('HumidityDisplay', () => {
  it('renders humidity value and correct color', () => {
    const { container } = render(<HumidityDisplay value={75} timestamp={new Date().toISOString()} />);
    expect(screen.getByText('75')).toBeInTheDocument();
    const valueElement = container.querySelector('span.text-4xl');
    expect(valueElement.className).toMatch(/emerald/); // optimal color
  });

  it('renders the time correctly', () => {
    const time = new Date('2024-01-01T12:34:00');
    render(<HumidityDisplay value={50} timestamp={time.toISOString()} />);
      expect(screen.getByText(/12.*34/i)).toBeInTheDocument(); // After much googling, .toLocaleTimeString() returns 12.34 when running in 
      // browser because of location, and return 12:34 PM when running in vitest. 
  });

  it('renders correct number of filled beakers', () => {
    const { container } = render(<HumidityDisplay value={60} timestamp={new Date().toISOString()} />);
    const filled = container.querySelectorAll('svg.text-emerald-500');
    expect(filled.length).toBeGreaterThan(2); // 3 filled beakers expected for 60%
  });
});
