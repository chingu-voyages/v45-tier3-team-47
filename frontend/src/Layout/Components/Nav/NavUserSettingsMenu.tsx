import { Avatar, Button, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material"
import { UserData } from "./Nav"
import MobileListItem from "./MobileListItem"

type Props = {
    anchorElUser: HTMLElement | null,
    setAnchorElUser: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
    userData: UserData | null
}

const NavUserSettingsMenu = ({ anchorElUser, setAnchorElUser, userData }: Props) => {

    const handleLogout = () => {
        // Clear the user session data
        sessionStorage.removeItem("userToken");
        sessionStorage.removeItem("userId");
        // Redirect to the login page
        window.location.href = "/login";
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    return (
        <>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {userData?.profile_image ? (
                        <Avatar
                            alt={userData?.user_name}
                            src={userData?.profile_image}
                        />
                    ) : (
                        <Avatar alt="Default" src={"/static/images/avatar/2.jpg"} />
                    )}
                </IconButton>
            </Tooltip>

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
                <MenuItem
                    sx={{ textAlign: 'center', marginY: "5px" }}
                    disabled
                >
                    <Typography
                        sx={{
                            m: "2px",
                            fontSize: "1.2rem",
                            color: '#400080',
                            width: '100%'
                        }}
                    >
                        {userData?.user_name}
                    </Typography>
                </MenuItem>
                <MobileListItem linkTo="/profile" text="Profile" />
                <MenuItem>
                    <Button sx={{ m: "2px", fontSize: "1.2rem" }} onClick={handleLogout}>Logout</Button>
                </MenuItem>
            </Menu>
        </>
    )
}

export default NavUserSettingsMenu