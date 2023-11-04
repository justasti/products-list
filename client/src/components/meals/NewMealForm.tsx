import { nanoid } from '@reduxjs/toolkit'
import { SyntheticEvent, useState } from 'react'
import { useAppDispatch } from '../../state/hooks'
import { createMeal } from '../../state/meals/thunks'
import { Meal, MealProduct } from '../../state/models'
export const NewMealForm = () => {
  const dispatch = useAppDispatch()
  const [products, setProducts] = useState<MealProduct[]>([
    { productName: '', productAmount: '', uniqueId: nanoid() },
  ])
  const [mealName, setMealName] = useState('')

  const handleAddProduct = () => {
    setProducts((prevProducts) => [
      ...prevProducts,
      { productName: '', productAmount: '', uniqueId: nanoid() },
    ])
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number,
    valueToEdit: 'productName' | 'productAmount'
  ) => {
    const { value } = e.target
    const productsList = [...products]
    productsList[i][valueToEdit] = value
    setProducts(productsList)
  }

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()

    const meal: Meal = {
      uniqueId: nanoid(),
      mealName,
      products,
    }

    dispatch(createMeal(meal))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='meal'>Meal name:</label>
        <input
          type='text'
          name='meal'
          id='meal'
          value={mealName}
          onChange={(e) => setMealName(e.target.value)}
        />
      </div>
      {products.map((product, i) => (
        <div key={i}>
          <div>
            <label htmlFor={`productName${i}`}>Product name:</label>
            <input
              type='text'
              name={`productName${i}`}
              id={`productName${i}`}
              value={product.productName}
              onChange={(e) => handleChange(e, i, 'productName')}
            />
          </div>
          <div>
            <label htmlFor={`productAmount${i}`}>Product amount:</label>
            <input
              type='number'
              name={`productAmount${i}`}
              id={`productAmount${i}`}
              value={product.productAmount}
              onChange={(e) => handleChange(e, i, 'productAmount')}
            />
            {i === products.length - 1 && (
              <button onClick={handleAddProduct}>+</button>
            )}
          </div>
        </div>
      ))}
      <div>
        <input type='submit' value='Create' />
      </div>
    </form>
  )
}
