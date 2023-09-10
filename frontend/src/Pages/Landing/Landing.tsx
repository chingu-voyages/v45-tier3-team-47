import { Box } from "@mui/material"
import { useState } from 'react';

import CitySearchForm from './Forms/CitySearchForm';
import FilterForm from './Forms/FilterForm';
import MapContainer from "./MapContainer";

const Landing = () => {
    // We might be able to move the city/setCity declaration into the CitySearchForm once we no longer use the StateChecker component in FilterForm, as that is the only other component that requires the city state
    const [city, setCity] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [longitude, setLongitude] = useState(-74.50);
    const [latitude, setLatitude] = useState(42.35);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: "100%",
        }}>
            <CitySearchForm
                city={city}
                setCity={setCity}
                setSubmitted={setSubmitted}
                setLongitude={setLongitude}
                setLatitude={setLatitude}
            />
            <Box sx={{
                display: "flex",
                flexDirection: {
                    xs: 'column',
                    lg: 'row',
                }
            }}>
                <FilterForm submitted={submitted} />
                <MapContainer longitude={longitude} latitude={latitude} />
            </Box>


        </Box>
    )
}

export default Landing