import { Box } from "@mui/material"
import FilterForm from "./Components/FilterForm"

const Landing = () => {
    return (
        <Box component="section" sx={{
            display: 'flex',
        }}>
            <FilterForm />
        </Box>
    )
}

export default Landing