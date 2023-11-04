import { nanoid } from '@reduxjs/toolkit'
import { SyntheticEvent, useState } from 'react'
import { useAppDispatch } from '../../state/hooks'
import { createMeal } from '../../state/meals/thunks'
import { Meal, MealProduct } from '../../state/models'
export const NewMealForm = () => {
  const initialProducts = [
    { productName: '', productAmount: '', uniqueId: nanoid() },
  ]
  const dispatch = useAppDispatch()
  const [products, setProducts] = useState<MealProduct[]>(initialProducts)
  const [mealName, setMealName] = useState('')
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

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

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    setIsButtonDisabled(true)

    const meal: Meal = {
      uniqueId: nanoid(),
      mealName,
      products,
    }
    try {
      const res = await dispatch(createMeal(meal))
      if (res.meta.requestStatus !== 'rejected') {
        setProducts(initialProducts)
        setMealName('')
      }
    } finally {
      setIsButtonDisabled(false)
    }
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
        <input disabled={isButtonDisabled} type='submit' value='Create' />
      </div>
    </form>
  )
}
