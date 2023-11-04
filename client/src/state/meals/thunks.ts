import { createAsyncThunk } from '@reduxjs/toolkit'
import { mealsApi } from '../mealsApi/api'
import { GetMealByIdPayload, Meal } from '../models'
import { ThunkApi } from '../store'
import { mealsSliceName } from './constants'

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

export const getMealById = createAsyncThunk<Meal, GetMealByIdPayload, ThunkApi>(
  `${mealsSliceName}/getMealById`,
  async ({ id }, { dispatch, rejectWithValue }) => {
    try {
      const meal = await dispatch(
        mealsApi.endpoints.getMealById.initiate(id)
      ).unwrap()
      return meal
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const createMeal = createAsyncThunk<void, Meal, ThunkApi>(
  `${mealsSliceName}/createMeal`,
  async (meal, { dispatch, rejectWithValue }) => {
    try {
      return await dispatch(
        mealsApi.endpoints.createMeal.initiate(meal)
      ).unwrap()
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
