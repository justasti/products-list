import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { mealsSlice } from './meals/slice'
import { mealsApi } from './mealsApi/api'
import { productsSlice } from './products/slice'
import { productsApi } from './productsApi/api'

export const reduxStore = configureStore({
  reducer: {
    [mealsSlice.name]: mealsSlice.reducer,
    [mealsApi.reducerPath]: mealsApi.reducer,
    [productsSlice.name]: productsSlice.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mealsApi.middleware, productsApi.middleware),
})

export type RootState = ReturnType<typeof reduxStore.getState>
export type AppDispatch = typeof reduxStore.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export interface ThunkApi<T = unknown> {
  dispatch: AppDispatch
  state: RootState
  rejectValue: T
}
