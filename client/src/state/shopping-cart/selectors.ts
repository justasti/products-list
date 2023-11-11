import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../store'

export const selectShoppingCartState = (state: RootState) => state.shoppingCart
export const selectShoppingCart = createSelector(selectShoppingCartState, (state) => state.products)
