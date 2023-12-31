import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

type Props = {
    setSubmitted: React.Dispatch<React.SetStateAction<boolean>>,
    setLongitude: React.Dispatch<React.SetStateAction<number>>,
    setLatitude: React.Dispatch<React.SetStateAction<number>>
}

const CitySearchForm = ({ setSubmitted, setLongitude, setLatitude }: Props) => {

    const [city, setCity] = useState("");
    const encodedCity = encodeURI(city) || "";
    const mapboxQuery = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedCity}.json?access_token=${MAPBOX_ACCESS_TOKEN}`

    const fetchCityData = async (query: string) => {
        const response = await fetch(query);
        const data = await response.json();
        setLongitude(data.features[0].center[0]);
        setLatitude(data.features[0].center[1]);
    }

    const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
   
        setSubmitted(true);
        fetchCityData(mapboxQuery);
    }

    return (
        <Box
            component="form"
            sx={{
                display: 'flex',
                flexDirection: {
                    xs: 'column',
                    sm: 'row'
                },
                paddingX: {
                    xs: '1rem',
                    sm: 0
                },
                marginY: '2rem',
                width: '100%',
                justifyContent: 'center',
                gap: '1rem'
            }}
            onSubmit={handleSubmit}
        >
            <TextField
                required
                id="outlined-required"
                label="City"
                defaultValue={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <Button
                variant="contained"
                type="submit"
                sx={{
                    width: {
                        xs: '90%',
                        sm: 'auto'
                    },
                    alignSelf: {
                        xs: 'center',
                        sm: 'stretch'
                    }
                }}
            >
                Submit
            </Button>
        </Box>
    )
}

export default CitySearchForm