import { Link } from "react-router-dom"

const Nav = () => {
    return (
        <nav>
            <ul className="flex justify-between gap-4">
                <li><Link to="about">About</Link></li>
                <li>
                    <Link to="/">Sign Up</Link>
                </li>
                <li>
                    <Link to="/">Profile</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Nav