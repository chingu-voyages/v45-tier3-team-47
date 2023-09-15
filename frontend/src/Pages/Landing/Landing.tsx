import { Box } from "@mui/material"
import { useState, useEffect } from 'react';
import CitySearchForm from './Forms/CitySearchForm';
import FilterForm from './Forms/FilterForm';
import MapContainer from "./MapContainer";
import { IPointsOfInterest } from "../../types/interfaces";

const Landing = () => {
    const [submitted, setSubmitted] = useState(false);
    const [longitude, setLongitude] = useState(-74.0060);
    const [latitude, setLatitude] = useState(40.7128);
    const [pointsOfInterest, setPointsOfInterest] = useState<IPointsOfInterest[]>([]);
    const [renderedPointsOfInterest, setRenderedPointsOfInterest] = useState<IPointsOfInterest[]>([]);
    const getPointsOfInterestQuery = "https://sightseeshare-api.onrender.com/pointOfInterest/";

    const fetchPointsOfInterest = async (query: string) => {
        const response = await fetch(query);
        const data = await response.json();
        setPointsOfInterest(data);
        setRenderedPointsOfInterest(data);
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