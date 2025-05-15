import { render, screen, fireEvent } from '@testing-library/react'
import Header from './Header'

describe('Header', () => {
  it('renders the title and icons', () => {
    render(<Header onRefresh={() => {}} />)

    // Check title
    expect(screen.getByText('Air Humidity')).toBeInTheDocument()

    // Check icons by role or aria-label
    const cloudIcon = screen.getByText((_, element) =>
      element.tagName.toLowerCase() === 'svg' &&
      element.classList.contains('text-emerald-500')
    )
    expect(cloudIcon).toBeInTheDocument()

    const refreshButton = screen.getByRole('button', { name: /refresh data/i })
    expect(refreshButton).toBeInTheDocument()
  })

  it('calls onRefresh when the button is clicked', () => {
    const mockRefresh = vi.fn()
    render(<Header onRefresh={mockRefresh} />)

    const button = screen.getByRole('button', { name: /refresh data/i })
    fireEvent.click(button)

    expect(mockRefresh).toHaveBeenCalledTimes(1)
  })
})
