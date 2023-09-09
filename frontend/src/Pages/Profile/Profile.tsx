import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemText,
  useTheme,
  IconButton,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useEffect, useState } from "react";

interface UserData {
  user_name: string;
  profile_image?: string;
  first_name: string;
  last_name: string;
  occupation: string;
  email: string;
  location: string;
}

const Profile = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    fetchUserById();
  }, []);

  const fetchUserById = async () => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        console.error("User ID not found in local storage");
        return;
      }

      const response = await fetch(
        `http://localhost:3000/user/profile/${userId}`
      );
      if (response.ok) {
        const userData = await response.json();
        setUserData(userData);
      } else {
        console.error("Error fetching user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const theme = useTheme();
  const toggleThemeMode = () => {
    const newMode = theme.palette.mode === "light" ? "dark" : "light";
    theme.palette.mode = newMode;
  };

  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        placeContent: "center",
        gap: "5rem",
      }}
    >
      {/* Check if userData exists before rendering */}
      {userData && (
        <>
          <Box>
            <Avatar
              alt={`${userData.first_name} ${userData.last_name}`}
              src={userData.profile_image}
              sx={{ width: 100, height: 100, marginBottom: "1rem" }}
            />
            <IconButton
              onClick={toggleThemeMode}
              aria-label="Toggle theme mode"
            >
              {theme.palette.mode === "light" ? (
                <Brightness4Icon />
              ) : (
                <Brightness7Icon />
              )}
            </IconButton>
          </Box>
          <Box>
            <List>
              <ListItem>
                <ListItemText
                  primary={userData.user_name}
                  secondary="Username"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={userData.first_name}
                  secondary="First Name"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={userData.last_name}
                  secondary="Last Name"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={userData.email}
                  secondary="Email Address"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={userData.location}
                  secondary="Location"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={userData.occupation}
                  secondary="Occupation"
                />
              </ListItem>
            </List>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Profile;
