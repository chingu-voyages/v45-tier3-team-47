import { MenuItem, Typography } from "@mui/material"

type Props = {
    linkTo: string,
    text: string
}

const MobileListItem = ({ linkTo, text }: Props) => {
    return (
        <MenuItem>
            <Typography
                component="a"
                href={linkTo}
                fontSize="1.2rem"
                textTransform="uppercase"
                textAlign="center"
                marginY="5px"
                width="100%"
                color="#400080"
            >
                {text}
            </Typography>
        </MenuItem>
    )
}

export default MobileListItem