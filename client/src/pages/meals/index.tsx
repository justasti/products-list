import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LoadingSpinner } from '../../components/LoadingSpinner'
import { useAppDispatch, useAppSelector } from '../../state/hooks'
import { selectIsMealsLoading, selectMeals } from '../../state/meals/selectors'
import { getMeals } from '../../state/meals/thunks'
import { Meal } from '../../state/models'

export const Meals = () => {
  const meals = useAppSelector(selectMeals)
  const isMealsLoading = useAppSelector(selectIsMealsLoading)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!meals.length) dispatch(getMeals())
  }, [])

  if (isMealsLoading) return <LoadingSpinner />

  return (
    <>
      <div>
        {meals &&
          meals.map((meal: Meal) => (
            <div key={meal.id}>
              <Link to={meal.id}>{meal.name}</Link>
            </div>
          ))}
      </div>
      <Link to='/meals/new'>Add new meal</Link>
    </>
  )
}
