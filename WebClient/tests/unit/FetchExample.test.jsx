import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import FetchExample from '../../src/components/FetchExample';

// Mock the fetch function
// This is necessary to avoid making actual network requests during tests
const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

describe('FetchExample', () => {
    beforeEach(() => {
        // Reset mocks before each test
        mockFetch.mockReset();

        // Setup default mock implementation
        mockFetch.mockImplementation(() =>
            Promise.resolve({
                ok: true,
                headers: new Headers({ 'content-type': 'application/json' }),
                json: () => Promise.resolve({ data: 'test data' })
            })
        );
    });

    it('renders multiple loading states initially', async () => {
        // Render the component
        render(<FetchExample />);

        // Check if loading states are displayed
        // Use getAllByText instead of getByText since there are multiple matches
        const loadingElements = screen.getAllByText(/loading data/i);
        expect(loadingElements.length).toBe(2);

        // Wait for the component to finish rendering
        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledTimes(2);
        });
    });
});