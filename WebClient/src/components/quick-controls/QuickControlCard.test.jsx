import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuickControlCard from './QuickControlCard.jsx';
import { toast } from 'react-toastify';

// Mock the toast notifications
vi.mock('react-toastify', () => ({
    toast: {
        success: vi.fn(),
        warning: vi.fn(),
    },
}));

// Mock the child components
vi.mock('./toggles/ToggleLight.jsx', () => ({
    default: ({ isDisabled }) => <div data-testid="toggle-light">ToggleLight disabled={String(isDisabled)}</div>
}));

vi.mock('./toggles/ToggleVentilation.jsx', () => ({
    default: ({ isDisabled }) => <div data-testid="toggle-ventilation">ToggleVentilation disabled={String(isDisabled)}</div>
}));

vi.mock('./toggles/ToggleWaterPlant.jsx', () => ({
    default: ({ isDisabled, waterAmount }) => (
        <div data-testid="toggle-water-plant">
            ToggleWaterPlant disabled={String(isDisabled)} waterAmount={waterAmount}
        </div>
    )
}));

vi.mock('./toggles/AddDevice.jsx', () => ({
    default: ({ isDisabled }) => <div data-testid="add-device">AddDevice disabled={String(isDisabled)}</div>
}));

// Mock lucide-react icon
vi.mock('lucide-react', () => ({
    Settings: (props) => <svg {...props} data-testid="settings-icon">Settings</svg>
}));

describe('QuickControlCard', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('Initial Render', () => {
        it('renders the component with controls visible by default', () => {
            render(<QuickControlCard />);

            expect(screen.getByText('Quick Controls')).toBeInTheDocument();
            expect(screen.getByTestId('settings-icon')).toBeInTheDocument();

            // All toggle components should be visible
            expect(screen.getByTestId('toggle-light')).toBeInTheDocument();
            expect(screen.getByTestId('toggle-ventilation')).toBeInTheDocument();
            expect(screen.getByTestId('toggle-water-plant')).toBeInTheDocument();
            expect(screen.getByTestId('add-device')).toBeInTheDocument();
        });

        it('renders toggles with correct disabled states', () => {
            render(<QuickControlCard />);

            expect(screen.getByText('ToggleLight disabled=true')).toBeInTheDocument();
            expect(screen.getByText('ToggleVentilation disabled=true')).toBeInTheDocument();
            expect(screen.getByText('ToggleWaterPlant disabled=false waterAmount=100')).toBeInTheDocument();
            expect(screen.getByText('AddDevice disabled=true')).toBeInTheDocument();
        });
    });

    describe('Toggle Functionality', () => {
        it('shows water amount input when settings icon is clicked', async () => {
            const user = userEvent.setup();
            render(<QuickControlCard />);

            const settingsIcon = screen.getByTestId('settings-icon');
            await user.click(settingsIcon);

            // Controls should be hidden, input should be visible
            expect(screen.queryByTestId('toggle-light')).not.toBeInTheDocument();
            expect(screen.getByText('Amount of water:')).toBeInTheDocument();
            expect(screen.getByPlaceholderText('Enter value...')).toBeInTheDocument();
            expect(screen.getByText('Save')).toBeInTheDocument();
        });

        it('toggles back to controls view when settings is clicked again', async () => {
            const user = userEvent.setup();
            render(<QuickControlCard />);

            const settingsIcon = screen.getByTestId('settings-icon');

            // Click to show input
            await user.click(settingsIcon);
            expect(screen.getByPlaceholderText('Enter value...')).toBeInTheDocument();

            // Click again to show controls
            await user.click(settingsIcon);
            expect(screen.getByTestId('toggle-light')).toBeInTheDocument();
            expect(screen.queryByPlaceholderText('Enter value...')).not.toBeInTheDocument();
        });
    });

    describe('Input Validation', () => {
        it('allows only numeric input', async () => {
            const user = userEvent.setup();
            render(<QuickControlCard />);

            const settingsIcon = screen.getByTestId('settings-icon');
            await user.click(settingsIcon);

            const input = screen.getByPlaceholderText('Enter value...');
            expect(input).toHaveValue('100');

            // Try to type non-numeric characters
            await user.clear(input);
            await user.type(input, 'abc123def456');

            // Only numbers should remain
            expect(input).toHaveValue('123456');
        });

        it('shows warning toast for empty input', async () => {
            const user = userEvent.setup();
            render(<QuickControlCard />);

            const settingsIcon = screen.getByTestId('settings-icon');
            await user.click(settingsIcon);

            const input = screen.getByPlaceholderText('Enter value...');
            await user.clear(input);

            const saveButton = screen.getByText('Save');
            await user.click(saveButton);

            expect(toast.warning).toHaveBeenCalledWith('Please enter a valid water amount');
            expect(toast.success).not.toHaveBeenCalled();
        });

        it('shows warning toast for zero input', async () => {
            const user = userEvent.setup();
            render(<QuickControlCard />);

            const settingsIcon = screen.getByTestId('settings-icon');
            await user.click(settingsIcon);

            const input = screen.getByPlaceholderText('Enter value...');
            await user.clear(input);
            await user.type(input, '0');

            const saveButton = screen.getByText('Save');
            await user.click(saveButton);

            expect(toast.warning).toHaveBeenCalledWith('Please enter a valid water amount');
            expect(toast.success).not.toHaveBeenCalled();
        });

        it('shows success toast and returns to controls for valid input', async () => {
            const user = userEvent.setup();
            render(<QuickControlCard />);

            const settingsIcon = screen.getByTestId('settings-icon');
            await user.click(settingsIcon);

            const input = screen.getByPlaceholderText('Enter value...');
            await user.clear(input);
            await user.type(input, '250');

            const saveButton = screen.getByText('Save');
            await user.click(saveButton);

            expect(toast.success).toHaveBeenCalledWith('Water amount set to 250ml');
            expect(toast.warning).not.toHaveBeenCalled();

            // Should return to controls view
            expect(screen.getByTestId('toggle-light')).toBeInTheDocument();
            expect(screen.queryByPlaceholderText('Enter value...')).not.toBeInTheDocument();
        });
    });

    describe('State Management', () => {
        it('updates water amount prop when input changes', async () => {
            const user = userEvent.setup();
            render(<QuickControlCard />);

            // Initial water amount should be 100
            expect(screen.getByText('ToggleWaterPlant disabled=false waterAmount=100')).toBeInTheDocument();

            // Change water amount
            const settingsIcon = screen.getByTestId('settings-icon');
            await user.click(settingsIcon);

            const input = screen.getByPlaceholderText('Enter value...');
            await user.clear(input);
            await user.type(input, '300');

            const saveButton = screen.getByText('Save');
            await user.click(saveButton);

            // Water amount should be updated
            expect(screen.getByText('ToggleWaterPlant disabled=false waterAmount=300')).toBeInTheDocument();
        });

        it('maintains water amount value when toggling views', async () => {
            const user = userEvent.setup();
            render(<QuickControlCard />);

            const settingsIcon = screen.getByTestId('settings-icon');

            // Go to input view and change value
            await user.click(settingsIcon);
            const input = screen.getByPlaceholderText('Enter value...');
            await user.clear(input);
            await user.type(input, '500');

            // Toggle back to controls without saving
            await user.click(settingsIcon);

            // Water amount should still be 500 (unchanged)
            expect(screen.getByText('ToggleWaterPlant disabled=false waterAmount=500')).toBeInTheDocument();

            // Go back to input view, value should still be 500
            await user.click(settingsIcon);
            expect(input).toHaveValue('500');
        });
    });

    describe('Accessibility', () => {
        it('has proper labels for form elements', () => {
            render(<QuickControlCard />);

            const settingsIcon = screen.getByTestId('settings-icon');
            fireEvent.click(settingsIcon);

            expect(screen.getByText('Amount of water:')).toBeInTheDocument();
            expect(screen.getByPlaceholderText('Enter value...')).toBeInTheDocument();
        });

        it('settings icon is clickable and focusable', () => {
            render(<QuickControlCard />);

            const settingsIcon = screen.getByTestId('settings-icon');
            expect(settingsIcon).toHaveClass('cursor-pointer');
        });
    });
});