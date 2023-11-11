import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../state/hooks'
import { selectIsMealsLoading, selectMeals } from '../../state/meals/selectors'
import { getMeals } from '../../state/meals/thunks'
import { Meal } from '../../state/models'
import { LoadingSpinner } from '../LoadingSpinner'

export const Meals = () => {
  const meals = useAppSelector(selectMeals)
  const isMealsLoading = useAppSelector(selectIsMealsLoading)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getMeals())
  }, [])

  if (isMealsLoading) return <LoadingSpinner />

  return (
    <>
      <div>
        {meals &&
          meals.map((meal: Meal) => (
            <div key={meal._id}>
              <Link to={meal._id}>{meal.mealName}</Link>
            </div>
          ))}
      </div>
      <Link to='/meals/new'>Add new meal</Link>
    </>
  )
}
