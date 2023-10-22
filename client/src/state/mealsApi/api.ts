import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '../baseQuery'
import { CreateMealPayload } from '../meals/thunks'
import { Product } from '../productsApi/api'

export type Meal = {
  _id?: string
  mealName: string
  products: MealProduct[]
}

export interface MealProduct extends Product {
  productAmount: number
}

export const mealsApi = createApi({
  baseQuery,
  reducerPath: 'mealsApi',
  endpoints: (builder) => ({
    getMeals: builder.query<Meal[], void>({
      query: () => ({
        url: '/meals',
        method: 'GET',
      }),
    }),
    createMeal: builder.mutation<void, CreateMealPayload>({
      query: (body) => ({
        url: '/meals',
        method: 'POST',
        body,
      }),
    }),
  }),
})
