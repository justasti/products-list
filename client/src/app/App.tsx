import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Meals } from '../components/meals'
import { NewMealForm } from '../components/meals/MealForm'
import { Products } from '../components/products'
import { NewProductForm } from '../components/products/NewProductForm'
import { PageNotFound } from '../pages/404'
import { Homepage } from '../pages/home'
import { MealPage } from '../pages/meal'

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
              path: ':_id',
              element: <MealPage />,
            },
          ],
        },
        {
          path: '404',
          element: <PageNotFound />,
        },
      ],
    },
  ])
  return <RouterProvider router={router} />
}

export default App
