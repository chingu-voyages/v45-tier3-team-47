import { Link, Outlet } from 'react-router-dom';
import Nav from './Components/Nav';
import Footer from './Components/Footer';

const RootLayout = () => {

    return (
        <div>
            <header>
                <h1><Link to={'/'}>Project Name/Logo</Link></h1>
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