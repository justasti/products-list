import { BaseQueryFn, fetchBaseQuery } from '@reduxjs/toolkit/dist/query'

export const baseQuery: BaseQueryFn = (args, api, extraFunctions) => {
  const apiUrl = import.meta.env.DEV
    ? 'http://localhost:3000'
    : 'https://products-list-peach.vercel.app'

  const rawBaseQuery = fetchBaseQuery({
    baseUrl: apiUrl,
  })
  return rawBaseQuery(args, api, extraFunctions)
}
