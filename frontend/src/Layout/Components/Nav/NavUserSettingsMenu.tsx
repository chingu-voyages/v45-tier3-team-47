import { Avatar, Box, Button, CircularProgress, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material"
import { UserData } from "./Nav"
import MobileListItem from "./MobileListItem"
import { useState } from "react"

type Props = {
    userData: UserData | null,
    onClick: () => void,
    loading: boolean
}

const NavUserSettingsMenu = ({ userData, onClick, loading }: Props) => {

    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(
        null
    );

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    return (
        <Box sx={{ flexGrow: 0 }}>

            {
                loading
                    ? <CircularProgress size={32} />
                    : (
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
                    )
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
                    <Button sx={{ m: "2px", fontSize: "1.2rem" }} onClick={onClick}>Logout</Button>
                </MenuItem>
            </Menu>
        </Box>
    )
}

export default NavUserSettingsMenu