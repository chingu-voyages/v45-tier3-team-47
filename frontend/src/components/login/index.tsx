import { Typography,
  Box , useMediaQuery} from '@mui/material';
import Form from "./Form"


const Login = () => {
  const isNonMobileScreens = useMediaQuery(("(min-width:1000px"));
  return (
    <Box width="100%" padding="0.4rem 2%" textAlign="center"  >
    <Typography fontWeight="bold" fontSize="32px" color="#330066" >Sight.See.Share</Typography>
    <Box width={isNonMobileScreens? "70%": "89%"} p="2rem" m="2rem auto"
  borderRadius="1.5rem"
  border="2px solid"
  borderColor="#b3b3ff"
  // bgcolor= "#b3b3ff"
  
  >

    <Form/>
  </Box>
  </Box>
   
  
  );
}

export default Login;