import { createSlice } from '@reduxjs/toolkit'
import { createMeal } from '../meals/thunks'
import { ErrorPayload, Product } from '../models'
import { productsSliceName } from './constants'
import { createProduct, getProducts } from './thunks'

export interface ProductsState {
  products: Product[]
  loading: boolean
  error: ErrorPayload
  isProductsFilterOpen: boolean
  filteredProducts: Product[]
}

const initialState: ProductsState = {
  products: [
    // { id: '7UKW3WQnQVpjUrH8sVSvf', name: 'Sviestas Sviesteliumbyzas' },
    // { id: '-5JuRLu2O-eTh9n9S90-x', name: 'Duona' },
    // { id: 'KZYdKbrwZhAcdpyZUGOzb', name: 'Dešra' },
    // { id: 'lfAdnAPVtkm2o8lFIRpZT', name: 'Kiaušinis' },
  ],
  loading: false,
  error: null,
  isProductsFilterOpen: false,
  filteredProducts: [],
}

export const productsSlice = createSlice({
  name: productsSliceName,
  initialState,
  reducers: {
    openProductsFilter: (state) => {
      state.isProductsFilterOpen = true
    },
    closeProductsFilter: (state) => {
      state.isProductsFilterOpen = false
    },
  },
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
      builder.addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.meta.arg)
        state.error = null
      }),
      builder.addCase(createProduct.rejected, (state, action) => {
        state.error = action.payload
      }),
      builder.addCase(createMeal.fulfilled, (state, action) => {
        for (const product of action.meta.arg.products) {
          if (!state.products.find((prod) => prod.name === product.name)) {
            state.products.push({
              name: product.name,
              id: product.id,
            })
          }
        }
      })
  },
})

export const { openProductsFilter, closeProductsFilter } = productsSlice.actions