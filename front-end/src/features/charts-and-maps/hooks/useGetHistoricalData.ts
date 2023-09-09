import { useFetch } from "../../../lib/react-query/react-query";
import { apiRoutesForCovid } from "../../../routes/api.routes";
import { GraphData } from "../models/Maps";

export const useGetHistoricalData = (lastdays: string = 'all') => {
    const params = {
        lastdays,
    }
    return useFetch<GraphData>(
        apiRoutesForCovid.historicalAll,
        params,
        undefined,
        true
    );
}