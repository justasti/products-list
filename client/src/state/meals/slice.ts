import { createSlice } from '@reduxjs/toolkit'
import { Meal } from '../models'
import { mealsSliceName } from './constants'
import { createMeal, getMeals } from './thunks'

interface MealsState {
  meals: Meal[]
  loading: boolean
}

const initialState: MealsState = {
  meals: [],
  loading: false,
}

export const mealsSlice = createSlice({
  name: mealsSliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMeals.pending, (state) => {
      state.loading = true
    }),
      builder.addCase(getMeals.fulfilled, (state, action) => {
        state.meals = action.payload
        state.loading = false
      }),
      builder.addCase(getMeals.rejected, (state) => {
        state.loading = false
      }),
      builder.addCase(createMeal.fulfilled, (state, action) => {
        state.meals.push(action.meta.arg)
      })
  },
})
