import React from 'react'
import { render, screen } from '@testing-library/react'
import WaterLevelInfo from './WaterLevelInfo'

describe('WaterLevelInfo Component', () => {
  test('renders correct value and status when percentage is high (e.g. 80%)', () => {
    render(<WaterLevelInfo isLoading={false} waterValue={1600} percentage={80} maxLevel={2000} />)

    expect(screen.getByText('1.6')).toBeInTheDocument()
    expect(screen.getByText(/2.0L capacity/)).toBeInTheDocument()
    expect(screen.getByText(/80% • Good/)).toBeInTheDocument()
  })

  test('renders status as "Full" when percentage >= 90', () => {
    render(<WaterLevelInfo isLoading={false} waterValue={1900} percentage={95} maxLevel={2000} />)

    expect(screen.getByText(/95% • Full/)).toBeInTheDocument()
  })

  test('renders status as "Low" when percentage <= 30', () => {
    render(<WaterLevelInfo isLoading={false} waterValue={500} percentage={25} maxLevel={2000} />)

    expect(screen.getByText(/25% • Low/)).toBeInTheDocument()
  })

  test('renders status as "Critical" when percentage <= 10', () => {
    render(<WaterLevelInfo isLoading={false} waterValue={100} percentage={5} maxLevel={2000} />)

    expect(screen.getByText(/5% • Critical/)).toBeInTheDocument()
  })
})
