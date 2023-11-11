import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '../baseQuery'
import { Product, ProductApiResponse } from '../models'

export const productsApi = createApi({
  baseQuery,
  reducerPath: 'productsApi',
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => ({
        url: '/products',
        method: 'GET',
      }),
      transformResponse: (products: ProductApiResponse[]) =>
        products.map((product) => ({ id: product._id, name: product.name })),
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