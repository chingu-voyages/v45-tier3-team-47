import { Box, Button, TextField } from "@mui/material"

type Props = {
    city: string,
    setCity: React.Dispatch<React.SetStateAction<string>>,
    setSubmitted: React.Dispatch<React.SetStateAction<boolean>>
}

const CitySearchForm = ({ city, setCity, setSubmitted }: Props) => {

    const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        console.log('Form was submitted', e);
        setSubmitted(true)
    }
    return (
        <Box
            component="form"
            sx={{
                marginY: '2rem',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                gap: '1rem'
            }}
            onSubmit={handleSubmit}
        >
            <TextField
                required
                id="outlined-required"
                label="City"
                defaultValue={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <Button
                variant="contained"
                type="submit"
            >
                Submit
            </Button>
        </Box>
    )
}

export default CitySearchForm