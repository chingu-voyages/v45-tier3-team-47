import { Box } from '@mui/material';
import { useState } from 'react';
import TypeCheckboxes from './TypeCheckboxes';
import RatingCheckboxes from './RatingCheckboxes';
import StateChecker from './StateChecker';

const FilterForm = () => {
    const [checked, setChecked] = useState({
        restaurant: false,
        hotel: false,
        entertainment: false,
        fiveStars: false,
        fourStars: false,
        threeStars: false
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked({
            ...checked,
            [event.target.name]: event.target.checked,
        });
        console.log(checked)
    };

    const { restaurant, hotel, entertainment, fiveStars, fourStars, threeStars } = checked;
    return (
        <Box component="form" sx={{
            width: '30%',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'grey'
        }}>
            <TypeCheckboxes restaurant={restaurant} hotel={hotel} entertainment={entertainment} handleChange={handleChange} />
            <RatingCheckboxes fiveStars={fiveStars} fourStars={fourStars} threeStars={threeStars} handleChange={handleChange} />
            <StateChecker checked={checked} />
        </Box>
    )
}

export default FilterForm