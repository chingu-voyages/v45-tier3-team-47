import { Outlet } from 'react-router-dom';
import Nav from './Components/Nav';
import Footer from './Components/Footer';
import Box from '@mui/material/Box';


const RootLayout = ( ) => {


  

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '100vh', minWidth: '320px' }}>
            <Nav />
            <Box component='main'>
                <Outlet />
            </Box>
            <Footer />
        </Box >
    )
}

export default RootLayout