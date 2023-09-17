import { Typography, Box, useMediaQuery } from "@mui/material";
import Form from "./Form";
import { useNavigate } from "react-router-dom";

type Props = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

const Login = ({ setIsLoggedIn }: Props) => {
  const navigate = useNavigate(); // Get the navigate function

  const handleSuccessfulLogin = () => {
    // Update the login status
    setIsLoggedIn(true);

    // Redirect to the homepage
    navigate("/");
  };
  const isNonMobileScreens = useMediaQuery("(min-width:1000px");
  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        flexDirection: "column",
        placeItems: "center",
        paddingTop: "1rem",
      }}
    >
      <Box width={isNonMobileScreens ? "70%" : "95%"} textAlign="center">
        <Typography fontWeight="bold" fontSize="2rem" color="#330066">
          Log In or Register
        </Typography>
        <Box
          width={isNonMobileScreens ? "95%" : "77%"}
          p="2rem"
          m="1rem auto"
          borderRadius="1.5rem"
          border="2px solid"
          borderColor="#b3b3ff"
        >
          <Form onSuccessfulLogin={handleSuccessfulLogin} />
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
