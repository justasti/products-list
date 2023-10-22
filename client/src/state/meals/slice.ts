import { createSlice } from '@reduxjs/toolkit'
import { mealsSliceName } from './constants'

const initialState = {
  meals: [],
}

export const mealsSlice = createSlice({
  name: mealsSliceName,
  initialState,
  reducers: {},
})
