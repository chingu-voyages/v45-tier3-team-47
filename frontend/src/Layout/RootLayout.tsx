import { Outlet } from 'react-router-dom';
import Nav from './Components/Nav/Nav';
import Footer from './Components/Footer';
import Box from '@mui/material/Box';
import { RootLayoutProps } from '../types/types';

const RootLayout = ({ isLoggedIn, setIsLoggedIn }: RootLayoutProps) => {

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '100vh', minWidth: '320px' }}>
            <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <Box component='main'>
                <Outlet />
            </Box>
            <Footer />
        </Box >
    )
}

export default RootLayout