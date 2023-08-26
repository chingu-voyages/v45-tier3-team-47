import RootLayout from './Layout/RootLayout';
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import './App.css'
import About from './Pages/About';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route path="about" element={<About />} />
      </Route>
    )
  )

  return <RouterProvider router={router} />;
}

export default App
