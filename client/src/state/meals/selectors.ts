import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../store'

export const selectMealsState = (state: RootState) => state.meals
export const selectMeals = createSelector(
  selectMealsState,
  (state) => state.meals
)
export const selectIsMealsLoading = createSelector(
  selectMealsState,
  (state) => state.loading
)

export const selectMealNotFound = createSelector(
  selectMealsState,
  (state) => state.notFound
)