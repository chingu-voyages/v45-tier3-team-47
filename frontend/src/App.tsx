
import "./App.css"
import Login from './Pages/Login';
import {BrowserRouter,Routes,Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import PointOfIntrest from "./Pages/PointOfIntrest";

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
  

  return (
    <div className="App">
       <ThemeProvider theme={theme}>
      <CssBaseline /> 
      <BrowserRouter>
      
      <Routes>
        <Route path='login' element={<Login/>}/>
        <Route path='point-of-intrest' element={<PointOfIntrest/>}/>

      </Routes>
      </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App
