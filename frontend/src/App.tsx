import RootLayout from './Layout/RootLayout';
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import './App.css'
import About from './Pages/About';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Login from './Pages/Login/Login';
import Landing from './Pages/Landing/Landing';
import Profile from './Pages/Profile/Profile';
import PointOfIntrest from './Pages/POI/PointOfIntrest';
import { useState } from 'react';



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
      <Route path="/"  element={<RootLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}  />}>
        <Route index element={<Landing />} />
        <Route path="About" element={<About />} />
        <Route path="Login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="Profile" element={<Profile />} />
        <Route path="point-of-interest" element={<PointOfIntrest/>}/>
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
