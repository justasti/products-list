import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Products } from '../features/products'
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
