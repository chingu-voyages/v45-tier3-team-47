import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AppBar, Container, Toolbar, Box, Typography, Button } from '@mui/material';
import axiosInstance from "../../../axiosConfig";
import { RootLayoutProps, UserData } from "../../../types/types";
//Component imports
import logo from '../../../assets/Logo.png';
import NavUserSettingsMenu from './NavUserSettingsMenu';
import NavDesktopLinks from './NavDesktopLinks';
import NavMobileMenu from './NavMobileMenu';
import { baseQuery } from "../../../App";


function Nav({ isLoggedIn, setIsLoggedIn }: RootLayoutProps) {
  const navigate = useNavigate();

  const [_, setUserId] = useState<string>('');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUserInfo = useCallback(async (userId: string) => {
    try {
      const response = await axiosInstance.get(
        `${baseQuery}/user/profile/${userId}`
      );
      const userInfo = response.data;
      setUserData(userInfo);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  }, []);


  useEffect(() => {

    const sessionId = sessionStorage.getItem('userId');
    if (!sessionId) {
      return;
    }

    setUserId(sessionId);
    fetchUserInfo(sessionId);
    setIsLoggedIn(true);
  }, [setIsLoggedIn, navigate, fetchUserInfo]);


  const handleLogout = () => {
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('userId');
    setUserId('');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters >
          <Box >
            <Box component="a" href="/" sx={{ display: 'flex', gap: '3px', textDecoration: 'none' }}>
              <img
                src={logo}
                style={{ width: "50px", height: "50px", paddingBottom: "18px" }}
                alt="Logo"
              />
              <Typography
                variant="h2"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'white',
                  marginTop: '0.7rem',
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
            isLoggedIn={isLoggedIn}
          />
          {isLoggedIn &&
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
          <NavDesktopLinks isLoggedIn={isLoggedIn} />

          <Box sx={{ flexGrow: 0 }}>
            {isLoggedIn &&
              <NavUserSettingsMenu
                userData={userData}
                onClick={handleLogout}
                loading={loading}
              />
            }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Nav;
