import axios from "axios";
import {useQuery} from "@tanstack/react-query";

export default function useGetAutomaticWateringStatus () {

    const endPoint = "https://sep4api.azure-api.net/api/iot/water/mode"

    const getAutomaticWateringStatus = async () => {
        const response = await axios.get(endPoint);
        return response.data;
    }

    const {data: automaticWateringStatus, error, isLoading} = useQuery({
        queryFn: getAutomaticWateringStatus,
        queryKey: ["AutomaticWateringStatus"],
    });

    return (
        {
            automaticWateringStatus,
            error,
            isLoading
        }
    )
}