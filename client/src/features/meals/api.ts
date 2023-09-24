import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Product } from '../products/api'

export type Meal = {
  _id: string
  products: MealProduct[]
}

interface MealProduct extends Product {
  amount: number
}

export const mealsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://products-list-peach.vercel.app/meals',
  }),
  reducerPath: 'mealsApi',
  tagTypes: ['meals'],
  endpoints: (builder) => ({
    getMeals: builder.query<Meal, string>({
      query: () => '/',
      providesTags: ['meals'],
    }),
  }),
})
