// Interface for CountryInfo
export interface CountryInfo {
    lat: number;
    long: number;
    flag: string;
}

// Interface for country data
export interface CountryData {
    country: string;
    cases: number;
    deaths: number;
    recovered: number;
    active: number;
    countryInfo: CountryInfo;
}

// Interface for historical graph data
export interface GraphData {
    cases: { [date: string]: number };
    deaths: { [date: string]: number };
    recovered: { [date: string]: number };
}