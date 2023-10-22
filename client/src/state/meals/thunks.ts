import { createAsyncThunk } from '@reduxjs/toolkit'
import { Meal, MealProduct, mealsApi } from '../mealsApi/api'
import { ThunkApi } from '../store'
import { mealsSliceName } from './constants'

export interface CreateMealPayload {
  mealName: string
  products: MealProduct[]
}

export const getMeals = createAsyncThunk<Meal[], void, ThunkApi>(
  `${mealsSliceName}/getMeals`,
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const meals = await dispatch(
        mealsApi.endpoints.getMeals.initiate()
      ).unwrap()
      return meals
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const createMeal = createAsyncThunk<void, CreateMealPayload, ThunkApi>(
  `${mealsSliceName}/createMeal`,
  async (meal, { dispatch, rejectWithValue }) => {
    try {
      await dispatch(mealsApi.endpoints.createMeal.initiate(meal)).unwrap()
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
