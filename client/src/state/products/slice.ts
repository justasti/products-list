import { createSlice } from '@reduxjs/toolkit'
import { Product } from '../productsApi/api'
import { productsSliceName } from './constants'
import { getProducts } from './thunks'

export interface ProductsState {
  products: Product[]
  loading: boolean
}

const initialState: ProductsState = {
  products: [],
  loading: false,
}

export const productsSlice = createSlice({
  name: productsSliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true
    }),
      builder.addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload
        state.loading = false
      })
  },
})
