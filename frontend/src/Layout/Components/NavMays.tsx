import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import logo from '../../assets/Logo.png';
import axiosInstance from '../../axiosConfig';
import CircularProgress from '@mui/material/CircularProgress';

// Define the user data interface
interface UserData {
  user_name: string;
  profile_image: string;
}

// Define the props interface
interface RootLayoutProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

// Navbar component
const NavMays: React.FC<RootLayoutProps> = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  // Testing to see if we can just use an empty string instead of null for userId
  const [_, setUserId] = useState<string>('');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Function to fetch user info
  const fetchUserInfo = useCallback(async (userId: string) => {
    try {
      const response = await axiosInstance.get(
        `http://localhost:3000/user/profile/${userId}`
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

  // State for anchor elements
  const [, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  // Functions to handle opening/closing menu
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ width: '60px', height: '72px' }}>
            <img src={logo} style={{ width: '50px', height: '50px' }} alt="Logo" />
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            SIGHT.SEE.SHARE
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          {isLoggedIn && (
            <Box>
              <Button
                component={Link}
                to="point-of-interest"
                sx={{
                  backgroundColor: 'white',
                  m: '2rem',
                }}
              >
                Create POI
              </Button>
            </Box>
          )}
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {isLoggedIn ? (
              <>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  <Link to="./about">About</Link>
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  <Link to="/about">About</Link>
                </Button>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  <Link to="./login">Login</Link>
                </Button>
              </>
            )}
          </Box>
          {isLoggedIn && (
            <Box sx={{ flexGrow: 0 }}>
              {loading ? (
                <CircularProgress size={32} />
              ) : (
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {userData?.profile_image ? (
                      <Avatar alt="logo" src={userData?.profile_image} />
                    ) : (
                      <Avatar alt="Default" src="/static/images/avatar/2.jpg" />
                    )}
                  </IconButton>
                </Tooltip>
              )}
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    m: '10px',
                    backgroundColor: 'white!important',
                  }}
                  onClick={handleCloseUserMenu}
                >
                  <Typography
                    sx={{ m: '2px', fontSize: '16px', color: '#400080' }}
                  >
                    {userData?.user_name}
                  </Typography>
                  <Button sx={{ m: '2px' }}>
                    <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                      Profile
                    </Link>
                  </Button>
                  <Button sx={{ m: '2px' }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                      Home
                    </Link>
                  </Button>
                  <Button sx={{ m: '2px' }} onClick={handleLogout}>
                    Logout
                  </Button>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavMays;
