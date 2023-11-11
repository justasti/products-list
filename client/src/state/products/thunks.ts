import { createAsyncThunk } from '@reduxjs/toolkit'
import { Product } from '../models'
import { productsApi } from '../productsApi/api'
import { ThunkApi } from '../store'
import { productsSliceName } from './constants'

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

export const createProduct = createAsyncThunk<void, Product, ThunkApi>(
  `${productsSliceName}/createProduct`,
  async (product, { dispatch, rejectWithValue, getState }) => {
    try {
      const existingProduct = getState().products.products.find(
        (prod) =>
          prod.name.toLocaleLowerCase() === product.name.toLocaleLowerCase()
      )
      if (!existingProduct) {
        return await dispatch(
          productsApi.endpoints.createProduct.initiate(product)
        ).unwrap()
      } else {
        throw 'Product already exists'
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
