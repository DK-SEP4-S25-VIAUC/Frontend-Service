import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {render, screen, fireEvent, waitFor, act} from "@testing-library/react";
import axios from "axios";
import SoilHumidityInput from "./SoilHumidityInput.jsx";

vi.mock('axios');

describe('SoilHumidityInput component', () => {
    let queryClient;
    const wrapper = ({ children }) => (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );

    beforeEach(() => {
        // Reset axios mock and create new QueryClient
        vi.clearAllMocks();
        queryClient = new QueryClient();
    });

    it('renders input fields and submit button', () => {
        render(
            <SoilHumidityInput />,
            { wrapper }
        );

        expect(screen.getByPlaceholderText(/Enter lower soil humidity/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Enter upper soil humidity/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
    });

    it('submits data and shows success message on successful POST', async () => {
        // Arrange: mock successful POST
        axios.post.mockResolvedValue({ data: { success: true } });

        render(
            <SoilHumidityInput />,
            { wrapper }
        );

        // Enter values
        fireEvent.change(screen.getByPlaceholderText(/Enter lower soil humidity/i), { target: { value: '10' } });
        fireEvent.change(screen.getByPlaceholderText(/Enter upper soil humidity/i), { target: { value: '90' } });

        // Submit form
        fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

        // Await success message
        await waitFor(() => {
            expect(screen.getByText(/Success!/i)).toBeInTheDocument();
        });

        // Ensure axios called with correct payload
        expect(axios.post).toHaveBeenCalledWith(
            'https://sep4api.azure-api.net/api/iot/soilhumidity/threshold',
            { upperbound: 90, lowerbound: 10 }
        );
    });

    it('shows error message on failed POST', async () => {
        // Arrange: mock failed POST
        axios.post.mockRejectedValue({ response: { data: { message: 'Invalid data' } } });

        render(
            <SoilHumidityInput />,
            { wrapper }
        );

        // Enter values
        fireEvent.change(screen.getByPlaceholderText(/Enter lower soil humidity/i), { target: { value: '5' } });
        fireEvent.change(screen.getByPlaceholderText(/Enter upper soil humidity/i), { target: { value: '95' } });

        // Submit form
        fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

        // Await error message
        await waitFor(() => {
            expect(screen.getByText(/Error: Invalid data/i)).toBeInTheDocument();
        });
    });
});
