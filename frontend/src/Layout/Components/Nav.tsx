import * as React from 'react';
import { Link } from "react-router-dom"
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
import { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";


interface UserData {
  user_name: string;
  profile_image: string; 
}
const pages = ["About", "Login"];
const isAuthenticated = true;
const settings = isAuthenticated ? ["Profile", "Logout"] : [];


function Nav() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [user, setUser] = useState<UserData | null>(null);

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
    const userId = sessionStorage.getItem("userId");
    // isAuthenticated = true;

    if (!userId) {
      console.error("User ID not found in sessionStorage");
      return;
    }
    // setUser(userId);
    fetchUserInfo(userId);
  }, []);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
 

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
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    window.location.href = "/login";
  };
  
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
             
                    <Box sx={{width:"60px",height:"72px"}} >
                    <img
        src={logo}
        style={{width:"50px",height:"50px"}}
        
        alt="Logo"

      />
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
                            fontSize:12,
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
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                          
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">
                                        <Link to="/about">About</Link>
                                    </Typography>
                                    {!user &&
                                    <Typography textAlign="center">
                                        <Link to="/login">Login</Link>
                                    </Typography>
}
                                </MenuItem>

                        </Menu>
                    </Box>
                     { user && 
                    <Box>
                        <Button
                         component={Link} 
                         to="point-of-interest"
                         sx={{
                            backgroundColor:"white",
                            m:"2rem"
                           
                        }}>Create POI
                    
                        </Button>
                    </Box>
}
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
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                <Link to={page}>{page}</Link>
                            </Button>
                        ))}
                    </Box>

          <Box sx={{ flexGrow: 0 }}>
            {user &&
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {userData ? (
                  <Avatar
                    alt={userData.user_name}
                    src={userData.profile_image}
                  />
                ) : (
                  <Avatar alt="Default" src={"/static/images/avatar/2.jpg"} />
                )}
               
              </IconButton>
            </Tooltip>
}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              { user && 
                <MenuItem  sx={{display:"flex",flexDirection:"column"}} onClick={handleCloseUserMenu}>
                  <Typography>{userData?.user_name}</Typography>
                  <Typography textAlign="center">
                      <Link to="/profile">Profile</Link>
                 
                  </Typography>
                  <Typography textAlign="center">
                   
                      <Button onClick={handleLogout}>Logout</Button>
                      </Typography>
                     
                </MenuItem>
              }
            </Menu>

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Nav;
