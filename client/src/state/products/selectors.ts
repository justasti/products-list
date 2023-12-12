import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../store'

export const selectProductsState = (state: RootState) => state.products
export const selectProducts = createSelector(
  selectProductsState,
  (state) => state.products
)
export const selectIsProductsLoading = createSelector(
  selectProductsState,
  (state) => state.loading
)
export const selectProductsStateError = createSelector(selectProductsState, (state) => state.error)

export const selectIsProductsFilterOpen = createSelector(selectProductsState, (state) => state.isProductsFilterOpen)

export const selectProductsCategories = createSelector(selectProductsState, (state) => state.productsCategories)

export const selectFilteredCategories = createSelector(selectProductsState, (state) => state.filteredCategories)