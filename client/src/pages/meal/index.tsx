import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { LoadingSpinner } from '../../components/LoadingSpinner'
import { useAppDispatch, useAppSelector } from '../../state/hooks'
import { selectMealNotFound } from '../../state/meals/selectors'
import { getMealById } from '../../state/meals/thunks'
import { Meal } from '../../state/models'

export const MealPage = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const [meal, setMeal] = useState<Meal>()
  const mealNotFound = useAppSelector(selectMealNotFound)

  useEffect(() => {
    dispatch(getMealById({ id })).then((data) => setMeal(data.payload as Meal))
  }, [id])

  if (!meal) return <LoadingSpinner />
  if (mealNotFound) return <Navigate to={'/404'} />

  return (
    <>
      <h1>{meal.name}</h1>
      <h2>Products:</h2>
      <ul>
        {meal.products.map((prod) => (
          <li key={prod.id}>
            {prod.name} - {prod.amount}
          </li>
        ))}
      </ul>
    </>
  )
}
