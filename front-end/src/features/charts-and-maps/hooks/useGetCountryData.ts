import { useFetch } from "../../../lib/react-query/react-query"
import { apiRoutesForCovid } from "../../../routes/api.routes"
import { CountryData } from "../models/Maps";

export const useGetCountryData = () => {
    return useFetch<CountryData[]>(
        apiRoutesForCovid.countries,
        undefined,
        undefined,
        true
    );
}