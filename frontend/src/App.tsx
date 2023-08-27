mport RootLayout from './Layout/RootLayout';
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
//Layout import
import RootLayout from './Layout/RootLayout';
//Page imports
import About from './Pages/About';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route path="about" element={<About />} />
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