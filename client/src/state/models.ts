export interface Product {
  uniqueId: string
  productName: string
}

export interface MealProduct {
  uniqueId: string
  productName: string
  productAmount: string
}

export interface Meal {
  uniqueId: string
  mealName: string
  products: MealProduct[]
}

export interface GetMealByIdPayload {
  id: string
}