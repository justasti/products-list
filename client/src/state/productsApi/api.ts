import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '../baseQuery'
import { Product } from '../models'

export const productsApi = createApi({
  baseQuery,
  reducerPath: 'productsApi',
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => ({
        url: '/products',
        method: 'GET',
      }),
    }),
    createProduct: builder.mutation<void, Product>({
      query: (body) => ({
        url: '/products',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useGetProductsQuery } = productsApi
