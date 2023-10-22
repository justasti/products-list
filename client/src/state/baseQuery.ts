import { BaseQueryFn, fetchBaseQuery } from '@reduxjs/toolkit/dist/query'

export const baseQuery: BaseQueryFn = (args, api, extraFunctions) => {
  const apiUrl = 'https://products-list-peach.vercel.app'

  const rawBaseQuery = fetchBaseQuery({
    baseUrl: apiUrl,
  })
  return rawBaseQuery(args, api, extraFunctions)
}
