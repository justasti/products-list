import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { LoadingSpinner } from '../../components/LoadingSpinner'
import { useAppDispatch } from '../../state/hooks'
import { getMealById } from '../../state/meals/thunks'
import { Meal } from '../../state/models'

export const MealPage = () => {
  const dispatch = useAppDispatch()
  const { _id } = useParams()
  const [meal, setMeal] = useState<Meal>()

  useEffect(() => {
    dispatch(getMealById({ _id })).then((data) => setMeal(data.payload as Meal))
  }, [_id])

  if (!meal) return <LoadingSpinner />

  return (
    <>
      <h1>{meal.name}</h1>
      <h2>Products:</h2>
      <ul>
        {meal.products.map((prod) => (
          <li key={prod._id}>
            {prod.name} - {prod.amount}
          </li>
        ))}
      </ul>
    </>
  )
}
