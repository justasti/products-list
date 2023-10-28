export interface Product {
  uniqueId: string
  productName: string
}

export interface MealProduct extends Product {
  productAmount: string
}

export interface Meal {
  uniqueId: string
  mealName: string
  products: MealProduct[]
}
