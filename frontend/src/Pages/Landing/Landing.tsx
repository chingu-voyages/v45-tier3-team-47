import { Box } from "@mui/material"
import { useState, useEffect } from 'react';
//Component imports
import CitySearchForm from './Forms/CitySearchForm';
import FilterForm from './Forms/FilterForm';
import MapContainer from "./MapContainer";

export interface IPointsOfInterest {
    title: string;
    category: string;
    description: string;
    longitude: number;
    latitude: number;
    price: string;
    city: string;
    website: string;
    post_code: string;
    province: string;
    country: string;
    phone_number: number;
    userId: number;
}

const Landing = () => {
    // We might be able to move the city/setCity declaration into the CitySearchForm once we no longer use the StateChecker component in FilterForm, as that is the only other component that requires the city state
    const [city, setCity] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [longitude, setLongitude] = useState(-74.0060);
    const [latitude, setLatitude] = useState(40.7128);
    const [pointsOfInterest, setPointsOfInterest] = useState<IPointsOfInterest[]>([]);
    const [renderedPointsOfInterest, setRenderedPointsOfInterest] = useState<IPointsOfInterest[]>([]);
    const getPointsOfInterestQuery = "https://sightseeshare-api.onrender.com/pointOfInterest/";


    const fetchPointsOfInterest = async (query: string) => {
        try {
            const response = await fetch(query);
            if (!response.ok) {
                throw new Error(`Failed to fetch data: ${response.status}`);
            }

            const data = await response.json();
            setPointsOfInterest(data);
            setRenderedPointsOfInterest(data);
        } catch (error) {

            console.error("Error fetching data:", error);

        }
    };
    useEffect(() => {
        fetchPointsOfInterest(getPointsOfInterestQuery);
    }, []);

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
                <FilterForm
                    submitted={submitted}
                    pointsOfInterest={pointsOfInterest}
                    setRenderedPointsOfInterest={setRenderedPointsOfInterest}
                />
                <MapContainer
                    longitude={longitude}
                    latitude={latitude}
                    renderedPointsOfInterest={renderedPointsOfInterest}
                />
            </Box>
        </Box>
    )
}

export default Landing