import { Box } from '@mui/material';

type Props = {
    checked: {
        restaurant: boolean,
        hotel: boolean,
        entertainment: boolean,
        fiveStars: boolean,
        fourStars: boolean,
        threeStars: boolean
    },
    sliderValue: number
}

const StateChecker = ({ checked, sliderValue }: Props) => {
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <p>
                {
                    checked.restaurant ? "Restaurant is checked" : "Restaurant is unchecked"
                }
            </p>
            <p>
                {
                    checked.hotel ? "Hotel is checked" : "Hotel is unchecked"
                }
            </p>
            <p>
                {
                    checked.entertainment ? "Entertainment is checked" : "Entertainment is unchecked"
                }
            </p>
            <p>
                {
                    checked.fiveStars ? "5 stars is checked" : "5 stars is unchecked"
                }
            </p>
            <p>
                {
                    checked.fourStars ? "4 stars is checked" : "4 stars is unchecked"
                }
            </p>
            <p>
                {
                    checked.threeStars ? "3 stars is checked" : "3 stars is unchecked"
                }
            </p>
            <p>
                Slider is at {sliderValue}
            </p>
        </Box>
    )
}

export default StateChecker