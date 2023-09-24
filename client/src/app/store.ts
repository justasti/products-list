import { configureStore } from '@reduxjs/toolkit'
import { mealsApi } from '../features/meals/api'
import { useDispatch } from 'react-redux'
import { productsApi } from '../features/products/api'

export const reduxStore = configureStore({
  reducer: {
    [mealsApi.reducerPath]: mealsApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mealsApi.middleware, productsApi.middleware),
})

export type RootState = ReturnType<typeof reduxStore.getState>
export type AppDispatch = typeof reduxStore.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
