import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '../baseQuery'
import { Meal } from '../models'

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
    getMealById: builder.query<Meal, string>({
      query: (id) => ({
        url: `/meals/${id}`,
        method: 'GET',
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
