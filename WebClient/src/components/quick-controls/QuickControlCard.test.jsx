import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuickControlCard from './QuickControlCard.jsx';
import { toast } from 'react-toastify';

// Mock the toast notifications
vi.mock('react-toastify', () => ({
    toast: {
        success: vi.fn(),
        warning: vi.fn()
    }
}));

// Mock the child components
vi.mock('./toggles/ToggleLight.jsx', () => ({
    default: ({ isDisabled }) => <div data-testid="toggle-light" data-disabled={isDisabled}>Light Toggle</div>
}));

vi.mock('./toggles/ToggleVentilation.jsx', () => ({
    default: ({ isDisabled }) => <div data-testid="toggle-ventilation" data-disabled={isDisabled}>Ventilation Toggle</div>
}));

vi.mock('./toggles/ToggleWaterPlant.jsx', () => ({
    default: ({ isDisabled, waterAmount }) => (
        <div data-testid="toggle-water-plant" data-disabled={isDisabled} data-water-amount={waterAmount}>
            Water Plant Toggle
        </div>
    )
}));

vi.mock('./toggles/AddDevice.jsx', () => ({
    default: ({ isDisabled }) => <div data-testid="add-device" data-disabled={isDisabled}>Add Device</div>
}));

describe('QuickControlCard', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the component with default state', () => {
        render(<QuickControlCard />);

        // Check if the title is rendered
        expect(screen.getByText('Quick Controls')).toBeInTheDocument();

        // Check if all toggle components are rendered
        expect(screen.getByTestId('toggle-light')).toBeInTheDocument();
        expect(screen.getByTestId('toggle-ventilation')).toBeInTheDocument();
        expect(screen.getByTestId('toggle-water-plant')).toBeInTheDocument();
        expect(screen.getByTestId('add-device')).toBeInTheDocument();

        // Check default water amount is passed to the ToggleWaterPlant component
        expect(screen.getByTestId('toggle-water-plant')).toHaveAttribute('data-water-amount', '100');
    });

    it('toggles between controls and settings view when settings icon is clicked', async () => {
        render(<QuickControlCard />);
        const user = userEvent.setup();

        // Initially controls are shown
        expect(screen.getByTestId('toggle-light')).toBeInTheDocument();

        // Click settings icon to toggle to settings view
        await user.click(screen.getByTitle('Toggle settings'));

        // Controls should be hidden, settings form should be visible
        expect(screen.queryByTestId('toggle-light')).not.toBeInTheDocument();
        expect(screen.getByLabelText(/water amount/i)).toBeInTheDocument();
        expect(screen.getByText('Save')).toBeInTheDocument();

        // Click settings icon again to toggle back to controls view
        await user.click(screen.getByTitle('Toggle settings'));

        // Settings form should be hidden, controls should be visible
        expect(screen.getByTestId('toggle-light')).toBeInTheDocument();
        expect(screen.queryByLabelText(/water amount/i)).not.toBeInTheDocument();
    });

    it('updates water amount when valid input is submitted', async () => {
        render(<QuickControlCard />);
        const user = userEvent.setup();

        // Go to settings view
        await user.click(screen.getByTitle('Toggle settings'));

        // Enter new water amount and submit
        const input = screen.getByLabelText(/water amount/i);
        await user.clear(input);
        await user.type(input, '250');
        await user.click(screen.getByText('Save'));

        // Should show success toast
        expect(toast.success).toHaveBeenCalledWith('Water amount set to 250 ml');

        // Water amount should be updated
        expect(screen.getByTestId('toggle-water-plant')).toHaveAttribute('data-water-amount', '250');
    });

    it('filters non-numeric characters from input', async () => {
        render(<QuickControlCard />);
        const user = userEvent.setup();

        // Go to settings view
        await user.click(screen.getByTitle('Toggle settings'));

        // Enter water amount with non-numeric characters
        const input = screen.getByLabelText(/water amount/i);
        await user.clear(input);
        await user.type(input, '1a2b3c');

        // Input should only contain numeric characters
        expect(input.value).toBe('123');
    });

    it('disables save button when input is invalid', async () => {
        render(<QuickControlCard />);
        const user = userEvent.setup();

        // Go to settings view
        await user.click(screen.getByTitle('Toggle settings'));

        // Clear input
        const input = screen.getByLabelText(/water amount/i);
        await user.clear(input);

        // Save button should be disabled
        expect(screen.getByText('Save')).toBeDisabled();

        // Enter 0 (invalid)
        await user.type(input, '0');
        expect(screen.getByText('Save')).toBeDisabled();

        // Enter valid number
        await user.clear(input);
        await user.type(input, '50');
        expect(screen.getByText('Save')).not.toBeDisabled();
    });

    it('verifies the correct disabled states for toggle components', () => {
        render(<QuickControlCard />);

        // Check disabled status for each toggle
        expect(screen.getByTestId('toggle-light')).toHaveAttribute('data-disabled', 'true');
        expect(screen.getByTestId('toggle-ventilation')).toHaveAttribute('data-disabled', 'true');
        expect(screen.getByTestId('toggle-water-plant')).toHaveAttribute('data-disabled', 'false');
        expect(screen.getByTestId('add-device')).toHaveAttribute('data-disabled', 'true');
    });
});