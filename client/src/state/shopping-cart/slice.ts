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
    removeFromCart: (shoppingCartSlice, action: PayloadAction<string>) => {
      shoppingCartSlice.products = shoppingCartSlice.products.filter((product) => product.id !== action.payload)
    },
    increaseAmount: (state, action: PayloadAction<string>) => {
      const product = state.products.find((product) => product.id === action.payload)
      if (product) product.amount = Number(product.amount) + 1
    },
    decreaseAmount: (state, action: PayloadAction<string>) => {
      const product = state.products.find((product) => product.id === action.payload)
      if (product && product.amount !== 1) product.amount = Number(product.amount) - 1
    },
    resetCart: (state) => {
      state.products = []
    },
  },
})

export const { addToCart, resetCart, decreaseAmount, increaseAmount, removeFromCart } = shoppingCartSlice.actions
