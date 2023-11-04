import { Link } from 'react-router-dom'
import { useAppSelector } from '../../state/hooks'
import { selectIsMealsLoading, selectMeals } from '../../state/meals/selectors'
import { Meal } from '../../state/models'
import { LoadingSpinner } from '../LoadingSpinner'

export const Meals = () => {
  const meals = useAppSelector(selectMeals)
  const isMealsLoading = useAppSelector(selectIsMealsLoading)

  if (isMealsLoading) return <LoadingSpinner />

  return (
    <>
      <div>
        {meals &&
          meals.map((meal: Meal) => (
            <div key={meal.uniqueId}>
              <Link to={meal.uniqueId}>{meal.mealName}</Link>
            </div>
          ))}
      </div>
      <Link to='/meals/new'>Add new meal</Link>
    </>
  )
}
