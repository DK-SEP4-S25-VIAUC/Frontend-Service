import { render, screen } from '@testing-library/react';
import WateringPredictionDisplay from './WateringPredictionDisplay';

describe('WateringPredictionDisplay', () => {
  it('renders the formatted watering prediction date', () => {
    const testDate = new Date('2025-05-07T14:30:00Z'); // Use a fixed date for deterministic test
    render(<WateringPredictionDisplay next_watering_time={testDate.toISOString()} />);

    // Expected format with `en-UK` locale and your options
    const expectedDate = testDate.toLocaleDateString('en-UK', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    expect(screen.getByText(expectedDate)).toBeInTheDocument();
  });

  it('renders the disclaimer text', () => {
    render(<WateringPredictionDisplay next_watering_time={new Date().toISOString()} />);
    expect(
      screen.getByText(/this is a prediction made on the basis of thousands of flora/i)
    ).toBeInTheDocument();
  });
});
