export interface Product {
  id: string
  name: string
}

export interface Meal {
  id: string
  name: string
  products: ProductWithAmount[]
}

export interface ProductWithAmount {
  id: string
  name: string
  amount: number
}

export interface ProductApiResponse extends Omit<Product, 'id'> {
  _id: string
}

export interface MealApiResponse extends Omit<Meal, 'id'> {
  _id: string
}

export interface MealProductApiResponse extends Omit<ProductWithAmount, 'id'> {
  _id: string
}

export interface GetMealByIdPayload {
  id: string
}

export interface ValidationError {
  msg: string
}

export interface ErrorPayload {
  data: { error: string | ValidationError[] }
  status: number
}