import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { AppBar, Container, Toolbar, Box, Typography, Button } from '@mui/material';
import axiosInstance from "../../../axiosConfig";
//Component imports
import logo from '../../../assets/Logo.png';
import NavUserSettingsMenu from './NavUserSettingsMenu';
import NavDesktopLinks from './NavDesktopLinks';
import NavMobileMenu from './NavMobileMenu';

export interface UserData {
  user_name: string;
  profile_image: string;
}

function Nav() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [user, setUser] = useState<string | null>(null);

  const fetchUserInfo = async (userId: string) => {
    try {
      const response = await axiosInstance.get(
        `http://localhost:3000/user/profile/${userId}`
      );
      const userInfo = response.data;
      setUserData(userInfo);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');

    if (!userId) {
      console.error("User ID not found in sessionStorage");
      return;
    }
    setUser(userId);
    fetchUserInfo(userId);
  }, []);

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(
    null
  );

  console.log("checkuser", user)
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters >
          <Box >
            <Box component="a" href="/" sx={{ display: 'flex', gap: '5px' }}>
              <img
                src={logo}
                style={{ width: "50px", height: "50px" }}

                alt="Logo"

              />
              <Typography
                variant="h5"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'white',
                  textDecoration: 'none',
                  marginTop: '1rem',
                  transition: 'all .2s ease',
                  ":hover": {
                    color: '#D8BFD8'
                  }
                }}
              >
                SIGHT.SEE.SHARE
              </Typography>
            </Box>
          </Box>
          <NavMobileMenu
            setAnchorElNav={setAnchorElNav}
            anchorElNav={anchorElNav}
            user={user}
          />
          {user &&
            <Box>
              <Button
                component={Link}
                to="point-of-interest"
                sx={{
                  backgroundColor: "white",
                  m: "2rem",
                  padding: "5px 1rem",
                  fontSize: '1.2rem',
                  ":hover": {
                    backgroundColor: '#400080',
                    color: 'white'
                  }
                }}
              >
                Create POI
              </Button>
            </Box>
          }
          <NavDesktopLinks user={user} />

          <Box sx={{ flexGrow: 0 }}>
            {user &&
              <NavUserSettingsMenu
                anchorElUser={anchorElUser}
                setAnchorElUser={setAnchorElUser}
                userData={userData}
              />
            }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Nav;
