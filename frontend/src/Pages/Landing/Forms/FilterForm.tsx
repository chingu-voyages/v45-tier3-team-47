import { useState } from 'react';
import { Box } from '@mui/material';
//Component imports
import TypeCheckboxes from './Components/TypeCheckboxes';
import RatingCheckboxes from './Components/RatingCheckboxes';
import StateChecker from './Components/StateChecker';
import PriceSlider from './Components/PriceSlider';

// NOTE: city prop is currently only needed for the StateChecker component - it can be removed once we no longer need to use that component
type Props = {
    submitted: boolean,
    city: string
}

const FilterForm = ({ submitted, city }: Props) => {
    const [checked, setChecked] = useState({
        restaurant: false,
        hotel: false,
        entertainment: false,
        fiveStars: false,
        fourStars: false,
        threeStars: false,
    });

    const [sliderValue, setSliderValue] = useState(1);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked({
            ...checked,
            [event.target.name]: event.target.checked,
        });
    };

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setSliderValue(newValue as number);
    };

    const { restaurant, hotel, entertainment, fiveStars, fourStars, threeStars } = checked;
    return (
        <Box component="form" sx={{
            width: '30%',
            display: 'flex',
            flexDirection: 'column',
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
            <StateChecker
                checked={checked}
                sliderValue={sliderValue}
                city={city} />
        </Box>
    )
}

export default FilterForm