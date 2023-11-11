export interface ProductApiResponse {
  _id: string
  name: string
}

export interface Product {
  id: string
  name: string
}

export interface MealProductApiResponse {
  _id: string
  name: string
  amount: string
}

export interface MealProduct {
  id: string
  name: string
  amount: string
}

export interface MealApiResponse {
  _id: string
  name: string
  products: MealProductApiResponse[]
}

export interface Meal {
  id: string
  name: string
  products: MealProduct[]
}

export interface GetMealByIdPayload {
  id: string
}

export interface RejectedActionPayload {
  data: { error: string }
  status: number
}
