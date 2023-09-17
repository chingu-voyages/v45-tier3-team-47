import Button from '@mui/material/Button';
import { Link } from "react-router-dom"
type Props = {
    linkTo: string,
    text: string
}

const NavLinkBtn = ({ linkTo, text }: Props) => {
    return (
        <Button
            component={Link}
            to={linkTo}
            sx={{
                my: 2,
                fontSize: '1.2rem',
                color: 'white',
                display: 'block',
                padding: "5px 1rem",
                borderRadius: '5px',
                ":hover": {
                    color: "#400080",
                    backgroundColor: 'white',
                }
            }}
        >
            {text}
        </Button>
    )
}

export default NavLinkBtn