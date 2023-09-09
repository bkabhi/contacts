import React, { useMemo } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { Circle, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { CasesType, CasesTypeColors } from "../models/constants";
import { CountryData } from "../models/Maps";
import { useGetCountryData } from "../hooks/useGetCountryData";
import Error from "../../../components/Error";
import { alertMessages } from "../../../utils/constants";

const casesTypeColors: CasesTypeColors = CasesTypeColors();

interface Props {
    casesType: CasesType;
}

const Maps: React.FC<Props> = ({ casesType }) => {
    const { data: countryData, isLoading, isSuccess, isError } = useGetCountryData();

    const mapContainerProps = useMemo(
        () => ({
            center: { lat: 20, lng: 0 },
            zoom: 2,
            style: { width: '100%', height: '426px', margin: '0 auto' },
        }),
        []
    );

    const mapMarkers = isSuccess && countryData.map((country: CountryData) => (
        <Circle
            key={country.country}
            center={[country.countryInfo.lat, country.countryInfo.long]}
            color={casesTypeColors[casesType].hex}
            fillColor={casesTypeColors[casesType].hex}
            fillOpacity={0.4}
            radius={
                Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
            }
        >
            <Popup>
                <div className='w-35'>
                    <div
                        className='h-20 w-30 bg-cover rounded-md shadow'
                        style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
                    >
                    </div>
                    <div className='text-20 mt-1 font-bold text-gray-500'>{country.country}</div>
                    <div>
                        Cases: {country.cases}
                    </div>
                    <div>
                        Active: {country.active}
                    </div>
                    <div>
                        Recovered: {country.recovered}
                    </div>
                    <div>
                        Deaths: {country.deaths}
                    </div>
                </div>
            </Popup>
        </Circle>
    ));

    return (
        <>
            <div>
                <h2 className="text-2xl font-semibold mb-4">Map</h2>
                {isLoading ? (
                    <>
                        <div className="flex justify-center items-center">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
                        </div>
                    </>
                ) : isError ? <>
                    <Error text={alertMessages.apiError} />
                </> : (
                    <MapContainer {...mapContainerProps}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        {mapMarkers}
                    </MapContainer>
                )}
            </div>
        </>
    );
};

export default Maps;
