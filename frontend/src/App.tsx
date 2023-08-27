import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
//Layout import
import RootLayout from './Layout/RootLayout';
//Page imports
import About from './Pages/About';
import Landing from './Pages/Landing';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Landing />} />
        <Route path="about" element={<About />} />
      </Route>
    )
  )

  return <RouterProvider router={router} />;
}

export default App
