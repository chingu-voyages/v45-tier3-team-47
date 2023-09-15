import { useState } from 'react';
import { Box } from '@mui/material';
//Component imports
import TypeCheckboxes from './Components/TypeCheckboxes';
import RatingCheckboxes from './Components/RatingCheckboxes';
import PriceSlider from './Components/PriceSlider';
import { IPointsOfInterest } from '../Landing';

// NOTE: city prop is currently only needed for the StateChecker component - it can be removed once we no longer need to use that component

type Props = {
    submitted: boolean,
    pointsOfInterest: Array<IPointsOfInterest>
    renderedPointsOfInterest: Array<IPointsOfInterest>
    setRenderedPointsOfInterest: React.Dispatch<React.SetStateAction<Array<IPointsOfInterest>>>
}

const categories = new Set(["restaurant", "hotel", "entertainment"]);

const FilterForm = ({ submitted, pointsOfInterest, renderedPointsOfInterest, setRenderedPointsOfInterest }: Props) => {
    const [checked, setChecked] = useState({
        restaurant: false,
        hotel: false,
        entertainment: false,
        fiveStars: false,
        fourStars: false,
        threeStars: false,
    });

    const [sliderValue, setSliderValue] = useState(1);

    const { restaurant, hotel, entertainment, fiveStars, fourStars, threeStars } = checked;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked({
            ...checked,
            [event.target.name]: event.target.checked,
        });
        if (categories.has(event.target.name)) {
            filterPOIByCategory(event.target.name, event.target.checked);
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

    // Note event param is currently not being used, but is required for this function to update the slider correctly. 
    // Added _ prefix to remove TS error about unused variables
    const handleSliderChange = (_event: Event, newValue: number | number[]) => {
        setSliderValue(newValue as number);
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