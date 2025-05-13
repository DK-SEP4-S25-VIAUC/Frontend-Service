import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock the custom hooks
vi.mock('../../hooks/watering/useGetAutomaticWateringStatus.jsx', () => ({
    default: vi.fn(),
}));
vi.mock('../../hooks/watering/usePostAutomaticWatering.jsx', () => ({
    default: vi.fn(),
}));

import useGetAutomaticWateringStatus from '../../hooks/watering/useGetAutomaticWateringStatus.jsx';
import usePostAutomaticWatering from '../../hooks/watering/usePostAutomaticWatering.jsx';
import AutomaticWateringCard from './AutomaticWateringCard';

describe('AutomaticWateringCard', () => {
    beforeEach(() => {
        vi.resetAllMocks();
        usePostAutomaticWatering.mockReturnValue({
            submitAutomaticWatering: vi.fn(),
            isPending: false,
            isSuccess: false,
            isError: false,
            error: null,
        });
    });

    it('renders loading state initially', () => {
        useGetAutomaticWateringStatus.mockReturnValue({
            automaticWateringStatus: null,
            isLoading: true,
            isError: false,
            error: null,
        });

        render(<AutomaticWateringCard />);
        expect(screen.getByText(/Loading current mode/i)).toBeInTheDocument();
    });

    it('renders error if fetching status fails', () => {
        useGetAutomaticWateringStatus.mockReturnValue({
            automaticWateringStatus: null,
            isLoading: false,
            isError: true,
            error: { message: 'Fetch error' },
        });

        render(<AutomaticWateringCard />);
        expect(screen.getByText(/Error: Fetch error/i)).toBeInTheDocument();
    });

    it('renders form and reflects manual mode by default', () => {
        useGetAutomaticWateringStatus.mockReturnValue({
            automaticWateringStatus: { automatic_watering: false },
            isLoading: false,
            isError: false,
            error: null,
        });

        render(<AutomaticWateringCard />);
        const select = screen.getByLabelText(/Select Mode/i);
        expect(select.value).toBe('manual');
        expect(screen.getByRole('button', { name: /Save/i })).toBeEnabled();
    });

    it('allows changing to automatic and submits correctly', () => {
        const mockSubmit = vi.fn();
        useGetAutomaticWateringStatus.mockReturnValue({
            automaticWateringStatus: { automatic_watering: false },
            isLoading: false,
            isError: false,
            error: null,
        });
        usePostAutomaticWatering.mockReturnValue({
            submitAutomaticWatering: mockSubmit,
            isPending: false,
            isSuccess: false,
            isError: false,
            error: null,
        });

        render(<AutomaticWateringCard />);
        const select = screen.getByLabelText(/Select Mode/i);
        fireEvent.change(select, { target: { value: 'automatic' } });
        expect(select.value).toBe('automatic');

        const button = screen.getByRole('button', { name: /Save/i });
        fireEvent.click(button);
        expect(mockSubmit).toHaveBeenCalledWith({ automatic_watering: true });
    });

    it('disables form while pending and shows submitting text', () => {
        useGetAutomaticWateringStatus.mockReturnValue({
            automaticWateringStatus: { automatic_watering: true },
            isLoading: false,
            isError: false,
            error: null,
        });
        usePostAutomaticWatering.mockReturnValue({
            submitAutomaticWatering: vi.fn(),
            isPending: true,
            isSuccess: false,
            isError: false,
            error: null,
        });

        render(<AutomaticWateringCard />);
        const select = screen.getByLabelText(/Select Mode/i);
        expect(select).toBeDisabled();
        expect(screen.getByRole('button', { name: /Submitting.../i })).toBeDisabled();
    });

    it('shows success message on successful submit', () => {
        useGetAutomaticWateringStatus.mockReturnValue({
            automaticWateringStatus: { automatic_watering: true },
            isLoading: false,
            isError: false,
            error: null,
        });
        usePostAutomaticWatering.mockReturnValue({
            submitAutomaticWatering: vi.fn(),
            isPending: false,
            isSuccess: true,
            isError: false,
            error: null,
        });

        render(<AutomaticWateringCard />);
        expect(screen.getByText(/Settings updated successfully!/i)).toBeInTheDocument();
    });

    it('shows error message on submit failure', () => {
        useGetAutomaticWateringStatus.mockReturnValue({
            automaticWateringStatus: { automatic_watering: false },
            isLoading: false,
            isError: false,
            error: null,
        });
        usePostAutomaticWatering.mockReturnValue({
            submitAutomaticWatering: vi.fn(),
            isPending: false,
            isSuccess: false,
            isError: true,
            error: { message: 'Submit error' },
        });

        render(<AutomaticWateringCard />);
        expect(screen.getByText(/Error: Submit error/i)).toBeInTheDocument();
    });
});
