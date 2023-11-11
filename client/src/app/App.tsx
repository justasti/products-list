import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { NewMealForm } from '../components/meals/MealForm'
import { NewProductForm } from '../components/products/NewProductForm'
import { PageNotFound } from '../pages/404'
import { Homepage } from '../pages/home'
import { MealPage } from '../pages/meal'
import { Meals } from '../pages/meals'
import { Products } from '../pages/products'
import { ShoppingCart } from '../pages/shopping-cart'

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Homepage />,
      children: [
        {
          path: 'products',
          children: [
            {
              path: '',
              element: <Products />,
            },
            {
              path: 'new',
              element: <NewProductForm />,
            },
          ],
        },
        {
          path: 'meals',
          children: [
            {
              path: '',
              element: <Meals />,
            },
            {
              path: 'new',
              element: <NewMealForm />,
            },
            {
              path: ':id',
              element: <MealPage />,
            },
          ],
        },
        {
          path: 'cart',
          element: <ShoppingCart />,
        },
        {
          path: '404',
          element: <PageNotFound />,
        },
        {
          path: '**',
          element: <Navigate to='/404' />,
        },
      ],
    },
  ])
  return <RouterProvider router={router} />
}

export default App
