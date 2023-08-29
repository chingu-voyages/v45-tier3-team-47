import { Typography,
  Box , useMediaQuery} from '@mui/material';
import Form from "../Layout/components/Form";
import { useTheme, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';


const Login = () => {
  const theme = useTheme();
  const toggleThemeMode = () => {
    const newMode = theme.palette.mode === 'light' ? 'dark' : 'light';
    theme.palette.mode = newMode;
  };

  const isNonMobileScreens = useMediaQuery(("(min-width:1000px"));
  return (
    <>
    <IconButton onClick={toggleThemeMode} aria-label="Toggle theme mode">
      {theme.palette.mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
    </IconButton>
   
    <Box width="100%" padding="0.4rem 2%" textAlign="center"  >
    <Typography fontWeight="bold" fontSize="32px" color="#330066" >Sight.See.Share</Typography>
    <Box width={isNonMobileScreens? "95%": "77%"} p="2rem" m="2rem auto"
  borderRadius="1.5rem"
  border="2px solid"
  borderColor="#b3b3ff"
  
  
  >

    <Form/>
  </Box>
  </Box>
  </>
   
  
  );
}

export default Login;