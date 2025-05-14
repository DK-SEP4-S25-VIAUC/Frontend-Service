import { render, screen } from '@testing-library/react'
import HumidityDisplay from './HumidityDisplay'
import { BeakerIcon } from '@heroicons/react/24/outline' 

describe('HumidityDisplay', () => {
  it('renders humidity value and correct color', () => {
    const { container } = render(
      <HumidityDisplay value={75} timestamp={new Date().toISOString()} icon={BeakerIcon} />
    )
    expect(screen.getByText('75')).toBeInTheDocument()
    const valueElement = container.querySelector('span.text-4xl')
    expect(valueElement.className).toMatch(/emerald/) // optimal color
  })

  it('renders the time correctly', () => {
    const time = new Date('2024-01-01T12:34:00')
    render(<HumidityDisplay value={50} timestamp={time.toISOString()} icon={BeakerIcon} />)
    // Make sure the format matches your system's locale under test runner
    expect(screen.getByText(/12.*34/i)).toBeInTheDocument()
  })

  it('renders correct number of filled icons', () => {
    const { container } = render(
      <HumidityDisplay value={60} timestamp={new Date().toISOString()} icon={BeakerIcon} />
    )
    const filled = container.querySelectorAll('svg.text-emerald-500, svg.text-emerald-400')
    expect(filled.length).toBe(3) // 3 filled beakers for 60%
  })
})
