import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Box from '@mui/material/Box';
interface UserData {
    user_name: string;
    profile_image: string; // Assuming the profile image is a URL
  }
const RootLayout = ({ userData}: { userData: UserData | null } ) => {

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '100vh', minWidth: '320px' }}>
            <Nav userData={userData}  />
            <Box component='main'>
                <Outlet />
            </Box>
            <Footer />
        </Box >
    )
}

export default RootLayout