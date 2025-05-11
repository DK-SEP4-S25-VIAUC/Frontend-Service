import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ToggleWaterPlant from './ToggleWaterPlant';
import { useWateringRequest } from '../../../hooks/watering/useWateringRequest.js';
import { toast } from 'react-toastify';

// Mock the custom hook
vi.mock('../../../hooks/watering/useWateringRequest.js');

// Mock toast notifications
vi.mock('react-toastify', () => ({
    toast: {
        loading: vi.fn(),
        update: vi.fn(),
    },
}));

// Mock lucide-react icon
vi.mock('lucide-react', () => ({
    Droplets: (props) => <svg {...props} data-testid="droplets-icon">Droplets</svg>
}));

describe('ToggleWaterPlant', () => {
    // Default mock implementation
    const defaultMutation = {
        mutate: vi.fn(),
        isPending: false,
    };

    beforeEach(() => {
        vi.clearAllMocks();
        useWateringRequest.mockReturnValue(defaultMutation);
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    describe('Rendering', () => {
        it('renders correctly with default props', () => {
            render(<ToggleWaterPlant isDisabled={false} waterAmount={0} />);

            expect(screen.getByTestId('droplets-icon')).toBeInTheDocument();
            expect(screen.getByText('Water Plant')).toBeInTheDocument();
        });

        it('displays water amount when provided', () => {
            render(<ToggleWaterPlant isDisabled={false} waterAmount={250} />);

            expect(screen.getByText('Water Plant (250ml)')).toBeInTheDocument();
        });

        it('does not display water amount when zero or undefined', () => {
            const { rerender } = render(<ToggleWaterPlant isDisabled={false} waterAmount={0} />);
            expect(screen.getByText('Water Plant')).toBeInTheDocument();

            rerender(<ToggleWaterPlant isDisabled={false} />);
            expect(screen.getByText('Water Plant')).toBeInTheDocument();
        });
    });

    describe('Disabled State', () => {
        it('applies disabled styling when isDisabled is true', () => {
            render(<ToggleWaterPlant isDisabled={true} waterAmount={100} />);

            const container = screen.getByTestId('droplets-icon').parentElement;
            expect(container).toHaveClass('opacity-50', 'cursor-not-allowed');
            expect(container).not.toHaveClass('hover:bg-gray-200', 'cursor-pointer');
        });

        it('applies normal styling when isDisabled is false', () => {
            render(<ToggleWaterPlant isDisabled={false} waterAmount={100} />);

            const container = screen.getByTestId('droplets-icon').parentElement;
            expect(container).not.toHaveClass('opacity-50', 'cursor-not-allowed');
            expect(container).toHaveClass('hover:bg-gray-200', 'cursor-pointer');
        });

        it('does not trigger watering when disabled and clicked', async () => {
            const user = userEvent.setup();
            render(<ToggleWaterPlant isDisabled={true} waterAmount={100} />);

            const container = screen.getByTestId('droplets-icon').parentElement;
            await user.click(container);

            expect(defaultMutation.mutate).not.toHaveBeenCalled();
            expect(toast.loading).not.toHaveBeenCalled();
        });
    });

    describe('Pending State', () => {
        it('applies disabled styling when mutation is pending', () => {
            useWateringRequest.mockReturnValue({
                ...defaultMutation,
                isPending: true,
            });

            render(<ToggleWaterPlant isDisabled={false} waterAmount={100} />);

            const container = screen.getByTestId('droplets-icon').parentElement;
            expect(container).toHaveClass('opacity-50', 'cursor-not-allowed');
        });
    });

    describe('Watering Functionality', () => {
        it('triggers watering mutation when clicked and not disabled', async () => {
            const user = userEvent.setup();
            const mutateMock = vi.fn();

            useWateringRequest.mockReturnValue({
                ...defaultMutation,
                mutate: mutateMock,
            });

            render(<ToggleWaterPlant isDisabled={false} waterAmount={200} />);

            const container = screen.getByTestId('droplets-icon').parentElement;
            await user.click(container);

            expect(toast.loading).toHaveBeenCalledWith("Watering plant...", { toastId: "watering" });
            expect(mutateMock).toHaveBeenCalledWith(200);
        });

        it('handles successful watering', async () => {
            const user = userEvent.setup();
            let onSuccessHandler;

            useWateringRequest.mockImplementation(({ onSuccess }) => {
                onSuccessHandler = onSuccess;
                return defaultMutation;
            });

            render(<ToggleWaterPlant isDisabled={false} waterAmount={150} />);

            // Trigger click
            const container = screen.getByTestId('droplets-icon').parentElement;
            await user.click(container);

            // Simulate successful response
            const successData = {
                data: { waterAmount: 150 }
            };
            onSuccessHandler(successData);

            expect(toast.update).toHaveBeenCalledWith("watering", {
                render: "Watering successful: 150",
                type: "success",
                isLoading: false,
                autoClose: 2000,
            });
        });

        it('handles failed watering', async () => {
            const user = userEvent.setup();
            let onErrorHandler;

            useWateringRequest.mockImplementation(({ onError }) => {
                onErrorHandler = onError;
                return defaultMutation;
            });

            render(<ToggleWaterPlant isDisabled={false} waterAmount={150} />);

            // Trigger click
            const container = screen.getByTestId('droplets-icon').parentElement;
            await user.click(container);

            // Simulate error response
            const errorData = {
                message: "Network error"
            };
            onErrorHandler(errorData);

            expect(toast.update).toHaveBeenCalledWith("watering", {
                render: "Watering failed: Network error",
                type: "error",
                isLoading: false,
                autoClose: 2000,
            });
        });
    });

    describe('useEffect Behavior', () => {
        it('logs water amount changes', () => {
            const consoleSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});

            const { rerender } = render(<ToggleWaterPlant isDisabled={false} waterAmount={100} />);
            expect(consoleSpy).toHaveBeenCalledWith('ToggleWaterPlant received waterAmount:', 100);

            rerender(<ToggleWaterPlant isDisabled={false} waterAmount={200} />);
            expect(consoleSpy).toHaveBeenCalledWith('ToggleWaterPlant received waterAmount:', 200);

            consoleSpy.mockRestore();
        });
    });

    describe('Integration with useWateringRequest', () => {
        it('passes correct handlers to useWateringRequest hook', () => {
            render(<ToggleWaterPlant isDisabled={false} waterAmount={100} />);

            expect(useWateringRequest).toHaveBeenCalledWith({
                onSuccess: expect.any(Function),
                onError: expect.any(Function),
            });
        });
    });

    describe('Dark Mode', () => {
        it('includes dark mode classes', () => {
            render(<ToggleWaterPlant isDisabled={false} waterAmount={100} />);

            const container = screen.getByTestId('droplets-icon').parentElement;
            expect(container).toHaveClass('dark:bg-gray-700', 'dark:hover:bg-gray-600');

            const text = screen.getByText('Water Plant (100ml)');
            expect(text).toHaveClass('dark:text-gray-300');

            const icon = screen.getByTestId('droplets-icon');
            expect(icon).toHaveClass('dark:text-gray-300');
        });
    });

    describe('Edge Cases', () => {
        it('handles undefined waterAmount prop', async () => {
            const user = userEvent.setup();
            const mutateMock = vi.fn();

            useWateringRequest.mockReturnValue({
                ...defaultMutation,
                mutate: mutateMock,
            });

            render(<ToggleWaterPlant isDisabled={false} />);

            const container = screen.getByTestId('droplets-icon').parentElement;
            await user.click(container);

            expect(mutateMock).toHaveBeenCalledWith(undefined);
        });

        it('handles click events when both disabled and pending', async () => {
            const user = userEvent.setup();

            useWateringRequest.mockReturnValue({
                ...defaultMutation,
                isPending: true,
            });

            render(<ToggleWaterPlant isDisabled={true} waterAmount={100} />);

            const container = screen.getByTestId('droplets-icon').parentElement;
            await user.click(container);

            expect(defaultMutation.mutate).not.toHaveBeenCalled();
        });
    });
});