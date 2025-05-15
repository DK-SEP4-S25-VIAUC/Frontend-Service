import { render } from '@testing-library/react';
import Loader from './Loader';

describe('Loader', () => {
  it('renders a spinner', () => {
    const { container } = render(<Loader />);
    const spinner = container.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });
});
