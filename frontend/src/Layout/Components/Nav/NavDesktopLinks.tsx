import { Box } from "@mui/material"
import NavLinkBtn from "./NavLinkBtn"

type Props = {
    isLoggedIn: boolean,
}

const NavDesktopLinks = ({ isLoggedIn }: Props) => {
    return (
        <Box
            sx={{
                textTransform: 'uppercase',
                flexGrow: 1,
                display: {
                    xs: 'none',
                    md: 'flex'
                },
                gap: '2rem'
            }}
        >
            <NavLinkBtn linkTo="/about" text="About" />
            {isLoggedIn ?
                null
                : <NavLinkBtn linkTo="/login" text="Login" />
            }
        </Box>
    )
}

export default NavDesktopLinks