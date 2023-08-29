
import "./App.css"
import Login from './Pages/Login';
import {BrowserRouter,Routes,Route } from 'react-router-dom';
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
  

  return (
    <div className="App">
       <ThemeProvider theme={theme}>
      <CssBaseline /> 
      <BrowserRouter>
      
      <Routes>
        <Route path='login' element={<Login/>}/>

      </Routes>
      </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App
