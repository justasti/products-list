import { createSlice } from '@reduxjs/toolkit'
import { productsSliceName } from './constants'

const initialState = {
  products: [],
}

export const productsSlice = createSlice({
  name: productsSliceName,
  initialState,
  reducers: {},
})
