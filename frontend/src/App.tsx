import RootLayout from './Layout/RootLayout';
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import './App.css'
import About from './Pages/About';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#400080',
    },
    background: {
      default: '#ffffff',
    },
  },
});

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Landing />} />
        <Route path="About" element={<About />} />
        <Route path="Login" element={<Login />} />
        <Route path="Profile" element={<Profile />} />
      </Route>
    )
  )

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  );
}

export default App