import { describe, it, expect, beforeEach, afterAll, vi } from 'vitest';
import { fetchSoilHumidityHistory } from '../../src/api/soilHumidityHistoryApi';

const OLD_ENV = process.env;

const FROM_DATE = '2025-05-12T14:46:00.00Z';
const TO_DATE = '2025-05-12T15:52:00.00Z';
const API_URL = `https://sep4api.azure-api.net/api/iot/sample?from=${encodeURIComponent(FROM_DATE)}&to=${encodeURIComponent(TO_DATE)}`;

beforeEach(() => {
  vi.resetModules();
  process.env = { ...OLD_ENV, NODE_ENV: 'development' };
  global.fetch = vi.fn();
});

afterAll(() => {
  process.env = OLD_ENV;
  delete global.fetch;
});

describe('fetchSoilHumidityHistory(from, to)', () => {
  it('returns SampleDTOs on 200 (Success)', async () => {
    const mockApiResponse = {
      response: {
        list: [
          { SampleDTO: { id: 1, soil_humidity: 45, timestamp: '2025-01-01T00:00:00Z' } },
          { SampleDTO: { id: 2, soil_humidity: 42, timestamp: '2025-01-01T01:00:00Z' } },
        ],
      },
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockApiResponse),
    });

    const data = await fetchSoilHumidityHistory(FROM_DATE, TO_DATE);

    expect(data).toEqual([
      { id: 1, soil_humidity: 45, timestamp: '2025-01-01T00:00:00Z' },
      { id: 2, soil_humidity: 42, timestamp: '2025-01-01T01:00:00Z' },
    ]);

    expect(fetch).toHaveBeenCalledWith(API_URL, { method: 'GET', redirect: 'follow' });
  });

  it('throws error on 500 status', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    fetch.mockResolvedValueOnce({ ok: false, status: 500, statusText: 'Server Error' });

    await expect(fetchSoilHumidityHistory(FROM_DATE, TO_DATE))
      .rejects
      .toThrow('HTTP Error: 500 Server Error');
  });

  it('returns mock data on 404 in development', async () => {
    fetch.mockResolvedValueOnce({ ok: false, status: 404 });

    const data = await fetchSoilHumidityHistory(FROM_DATE, TO_DATE);
    expect(data).toHaveLength(1);
    expect(data[0]).toHaveProperty('timestamp');
    expect(data[0]).toHaveProperty('soil_humidity');
  });
});
