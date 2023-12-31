import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
//Component imports
import TypeCheckboxes from './Components/TypeCheckboxes';
import RatingCheckboxes from './Components/RatingCheckboxes';
import PriceSlider from './Components/PriceSlider';
import { IPointsOfInterest } from '../../../types/types';
import { Post } from "../../../types/types";


type Props = {
    submitted: boolean,
    pointsOfInterest: Array<IPointsOfInterest>
    setRenderedPointsOfInterest: React.Dispatch<React.SetStateAction<Array<IPointsOfInterest>>>
}

type Mapping = {
    [key: number]: any[]
}

type AverageRatings = {
    [key: string]: number;
}

type Ratings = {
    [key: string]: number;
}

const categories = new Set(["restaurant", "hotel", "entertainment"]);
const ratings: Ratings = { "fiveStars": 5, "fourStars": 4, "threeStars": 3 };

const FilterForm = ({ submitted, pointsOfInterest, setRenderedPointsOfInterest }: Props) => {
    const [checked, setChecked] = useState({
        restaurant: false,
        hotel: false,
        entertainment: false,
        fiveStars: false,
        fourStars: false,
        threeStars: false,
    });

    const [allPosts, setAllPosts] = useState<Array<Post>>([]);

    const [sliderValue, setSliderValue] = useState(1);

    const { restaurant, hotel, entertainment, fiveStars, fourStars, threeStars } = checked;

    const getAllPostsQuery = "https://sightseeshare-api.onrender.com/posts/";

    useEffect(() => {
        fetchAllPosts(getAllPostsQuery);
    }, []);

    const fetchAllPosts = async (query: string) => {
        const response = await fetch(query);
        const data = await response.json();
        setAllPosts(data);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked({
            ...checked,
            [event.target.name]: event.target.checked,
        });
        if (categories.has(event.target.name)) {
            filterPOIByCategory(event.target.name, event.target.checked);
        }
        if (event.target.name in ratings) {
            filterPOIByRating(ratings[event.target.name], event.target.checked);
        }
    };

    const filterPOIByCategory = (category: string, checked: boolean) => {
        const filteredPOI = pointsOfInterest.filter(poi => {
            if (poi.category.toLowerCase() === category && !checked) return false;
            if (poi.category.toLowerCase() === category && checked) return true;
            if (restaurant && poi.category.toLowerCase() === "restaurant") return true;
            if (hotel && poi.category.toLowerCase() === "hotel") return true;
            if (entertainment && poi.category.toLowerCase() === "entertainment") return true;
        })
        setRenderedPointsOfInterest(filteredPOI);
    };

    const filterPOIByRating = (rating: number, checked: boolean) => {

        const mapRatingsToPOI: Mapping = {};
        for (const post of allPosts) {
            if (post.pointOfInterestId in mapRatingsToPOI) {
                mapRatingsToPOI[post.pointOfInterestId].push(Number(post.rating));
            } else {
                mapRatingsToPOI[post.pointOfInterestId] = [Number(post.rating)];
            }
        };

        const filteredAverageRatingsMap: AverageRatings = {};
        for (const key of Object.keys(mapRatingsToPOI)) {
            const averageRatingForPOI = mapRatingsToPOI[Number(key)].reduce((a, c) => a + c) / mapRatingsToPOI[Number(key)].length;

            if (averageRatingForPOI > rating - 0.5 && averageRatingForPOI < rating + 0.5) {
                filteredAverageRatingsMap[key] = averageRatingForPOI;
            } else {
                delete (filteredAverageRatingsMap[key]);
            }
        };

        const filteredPOI = pointsOfInterest.filter(poi => {
            return (Number(poi.id) in filteredAverageRatingsMap && checked);
        });
        setRenderedPointsOfInterest(filteredPOI);
    };

    
    const handleSliderChange = (_event: Event, newValue: number | number[]) => {
        setSliderValue(newValue as number);
        const filteredPOI = pointsOfInterest.filter(poi => {
            return Number(poi.price) === newValue;
        });
        setRenderedPointsOfInterest(filteredPOI);
    };

    return (
        <Box component="form" sx={{
            width: {
                xs: '100%',
                lg: '30%'
            },
            display: 'flex',
            flexDirection: {
                xs: 'row',
                lg: 'column'
            },
            justifyContent: {
                xs: 'space-around'
            },
            flexWrap: {
                xs: 'wrap',
                lg: 'nowrap'
            },
            padding: '1rem'
        }}>
            <TypeCheckboxes
                restaurant={restaurant}
                hotel={hotel}
                entertainment={entertainment}
                handleChange={handleChange}
                submitted={submitted}
            />
            <RatingCheckboxes
                fiveStars={fiveStars}
                fourStars={fourStars}
                threeStars={threeStars}
                handleChange={handleChange}
                submitted={submitted}
            />
            <PriceSlider
                sliderValue={sliderValue}
                handleSliderChange={handleSliderChange}
                submitted={submitted}
            />
        </Box>
    )
}

export default FilterForm