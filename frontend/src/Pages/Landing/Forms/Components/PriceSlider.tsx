import { FormLabel, FormControl, Slider } from '@mui/material';

type Props = {
    sliderValue: number,
    handleSliderChange: (event: Event, newValue: number | number[]) => void,
    submitted: boolean
}

const PriceSlider = ({ sliderValue, handleSliderChange, submitted }: Props) => {

    const marks = [
        {
            value: 1,
            label: '$'
        },
        {
            value: 2,
            label: '$$'
        },
        {
            value: 3,
            label: '$$$'
        }
    ]

    function valuetext(value: number) {
        return `${value}`;
    }

    return (
        <FormControl
            component="fieldset"
            variant="standard"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: {
                    xs: '100%',
                    sm: '40%',
                    lg: '100%'
                },
                marginTop: {
                    xs: '1rem',
                    sm: 0
                }
            }}>
            <FormLabel component="legend" sx={{ paddingY: '1rem' }}>Filter by Price</FormLabel>
            <Slider
                aria-label="Custom marks"
                value={sliderValue}
                getAriaValueText={valuetext}
                step={1}
                valueLabelDisplay="auto"
                marks={marks}
                min={1}
                max={3}
                sx={{ width: '80%' }}
                onChange={handleSliderChange}
                disabled={!submitted}
            />
        </FormControl>
    )
}

export default PriceSlider