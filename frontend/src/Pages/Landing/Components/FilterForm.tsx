import { Box } from '@mui/material';
import { useState } from 'react';
import TypeCheckboxes from './TypeCheckboxes';
import RatingCheckboxes from './RatingCheckboxes';
import StateChecker from './StateChecker';
import PriceSlider from './PriceSlider';

const FilterForm = () => {
    const [checked, setChecked] = useState({
        restaurant: false,
        hotel: false,
        entertainment: false,
        fiveStars: false,
        fourStars: false,
        threeStars: false,
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked({
            ...checked,
            [event.target.name]: event.target.checked,
        });
    };

    const [sliderValue, setSliderValue] = useState(1)

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setSliderValue(newValue as number);
    };

    const { restaurant, hotel, entertainment, fiveStars, fourStars, threeStars } = checked;
    return (
        <Box component="form" sx={{
            width: '30%',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <TypeCheckboxes restaurant={restaurant} hotel={hotel} entertainment={entertainment} handleChange={handleChange} />
            <RatingCheckboxes fiveStars={fiveStars} fourStars={fourStars} threeStars={threeStars} handleChange={handleChange} />
            <PriceSlider sliderValue={sliderValue} handleSliderChange={handleSliderChange} />
            <StateChecker checked={checked} sliderValue={sliderValue} />
        </Box>
    )
}

export default FilterForm