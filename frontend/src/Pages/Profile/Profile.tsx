import { Avatar, Box, List, ListItem, ListItemText } from "@mui/material"
import { useState } from "react"

const Profile = () => {
    // Test user data to be removed once this is connected to the back end
    const [user, setUser] = useState({
        first_name: 'Daniela',
        last_name: 'Parra',
        user_name: 'phycodurus',
        occupation: 'Software Engineer',
        email: 'myemail@gmail.com',
        location: 'Toronto',
        profile_image: '/static/images/avatar/1.jpg'
    })

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
                    sx={{ width: 100, height: 100 }}
                />
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