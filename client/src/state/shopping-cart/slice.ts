import { createSlice } from '@reduxjs/toolkit'
import { MealProduct } from '../models'
import { shoppingCartSliceName } from './constants'

export interface ShoppingCartState {
  products: MealProduct[]
}

const initialState: ShoppingCartState = {
  products: [],
}

export const shoppingCartSlice = createSlice({
  name: shoppingCartSliceName,
  initialState,
  reducers: {},
})
