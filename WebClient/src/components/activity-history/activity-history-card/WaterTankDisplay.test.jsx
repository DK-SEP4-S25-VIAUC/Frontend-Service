import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import WaterTankDisplay from './WaterTankDisplay'

describe('<WaterTankDisplay />', () => {
    beforeEach(() => {
        vi.useFakeTimers()
      })
    
      afterEach(() => {
        vi.useRealTimers()
      })

  it('renders measurement lines', () => {
    render(<WaterTankDisplay percentage={50} />)
    expect(screen.getByText('100%')).toBeInTheDocument()
    expect(screen.getByText('75%')).toBeInTheDocument()
    expect(screen.getByText('50%')).toBeInTheDocument()
    expect(screen.getByText('25%')).toBeInTheDocument()
    expect(screen.getByText('0%')).toBeInTheDocument()
  })

  it('renders red color when percentage is below or equal to 10%', () => {
    render(<WaterTankDisplay percentage={5} />)
    vi.runAllTimers()
    const divs = document.querySelectorAll('div.bg-red-400')
    expect(divs.length).toBeGreaterThan(0)
  })

  it('renders yellow color when percentage is between 11% and 30%', () => {
    render(<WaterTankDisplay percentage={25} />)
    vi.runAllTimers()
    const divs = document.querySelectorAll('div.bg-yellow-400')
    expect(divs.length).toBeGreaterThan(0)
  })

  it('renders blue color when percentage is above 30%', () => {
    render(<WaterTankDisplay percentage={80} />)
    vi.runAllTimers()
    const divs = document.querySelectorAll('div.bg-blue-400')
    expect(divs.length).toBeGreaterThan(0)
  })

  it('renders empty tank icon when percentage is below 5%', () => {
    render(<WaterTankDisplay percentage={3} />)
    vi.runAllTimers()
    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('does not render empty tank icon when percentage is >= 5%', () => {
    render(<WaterTankDisplay percentage={6} />)
    vi.runAllTimers()
    const svg = document.querySelector('svg')
    expect(svg).toBeNull()
  })

  it("animates the percentage after 100ms", async () => {
    render(<WaterTankDisplay percentage={70} />)

    let fillDiv = document.querySelector(".bg-blue-400")
    expect(fillDiv?.style.height).toBe("0%")

    await act(() => {
      vi.advanceTimersByTime(100)
      return Promise.resolve()
    })

    fillDiv = document.querySelector(".bg-blue-400")
    expect(fillDiv?.style.height).toBe("70%")
  })
})
