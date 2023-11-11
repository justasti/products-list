export interface Product {
  _id: string
  name: string
}

export interface MealProduct {
  _id: string
  name: string
  amount: string
}

export interface Meal {
  _id: string
  name: string
  products: MealProduct[]
}

export interface GetMealByIdPayload {
  _id: string
}

export interface RejectedActionPayload {
  data: { error: string }
  status: number
}