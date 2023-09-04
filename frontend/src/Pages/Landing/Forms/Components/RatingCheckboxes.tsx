import { FormLabel, FormControlLabel, Checkbox, FormControl } from '@mui/material';

type Props = {
    fiveStars: boolean,
    fourStars: boolean,
    threeStars: boolean,
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    submitted: boolean
}

const RatingCheckboxes = ({ fiveStars, fourStars, threeStars, handleChange, submitted }: Props) => {
    return (
        <FormControl
            component="fieldset"
            variant="standard"
            disabled={!submitted}
        >
            <FormLabel component="legend" sx={{ paddingY: '1rem' }}>Filter by Rating</FormLabel>
            <FormControlLabel control={<Checkbox checked={fiveStars} onChange={handleChange} name="fiveStars" />} label="5 Stars" />
            <FormControlLabel control={<Checkbox checked={fourStars} onChange={handleChange} name="fourStars" />} label="4 Stars" />
            <FormControlLabel control={<Checkbox checked={threeStars} onChange={handleChange} name="threeStars" />} label="3 Stars" />
        </FormControl>
    )
}

export default RatingCheckboxes