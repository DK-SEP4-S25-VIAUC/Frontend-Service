import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { SoilHumidityHistoryCard } from "./SoilHumidityHistoryCard";


vi.mock("../../../hooks/soil-humidity/useHistorySoilHumidity", () => ({
  useSoilHumidityHistory: () => ({
    data: [{ timestamp: new Date().toISOString(), value: 20 }],
    isLoading: false,
    isError: false,
    error: null,
    refetch: vi.fn(),
  }),
}));

vi.mock("../../graph/SoilLineGraph", () => ({
  default: () => <div data-testid="line-graph">Line Graph</div>,
}));

vi.mock("../../Loader", () => ({
  default: () => <div data-testid="loader">Loading...</div>,
}));

vi.mock("../../calender/CalenderModal", () => ({
  default: ({ onClose }) => (
    <div data-testid="calendar-modal">
      Calendar Modal
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

describe("SoilHumidityHistoryCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the title and graph", () => {
    render(<SoilHumidityHistoryCard />);
    expect(screen.getByText("Soil Humidity")).toBeInTheDocument();
    expect(screen.getByTestId("line-graph")).toBeInTheDocument();
  });

  it("opens and closes the calendar modal", () => {
    render(<SoilHumidityHistoryCard />);
    const button = screen.getByText("Select Date Range");
    fireEvent.click(button);
    expect(screen.getByTestId("calendar-modal")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Close"));
    expect(screen.queryByTestId("calendar-modal")).not.toBeInTheDocument();
  });
});
