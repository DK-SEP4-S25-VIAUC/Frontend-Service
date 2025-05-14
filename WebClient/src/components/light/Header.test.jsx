import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('renders title and refresh button', () => {
    render(<Header onRefresh={() => {}} />);
    expect(screen.getByText(/light level/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /refresh data/i })).toBeInTheDocument();
  });

  it('calls onRefresh when refresh button is clicked', () => {
    const onRefreshMock = vi.fn();
    render(<Header onRefresh={onRefreshMock} />);
    fireEvent.click(screen.getByRole('button', { name: /refresh data/i }));
    expect(onRefreshMock).toHaveBeenCalledTimes(1);
  });
});
