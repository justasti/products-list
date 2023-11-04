import { useEffect } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Meals } from '../components/meals'
import { NewMealForm } from '../components/meals/NewMealForm'
import { Products } from '../components/products'
import { NewProductForm } from '../components/products/NewProductForm'
import { Homepage } from '../pages/home'
import { MealPage } from '../pages/meal/Meal'
import { useAppDispatch } from '../state/hooks'
import { getMeals } from '../state/meals/thunks'
import { getProducts } from '../state/products/thunks'

const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getProducts())
    dispatch(getMeals())
  }, [])

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
              path: ':uniqueId',
              element: <MealPage />,
            },
          ],
        },
      ],
    },
  ])
  return <RouterProvider router={router} />
}

export default App
