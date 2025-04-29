import { describe, it, expect, vi, afterEach } from 'vitest';
import { fetchLatestSoilHumidity } from './soilHumidityLatestApi.js';
import { mockFetchSuccess, mockFetchNotFound, mockFetchError, mockFetchReject } from '../test-utils/mockFetch.js';

// Mock import.meta.env.MODE for development mode testing
vi.mock('import.meta', () => ({
  env: { MODE: 'development' },
}));

describe('fetchLatestSoilHumidity', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns mock data on 404 in development mode', async () => {
    mockFetchNotFound();

    const data = await fetchLatestSoilHumidity();

    expect(data).toHaveProperty('id', 0);
    expect(data.soil_humidity_value).toBeGreaterThanOrEqual(0);
    expect(data.soil_humidity_value).toBeLessThanOrEqual(100);
    expect(data.time_stamp).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/); // ISO date format
    expect(console.debug).toHaveBeenCalledWith('Development mode: No data found, returning mock data');
  });

  it('returns data when fetch is successful', async () => {
    const mockData = { id: 1, soil_humidity_value: 50, time_stamp: '2025-04-28T12:00:00Z' };
    mockFetchSuccess(mockData);

    const data = await fetchLatestSoilHumidity();

    expect(data).toEqual(mockData);
    expect(console.debug).toHaveBeenCalledWith('Fetched soil humidity data:', mockData);
  });

  it('throws error when fetch response is not ok', async () => {
    mockFetchError(500, 'Internal Server Error');

    await expect(fetchLatestSoilHumidity()).rejects.toThrow(
      'Failed to fetch soil humidity data: HTTP Error: 500 Internal Server Error'
    );
    expect(console.error).toHaveBeenCalledWith(
      'Failed to fetch soil humidity data: HTTP Error: 500 Internal Server Error'
    );
  });

  it('throws error when fetch itself fails', async () => {
    mockFetchReject('Network error');

    await expect(fetchLatestSoilHumidity()).rejects.toThrow(
      'Failed to fetch soil humidity data: Network error'
    );
    expect(console.error).toHaveBeenCalledWith(
      'Failed to fetch soil humidity data: Network error'
    );
  });

  it('handles unknown errors gracefully', async () => {
    mockFetchReject({}); // Non-Error object to simulate unknown error

    await expect(fetchLatestSoilHumidity()).rejects.toThrow(
      'Failed to fetch soil humidity data: Unknown error'
    );
    expect(console.error).toHaveBeenCalledWith(
      'Failed to fetch soil humidity data: Unknown error'
    );
  });
});