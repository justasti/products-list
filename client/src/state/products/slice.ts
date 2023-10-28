import { createSlice } from '@reduxjs/toolkit'
import { createMeal } from '../meals/thunks'
import { Product } from '../models'
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
      }),
      builder.addCase(getProducts.rejected, (state) => {
        state.loading = false
      }),
      builder.addCase(createMeal.fulfilled, (state, action) => {
        for (const product of action.meta.arg.products) {
          if (
            !state.products.find(
              (prod) => prod.productName === product.productName
            )
          ) {
            state.products.push({
              productName: product.productName,
              uniqueId: product.uniqueId,
            })
          }
        }
      })
  },
})
