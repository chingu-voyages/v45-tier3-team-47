import RootLayout from './Layout/RootLayout';
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
//Layout import
//Page imports
import About from './Pages/About';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Login from './Pages/Login/Login';
import Landing from './Pages/Landing';


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
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
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