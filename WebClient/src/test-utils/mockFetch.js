import { vi } from 'vitest';

export function mockFetchSuccess(data) {
  return vi.spyOn(global, 'fetch').mockResolvedValue({
    ok: true,
    status: 200,
    statusText: 'OK',
    json: async () => data,
  });
}

export function mockFetchError(status = 500, statusText = 'Internal Server Error') {
  return vi.spyOn(global, 'fetch').mockResolvedValue({
    ok: false,
    status,
    statusText,
    json: async () => ({}),
  });
}

export function mockFetchNotFound() {
  return vi.spyOn(global, 'fetch').mockResolvedValue({
    ok: false,
    status: 404,
    statusText: 'Not Found',
    json: async () => ({}),
  });
}

export function mockFetchReject(error = new Error('Network error')) {
  return vi.spyOn(global, 'fetch').mockRejectedValue(error);
}