import { Box } from "@mui/material"
import { Typography } from '@mui/material';

const About = () => {
    return (
        <Box component="section" paddingX='1rem'>
            <Typography variant="h2" gutterBottom={true}>
                What Is This All About?
            </Typography>
            <Typography paragraph={true} >
                SightSeeShare is a repository of unique points of interest, found in cities all over the world, that our users thought were exceptional and wanted to share! The app was created with the intent of establishing a community where you could find out about exciting hidden gems, great hotel deals, restaurants that only the locals know about, and more, in order to help improve your journeys all over the world ♥️
            </Typography>
            <Typography paragraph={true} >
                To browse the points of interest submitted by our users, simply go back to the home page, search for the city you want to view as well as any additional filters, and you're there!
            </Typography>
            <Typography paragraph={true} >
                To contribute a point of interest to our database, simply create an account with us. A "Create Post" button will appear at the navigation bar once you are signed in, and once you fill out the required information, your point of interest will be added!
            </Typography>
        </Box>
    )
}

export default About