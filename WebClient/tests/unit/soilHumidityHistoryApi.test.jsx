import { describe, it, expect, beforeEach, afterAll, vi } from 'vitest'
import { fetchSoilHumidityHistory } from '../../src/api/soilHumidityHistoryApi'

const OLD_ENV = process.env //Enviroment before test

beforeEach(() => { //Runs before every test
  vi.resetModules() //Clears cache
  process.env = { ...OLD_ENV, NODE_ENV: 'development' } //Sets to dev env
  global.fetch = vi.fn() //Mocked fetch
})

afterAll(() => { //After all tests
  process.env = OLD_ENV //Restores env
  delete global.fetch //Deletes mock fetch
})

describe('fetchSoilHumidityHistory()', () => {
  it('returns JSON array on 200(Success)', async () => {
    const mockData = [{ id: 1, time_stamp: '2025-05-06T10:00:00Z', soil_humidity_value: 42 }]
    fetch.mockResolvedValueOnce({ //Mocks fetch seen above
      ok: true,
      json: () => Promise.resolve(mockData),
    })

    const data = await fetchSoilHumidityHistory() //Calls out function with fetch (is set to the mocked)
    expect(data).toEqual(mockData) 
    expect(fetch).toHaveBeenCalledWith('/api/IoT/soilhumidity')
  })

  it('error on error message 500', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {}) //Hide error from console

    fetch.mockResolvedValueOnce({ ok: false, status: 500, statusText: 'Server Error' })
    await expect(fetchSoilHumidityHistory())
      .rejects
      .toThrow('HTTP Error: 500 Server Error')
  })

  it('in dev-mode, 404 returns a mock array of 1 object', async () => {
    fetch.mockResolvedValueOnce({ ok: false, status: 404 })
    const data = await fetchSoilHumidityHistory()
    expect(Array.isArray(data)).toBe(true)
    expect(data).toHaveLength(1)
    expect(data[0]).toHaveProperty('soil_humidity_value')
    expect(data[0]).toHaveProperty('time_stamp')
  })
})
