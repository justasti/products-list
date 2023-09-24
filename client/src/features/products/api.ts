import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type Product = {
  _id: string
  productName: string
}

export const productsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://products-list-peach.vercel.app/products',
  }),
  reducerPath: 'productsApi',
  tagTypes: ['products'],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => '/',
      providesTags: ['products'],
    }),
  }),
})

export const { useGetProductsQuery } = productsApi
