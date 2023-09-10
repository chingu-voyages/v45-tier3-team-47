import { Typography,
  Box , useMediaQuery} from '@mui/material';
import PostForm from './PostForm'




const PointOfIntrest = () => {
  

  const isNonMobileScreens = useMediaQuery(("(min-width:1000px"));
 
  return (
    <>

   
    <Box width="100%" padding="0.4rem 2%" textAlign="center"  >
    <Typography fontWeight="bold" fontSize="32px" color="#330066" >Create a Post</Typography>
    <Box width={isNonMobileScreens? "55%": "77%"} p="2rem" m="2rem auto"
  borderRadius="1.5rem"
  border="2px solid"
  borderColor="#b3b3ff"
  
  
  >

  <PostForm/>
  </Box>
  </Box>
  </>
   
  
  );
}

export default PointOfIntrest;