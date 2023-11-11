export interface Product {
  _id: string
  productName: string
}

export interface MealProduct {
  _id: string
  productName: string
  productAmount: string
}

export interface Meal {
  _id: string
  mealName: string
  products: MealProduct[]
}

export interface GetMealByIdPayload {
  _id: string
}