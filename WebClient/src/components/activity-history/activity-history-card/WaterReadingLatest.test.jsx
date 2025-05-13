import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import WaterReadingLatest from "./WaterReadingLatest"

vi.mock("./WaterTankDisplay", () => ({
  default: ({ percentage }) => (
    <div data-testid="water-tank">Tank: {percentage}%</div>
  ),
}))

vi.mock("./WaterLevelInfo", () => ({
  default: ({ isLoading, waterValue, percentage, maxLevel }) => (
    <div data-testid="water-info">
      {isLoading ? "Loading..." : `${waterValue}L (${percentage}%) / ${maxLevel}L`}
    </div>
  ),
}))

describe("<WaterReadingLatest />", () => {
  it("renders with valid water reading", () => {
    const fakeReadings = { data: 1400, isLoading: false }

    render(<WaterReadingLatest waterReadings={fakeReadings} />)

    expect(screen.getByTestId("water-tank")).toHaveTextContent("70%")
    expect(screen.getByTestId("water-info")).toHaveTextContent("1400L (70%)")
  })

  it("renders zero when no data is given", () => {
    const fakeReadings = { data: null, isLoading: false }

    render(<WaterReadingLatest waterReadings={fakeReadings} />)

    expect(screen.getByTestId("water-tank")).toHaveTextContent("0%")
    expect(screen.getByTestId("water-info")).toHaveTextContent("0L (0%)")
  })

  it("shows loading state", () => {
    const fakeReadings = { data: 500, isLoading: true }

    render(<WaterReadingLatest waterReadings={fakeReadings} />)

    expect(screen.getByTestId("water-info")).toHaveTextContent("Loading")
  })
})
