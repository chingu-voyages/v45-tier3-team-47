import "./App.css"
import Form from './components/login/Form';
import {BrowserRouter,Routes,Route } from 'react-router-dom';

function App() {
  

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Form/>}/>

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
