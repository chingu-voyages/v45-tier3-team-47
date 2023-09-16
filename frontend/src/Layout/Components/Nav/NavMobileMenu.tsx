import { Box, IconButton, Menu, Tooltip } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import MobileListItem from "./MobileListItem";
import { useState } from "react";

type Props = {
    isLoggedIn: boolean
}

const NavMobileMenu = ({ isLoggedIn }: Props) => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(
        null
    );

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <Box sx={{
            flexGrow: 1,
            display: { xs: 'flex', md: 'none' },
            marginLeft: '1rem'
        }}>
            <Tooltip title="Open navigation" >
                <IconButton
                    aria-label="Open navigation menu"
                    aria-controls="menu-mobile"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                >
                    <MenuIcon fontSize="large" />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: "45px" }}
                id="menu-mobile"
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center"
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center"
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
            >
                <MobileListItem linkTo="/" text="Home" />
                <MobileListItem linkTo="/about" text="About" />
                {
                    isLoggedIn
                        ? null
                        : <MobileListItem linkTo="/login" text="Login" />
                }
            </Menu>
        </Box>
    )
}

export default NavMobileMenu