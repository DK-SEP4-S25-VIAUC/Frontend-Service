import { render, screen } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage', () => {
  it('shows CORS error message when error mentions CORS', () => {
    const error = { message: 'CORS error occurred' };
    render(<ErrorMessage error={error} />);
    expect(screen.getByText(/Connection issue/i)).toBeInTheDocument();
  });

  it('shows normal error message when CORS not mentioned', () => {
    const error = { message: 'Some other error' };
    render(<ErrorMessage error={error} />);
    expect(screen.getByText(/Some other error/i)).toBeInTheDocument();
  });
});
