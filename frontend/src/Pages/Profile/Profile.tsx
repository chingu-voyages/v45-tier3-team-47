import { Avatar, Box, List, ListItem, ListItemText, useTheme, IconButton } from "@mui/material"
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';



const Profile = () => {
    // Test user data to be removed once this is connected to the back end

    const user = {
        first_name: 'Daniela',
        last_name: 'Parra',
        user_name: 'phycodurus',
        occupation: 'Software Engineer',
        email: 'myemail@gmail.com',
        location: 'Toronto',
        profile_image: '/static/images/avatar/1.jpg'
    }

    const theme = useTheme();
    const toggleThemeMode = () => {
        const newMode = theme.palette.mode === 'light' ? 'dark' : 'light';
        theme.palette.mode = newMode;
    };

    const { first_name, last_name, user_name, occupation, email, location, profile_image } = user;

    return (
        <Box
            component="section"
            sx={{
                display: 'flex',
                placeContent: 'center',
                gap: '5rem'
            }}
        >
            <Box>
                <Avatar
                    alt={`${first_name} ${last_name} `}
                    src={profile_image}
                    sx={{ width: 100, height: 100, marginBottom: '1rem' }}
                />
                <IconButton onClick={toggleThemeMode} aria-label="Toggle theme mode">
                    {theme.palette.mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
                </IconButton>
            </Box>
            <Box>
                <List >
                    <ListItem>
                        <ListItemText
                            primary={user_name}
                            secondary="Username"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary={first_name}
                            secondary="First Name"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary={last_name}
                            secondary="Last Name"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary={email}
                            secondary="Email Address"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary={location}
                            secondary="Location"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary={occupation}
                            secondary="Occupation"
                        />
                    </ListItem>
                </List>
            </Box>
        </Box>
    )
}

export default Profile