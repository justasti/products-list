import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Products } from '../components/products'
import { Homepage } from '../pages/home'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <Homepage />
        </>
      ),
      children: [
        {
          path: '/',
          element: <Products />,
        },
      ],
    },
  ])
  return <RouterProvider router={router} />
}

export default App
