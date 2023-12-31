import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState } from 'react';
//Component imports
import RootLayout from './Layout/RootLayout';
import Landing from './Pages/Landing/Landing';
import About from './Pages/About';
import Login from './Pages/Login/Login';
import Profile from './Pages/Profile/Profile';
import PointOfInterest from './Pages/POI/PointOfInterest';

interface IBaseQueryObj {
  [key: string]: string;
}
const baseQueryObj: IBaseQueryObj = {
  production: "https://sightseeshare-api.onrender.com",
  development: "http://localhost:3000"
}
const nodeENV = process.env.NODE_ENV || "development";
export const baseQuery = baseQueryObj[nodeENV];

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#400080",
    },
    background: {
      default: "#ffffff",
    },
  },
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}>
        <Route index element={<Landing />} />
        <Route path="About" element={<About />} />
        <Route path="Login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="Profile" element={<Profile />} />
        <Route path="point-of-interest" element={<PointOfInterest />} />
      </Route>
    )
  );

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  );
}

export default App;
