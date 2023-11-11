import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ProductWithAmount } from '../models'
import { shoppingCartSliceName } from './constants'

export interface ShoppingCartState {
  products: ProductWithAmount[]
}

const initialState: ShoppingCartState = {
  products: [],
}

export const shoppingCartSlice = createSlice({
  name: shoppingCartSliceName,
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductWithAmount>) => {
      const existingProduct = state.products.find((product) => product.id === action.payload.id)

      if (existingProduct) existingProduct.amount = Number(existingProduct.amount) + Number(action.payload.amount)
      else state.products.push(action.payload)
    },
  },
})

export const { addToCart } = shoppingCartSlice.actions
