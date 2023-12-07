import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LoadingSpinner } from '../../components/LoadingSpinner'
import { StyledLink } from '../../components/UI/link-button/styles'
import { Heading } from '../../components/heading'
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
      <Heading level={1}>Meals List</Heading>
      {meals.length ? (
        meals.map((meal: Meal) => (
          <div key={meal.id}>
            <Link to={meal.id}>{meal.name}</Link>
          </div>
        ))
      ) : (
        <Heading level={2}>No meals added yet</Heading>
      )}
      <StyledLink to='/meals/new'>Add new meal</StyledLink>
    </>
  )
}
