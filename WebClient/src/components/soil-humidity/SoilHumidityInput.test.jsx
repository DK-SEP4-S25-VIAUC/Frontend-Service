import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {render, screen, fireEvent, waitFor} from "@testing-library/react";
import axios from "axios";
import SoilHumidityInput from "./SoilHumidityInput.jsx";


vi.mock('axios');

describe('SoilHumidityInput component', () => {
    let queryClient;
    const wrapper = ({children}) => (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );

    beforeEach(() => {
        vi.clearAllMocks();
        queryClient = new QueryClient();
    });

    it('renders input fields and submit button', () => {
        render(
            <SoilHumidityInput/>,
            {wrapper}
        );

        expect(screen.getByPlaceholderText(/Enter lower soil humidity/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Enter upper soil humidity/i)).toBeInTheDocument();
        expect(screen.getByRole('button', {name: /Submit/i})).toBeInTheDocument();
    });

    it('submits data and shows success message on successful POST', async () => {
        axios.post.mockResolvedValue({data: {success: true}});

        render(
            <SoilHumidityInput/>,
            {wrapper}
        );

        fireEvent.change(screen.getByPlaceholderText(/Enter lower soil humidity/i), {target: {value: '10'}});
        fireEvent.change(screen.getByPlaceholderText(/Enter upper soil humidity/i), {target: {value: '90'}});

        fireEvent.click(screen.getByRole('button', {name: /Submit/i}));

        await waitFor(() => {
            expect(screen.getByText(/Success!/i)).toBeInTheDocument();
        });

        expect(axios.post).toHaveBeenCalledWith(
            'https://sep4api.azure-api.net/api/iot/soilhumidity/threshold',
            {CreateManualThresholdDTO: {upperbound: 90, lowerbound: 10}}
        );
    });

    it('shows error message on failed POST', async () => {
        axios.post.mockRejectedValue({response: {data: {message: 'Invalid data'}}});

        render(
            <SoilHumidityInput/>,
            {wrapper}
        );

        fireEvent.change(screen.getByPlaceholderText(/Enter lower soil humidity/i), {target: {value: '5'}});
        fireEvent.change(screen.getByPlaceholderText(/Enter upper soil humidity/i), {target: {value: '95'}});

        fireEvent.click(screen.getByRole('button', {name: /Submit/i}));

        await waitFor(() => {
            expect(screen.getByText(/Something went wrong try again!/i)).toBeInTheDocument();
        });
    });
});