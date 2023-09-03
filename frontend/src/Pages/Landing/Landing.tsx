import { Box } from "@mui/material"
import FilterForm from "./Components/FilterForm"

const Landing = () => {
    return (
        <Box component="section" sx={{
            display: 'flex',
            outline: '1px solid lightgrey'
        }}>
            <FilterForm />
        </Box>
    )
}

export default Landing