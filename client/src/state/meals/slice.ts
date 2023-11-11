import { createSlice } from '@reduxjs/toolkit'
import { Meal } from '../models'
import { mealsSliceName } from './constants'
import { createMeal, getMealById, getMeals } from './thunks'

interface MealsState {
  meals: Meal[]
  loading: boolean
  notFound: boolean
}

const initialState: MealsState = {
  meals: [],
  loading: false,
  notFound: false,
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
      }),
        builder.addCase(getMealById.pending, (state) => {
          state.notFound = false
        }),
        builder.addCase(getMealById.rejected, (state, action) => {
          if (action.payload.status === 404) state.notFound = true
        })
  },
})
