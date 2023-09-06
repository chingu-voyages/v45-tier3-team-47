import { FormLabel, FormControlLabel, Checkbox, FormControl } from '@mui/material';

type Props = {
    restaurant: boolean,
    hotel: boolean,
    entertainment: boolean,
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    submitted: boolean
}

const TypeCheckboxes = ({ restaurant, hotel, entertainment, handleChange, submitted }: Props) => {
    return (
        <FormControl
            component="fieldset"
            variant="standard"
            disabled={!submitted}
        >
            <FormLabel component="legend" sx={{ paddingY: '1rem' }}>Filter by Type</FormLabel>
            <FormControlLabel control={<Checkbox checked={restaurant} onChange={handleChange} name="restaurant" />} label="Restaurant" />
            <FormControlLabel control={<Checkbox checked={hotel} onChange={handleChange} name="hotel" />} label="Hotel" />
            <FormControlLabel control={<Checkbox checked={entertainment} onChange={handleChange} name="entertainment" />} label="Entertainment" />
        </FormControl>
    )
}

export default TypeCheckboxes