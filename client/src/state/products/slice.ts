import { createSlice } from '@reduxjs/toolkit'
import { createMeal } from '../meals/thunks'
import { ErrorPayload, Product } from '../models'
import { productsSliceName } from './constants'
import { createProduct, getProducts } from './thunks'

export interface ProductsState {
  products: Product[]
  productsCategories: string[]
  loading: boolean
  error: ErrorPayload
  isProductsFilterOpen: boolean
  filteredCategories: string[]
}

const initialState: ProductsState = {
  products: [
    // { id: '7UKW3WQnQVpjUrH8sVSvf', name: 'Sviestas Sviesteliumbyzas' },
    // { id: '-5JuRLu2O-eTh9n9S90-x', name: 'Duona' },
    // { id: 'KZYdKbrwZhAcdpyZUGOzb', name: 'Dešra' },
    // { id: 'lfAdnAPVtkm2o8lFIRpZT', name: 'Kiaušinis' },
  ],
  productsCategories: [],
  loading: false,
  error: null,
  isProductsFilterOpen: false,
  filteredCategories: [],
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
    setFilteredCategories: (state, action) => {
      state.filteredCategories = action.payload
      state.isProductsFilterOpen = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true
    }),
      builder.addCase(getProducts.fulfilled, (state, action) => {
        const products = action.payload
        state.products = products
        const categories = products.map((product) => product.categories).flat()
        state.productsCategories = [...new Set(categories)].sort()
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
              categories: product.categories,
            })
          }
        }
      })
  },
})

export const { openProductsFilter, closeProductsFilter, setFilteredCategories } = productsSlice.actions