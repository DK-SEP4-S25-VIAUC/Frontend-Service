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
            expect(screen.getByText('ToggleWaterPlant disabled=false waterAmount=5')).toBeInTheDocument();
            expect(screen.getByText('AddDevice disabled=true')).toBeInTheDocument();
        });
    });

    describe('Toggle Functionality', () => {
        it('shows watering duration input when settings icon is clicked', async () => {
            const user = userEvent.setup();
            render(<QuickControlCard />);

            const settingsIcon = screen.getByTestId('settings-icon');
            await user.click(settingsIcon);

            // Controls should be hidden, input should be visible
            expect(screen.queryByTestId('toggle-light')).not.toBeInTheDocument();
            expect(screen.getByText('Watering duration (in seconds):')).toBeInTheDocument();
            expect(screen.getByPlaceholderText('e.g. 5')).toBeInTheDocument();
            expect(screen.getByText('Save')).toBeInTheDocument();
        });

        it('toggles back to controls view when settings is clicked again', async () => {
            const user = userEvent.setup();
            render(<QuickControlCard />);

            const settingsIcon = screen.getByTestId('settings-icon');

            // Click to show input
            await user.click(settingsIcon);
            expect(screen.getByPlaceholderText('e.g. 5')).toBeInTheDocument();

            // Click again to show controls
            await user.click(settingsIcon);
            expect(screen.getByTestId('toggle-light')).toBeInTheDocument();
            expect(screen.queryByPlaceholderText('e.g. 5')).not.toBeInTheDocument();
        });
    });

    describe('Input Validation and Toast Messages', () => {
        it('allows only numeric input', async () => {
            const user = userEvent.setup();
            render(<QuickControlCard />);

            const settingsIcon = screen.getByTestId('settings-icon');
            await user.click(settingsIcon);

            const input = screen.getByPlaceholderText('e.g. 5');
            expect(input).toHaveValue('5');

            // Try to type non-numeric characters
            await user.clear(input);
            await user.type(input, 'abc123def456');

            // Only numbers should remain
            expect(input).toHaveValue('123456');
        });

        it('disables save button for empty input', async () => {
            const user = userEvent.setup();
            render(<QuickControlCard />);

            const settingsIcon = screen.getByTestId('settings-icon');
            await user.click(settingsIcon);

            const input = screen.getByPlaceholderText('e.g. 5');
            await user.clear(input);

            const saveButton = screen.getByText('Save');
            expect(saveButton).toBeDisabled();

            // Verify no toast was shown
            expect(toast.warning).not.toHaveBeenCalled();
            expect(toast.success).not.toHaveBeenCalled();
        });

        it('disables save button for zero input', async () => {
            const user = userEvent.setup();
            render(<QuickControlCard />);

            const settingsIcon = screen.getByTestId('settings-icon');
            await user.click(settingsIcon);

            const input = screen.getByPlaceholderText('e.g. 5');
            await user.clear(input);
            await user.type(input, '0');

            const saveButton = screen.getByText('Save');
            expect(saveButton).toBeDisabled();

            // Verify no toast was shown
            expect(toast.warning).not.toHaveBeenCalled();
            expect(toast.success).not.toHaveBeenCalled();
        });


        it('shows success toast and returns to controls for valid input', async () => {
            const user = userEvent.setup();
            render(<QuickControlCard />);

            const settingsIcon = screen.getByTestId('settings-icon');
            await user.click(settingsIcon);

            const input = screen.getByPlaceholderText('e.g. 5');
            await user.clear(input);
            await user.type(input, '10');

            const saveButton = screen.getByText('Save');
            await user.click(saveButton);

            expect(toast.success).toHaveBeenCalledWith('Watering duration set to 10 seconds');
            expect(toast.warning).not.toHaveBeenCalled();

            // Should return to controls view
            expect(screen.getByTestId('toggle-light')).toBeInTheDocument();
            expect(screen.queryByPlaceholderText('e.g. 5')).not.toBeInTheDocument();
        });

        it('uses singular form in success toast for 1 second', async () => {
            const user = userEvent.setup();
            render(<QuickControlCard />);

            const settingsIcon = screen.getByTestId('settings-icon');
            await user.click(settingsIcon);

            const input = screen.getByPlaceholderText('e.g. 5');
            await user.clear(input);
            await user.type(input, '1');

            const saveButton = screen.getByText('Save');
            await user.click(saveButton);

            expect(toast.success).toHaveBeenCalledWith('Watering duration set to 1 second');
        });
    });

    describe('State Management', () => {
        it('updates waterAmount prop when input changes', async () => {
            const user = userEvent.setup();
            render(<QuickControlCard />);

            // Initial watering seconds should be 5
            expect(screen.getByText('ToggleWaterPlant disabled=false waterAmount=5')).toBeInTheDocument();

            // Change watering seconds
            const settingsIcon = screen.getByTestId('settings-icon');
            await user.click(settingsIcon);

            const input = screen.getByPlaceholderText('e.g. 5');
            await user.clear(input);
            await user.type(input, '15');

            const saveButton = screen.getByText('Save');
            await user.click(saveButton);

            // Water amount should be updated
            expect(screen.getByText('ToggleWaterPlant disabled=false waterAmount=15')).toBeInTheDocument();
        });

        it('maintains watering duration value when toggling views without saving', async () => {
            const user = userEvent.setup();
            render(<QuickControlCard />);

            const settingsIcon = screen.getByTestId('settings-icon');

            // Go to input view and change value
            await user.click(settingsIcon);
            const input = screen.getByPlaceholderText('e.g. 5');
            await user.clear(input);
            await user.type(input, '20');

            // Toggle back to controls without saving
            await user.click(settingsIcon);

            // Water amount should still be 5 (unchanged)
            expect(screen.getByText('ToggleWaterPlant disabled=false waterAmount=5')).toBeInTheDocument();

            // Go back to input view, value should be 20
            await user.click(settingsIcon);
            expect(screen.getByPlaceholderText('e.g. 5')).toHaveValue('20');
        });
    });

    describe('Accessibility', () => {
        it('has proper labels for form elements', () => {
            render(<QuickControlCard />);

            const settingsIcon = screen.getByTestId('settings-icon');
            fireEvent.click(settingsIcon);

            expect(screen.getByText('Watering duration (in seconds):')).toBeInTheDocument();
            expect(screen.getByPlaceholderText('e.g. 5')).toBeInTheDocument();
        });

        it('settings icon is clickable and focusable', () => {
            render(<QuickControlCard />);

            const settingsIcon = screen.getByTestId('settings-icon');
            expect(settingsIcon).toHaveClass('cursor-pointer');
        });

        it('disables save button for invalid input', async () => {
            const user = userEvent.setup();
            render(<QuickControlCard />);

            const settingsIcon = screen.getByTestId('settings-icon');
            await user.click(settingsIcon);

            const input = screen.getByPlaceholderText('e.g. 5');
            await user.clear(input);

            const saveButton = screen.getByText('Save');
            expect(saveButton).toBeDisabled();

            await user.type(input, '0');
            expect(saveButton).toBeDisabled();

            await user.clear(input);
            await user.type(input, '10');
            expect(saveButton).not.toBeDisabled();
        });
    });
});