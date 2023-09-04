import { Box } from "@mui/material"
import { useState } from 'react';

import CitySearchForm from './Forms/CitySearchForm';
import FilterForm from './Forms/FilterForm';

const Landing = () => {
    // We might be able to move the city/setCity declaration into the CitySearchForm once we no longer use the StateChecker component in FilterForm, as that is the only other component that requires the city state
    const [city, setCity] = useState('');
    const [submitted, setSubmitted] = useState(false)
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: "100%",
            outline: '1px solid blue'
        }}>
            <CitySearchForm
                city={city}
                setCity={setCity}
                setSubmitted={setSubmitted}
            />
            <FilterForm submitted={submitted} city={city} />
        </Box>
    )
}

export default Landing