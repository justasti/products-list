import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { LoadingSpinner } from '../../components/LoadingSpinner'
import { useAppDispatch } from '../../state/hooks'
import { getMealById } from '../../state/meals/thunks'
import { Meal } from '../../state/models'

export const MealPage = () => {
  const dispatch = useAppDispatch()
  const { uniqueId } = useParams()
  const [meal, setMeal] = useState<Meal>()

  useEffect(() => {
    dispatch(getMealById({ id: uniqueId })).then((data) =>
      setMeal(data.payload as Meal)
    )
  }, [uniqueId])

  if (!meal) return <LoadingSpinner />

  return (
    <>
      <h1>{meal.mealName}</h1>
      <h2>Products:</h2>
      <ul>
        {meal.products.map((prod) => (
          <li key={prod.uniqueId}>
            {prod.productName} - {prod.productAmount}
          </li>
        ))}
      </ul>
    </>
  )
}
