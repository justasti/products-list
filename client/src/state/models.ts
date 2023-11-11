export interface Product {
  id: string
  name: string
}

export interface Meal {
  id: string
  name: string
  products: MealProduct[]
}

export interface MealProduct {
  id: string
  name: string
  amount: string
}

export interface ProductApiResponse extends Omit<Product, 'id'> {
  _id: string
}

export interface MealApiResponse extends Omit<Meal, 'id'> {
  _id: string
}

export interface MealProductApiResponse extends Omit<MealProduct, 'id'> {
  _id: string
}

export interface GetMealByIdPayload {
  id: string
}

export interface RejectedActionPayload {
  data: { error: string }
  status: number
}
