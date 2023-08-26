import { Link, Outlet } from 'react-router-dom';
import Nav from './Components/Nav';
import Footer from './Components/Footer';

const RootLayout = () => {

    return (
        <div className='wrapper flex flex-col justify-between min-h-screen'>
            <header className='flex justify-between py-4'>
                <h1 className='underline'><Link to={'/'}>Project Name/Logo</Link></h1>
                <Nav />
            </header>
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default RootLayout