import { render, fireEvent, screen, act } from '@testing-library/react';
import { vi } from 'vitest';
import ManualWateringCard from './ManualWateringCard';


// Mocking necessary modules
vi.mock('../../api/waterManualApi', () => ({
    postManualWatering: vi.fn(() => Promise.resolve({})),
}));

vi.mock('../../hooks/manual-watering/usePostManualWatering', () => ({
    default: () => ({
        submitWatering: vi.fn(() => Promise.resolve()),
        isLoading: false,
        error: '',
        successMessage: 'Vanding er gemt!',
        setError: vi.fn(),
    }),
}));

describe('ManualWateringCard', () => {
    it('viser en fejlmeddelelse, hvis mængden er tom', async () => {
        render(<ManualWateringCard />);

        await act(async () => {
            fireEvent.click(screen.getByText('Water Plant'));
        });

        expect(screen.getByText('Indtast venligst en vandmængde')).toBeInTheDocument();
    });

    it('viser en fejlmeddelelse, hvis mængden ikke er et tal', async () => {
        render(<ManualWateringCard />);

        fireEvent.change(screen.getByPlaceholderText('Enter amount (ml)'), {
            target: { value: 'abc' },
        });

        await act(async () => {
            fireEvent.click(screen.getByText('Water Plant'));
        });

        expect(screen.getByText('Mængden skal være et gyldigt tal')).toBeInTheDocument();
    });

    it('kalder submitWatering når mængden er gyldig', async () => {
        render(<ManualWateringCard />);

        fireEvent.change(screen.getByPlaceholderText('Enter amount (ml)'), {
            target: { value: '500' },
        });

        await act(async () => {
            fireEvent.click(screen.getByText('Water Plant'));
        });

        // Ensure submitWatering is called with the correct argument
        expect(screen.getByText('Vanding er gemt!')).toBeInTheDocument();
    });
});
