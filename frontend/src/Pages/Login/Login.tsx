import {
  Typography,
  Box, useMediaQuery
} from '@mui/material';
import Form from './Form';

const Login = () => {

  const isNonMobileScreens = useMediaQuery(("(min-width:1000px"));
  return (
    <Box
      component="section"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        placeItems: 'center',
        paddingTop: '1rem'
      }}
    >
      <Box
        width={isNonMobileScreens ? "70%" : "95%"}
        textAlign="center"  >
        <Typography fontWeight="bold" fontSize="2rem" color="#330066" >Log In or Register</Typography>
        <Box
          width={isNonMobileScreens ? "95%" : "77%"}
          p="2rem"
          m="1rem auto"
          borderRadius="1.5rem"
          border="2px solid"
          borderColor="#b3b3ff"
        >
          <Form />
        </Box>
      </Box>
    </Box>


  );
}

export default Login;