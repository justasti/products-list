import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '../baseQuery'
import { Meal, MealApiResponse } from '../models'

export const mealsApi = createApi({
  baseQuery,
  reducerPath: 'mealsApi',
  endpoints: (builder) => ({
    getMeals: builder.query<Meal[], void>({
      query: () => ({
        url: '/meals',
        method: 'GET',
      }),
      transformResponse: (meals: MealApiResponse[]) =>
        meals.map((meal) => ({
          id: meal._id,
          name: meal.name,
          products: meal.products.map((product) => ({
            id: product._id,
            name: product.name,
            amount: product.amount,
          })),
        })),
    }),
    getMealById: builder.query<Meal, string>({
      query: (id) => ({
        url: `/meals/${id}`,
        method: 'GET',
      }),
      transformResponse: (meal: MealApiResponse) => ({
        id: meal._id,
        name: meal.name,
        products: meal.products.map((product) => ({
          id: product._id,
          name: product.name,
          amount: product.amount,
        })),
      }),
    }),
    createMeal: builder.mutation<void, Meal>({
      query: (body) => ({
        url: '/meals',
        method: 'POST',
        body,
      }),
    }),
  }),
})
