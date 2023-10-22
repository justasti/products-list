import { createAsyncThunk } from '@reduxjs/toolkit'
import { Product, productsApi } from '../productsApi/api'
import { ThunkApi } from '../store'
import { productsSliceName } from './constants'

export interface CreateProductPayload {
  productName: string
}

export const getProducts = createAsyncThunk<Product[], void, ThunkApi>(
  `${productsSliceName}/getProducts`,
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const meals = await dispatch(
        productsApi.endpoints.getProducts.initiate()
      ).unwrap()
      return meals
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const createMeal = createAsyncThunk<
  void,
  CreateProductPayload,
  ThunkApi
>(
  `${productsSliceName}/createProduct`,
  async (product, { dispatch, rejectWithValue }) => {
    try {
      await dispatch(
        productsApi.endpoints.createProduct.initiate(product)
      ).unwrap()
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
