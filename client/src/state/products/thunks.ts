import { createAsyncThunk } from '@reduxjs/toolkit'
import { ErrorPayload, Product } from '../models'
import { productsApi } from '../productsApi/api'
import { ThunkApi } from '../store'
import { productsSliceName } from './constants'

export const getProducts = createAsyncThunk<Product[], void, ThunkApi<string | { status: number }>>(
  `${productsSliceName}/getProducts`,
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const meals = await dispatch(productsApi.endpoints.getProducts.initiate()).unwrap()
      return meals
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const createProduct = createAsyncThunk<void, Product, ThunkApi<ErrorPayload>>(
  `${productsSliceName}/createProduct`,
  async (product, { dispatch, rejectWithValue }) => {
    try {
      return await dispatch(productsApi.endpoints.createProduct.initiate(product)).unwrap()
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
