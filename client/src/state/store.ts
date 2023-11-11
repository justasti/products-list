import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { mealsSlice } from './meals/slice'
import { mealsApi } from './mealsApi/api'
import { productsSlice } from './products/slice'
import { productsApi } from './productsApi/api'

const rootReducer = combineReducers({
  [mealsSlice.name]: mealsSlice.reducer,
  [mealsApi.reducerPath]: mealsApi.reducer,
  [productsSlice.name]: productsSlice.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
})

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: [mealsSlice.name, mealsApi.reducerPath, productsSlice.name, productsApi.reducerPath],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const reduxStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(mealsApi.middleware, productsApi.middleware),
})

export type RootState = ReturnType<typeof reduxStore.getState>
export type AppDispatch = typeof reduxStore.dispatch
export interface ThunkApi<T = unknown> {
  dispatch: AppDispatch
  state: RootState
  rejectValue: T
}
