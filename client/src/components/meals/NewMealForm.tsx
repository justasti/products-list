import { nanoid } from '@reduxjs/toolkit'
import { SyntheticEvent, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../state/hooks'
import { createMeal } from '../../state/meals/thunks'
import { Meal, MealProduct } from '../../state/models'
import { selectIsProductsLoading } from '../../state/products/selectors'
import { getProducts } from '../../state/products/thunks'
export const NewMealForm = () => {
  const initialProducts = [
    { productName: '', productAmount: '', uniqueId: nanoid() },
  ]
  const productsLoading = useAppSelector(selectIsProductsLoading)
  const [mealProducts, setMealProducts] =
    useState<MealProduct[]>(initialProducts)
  const [mealName, setMealName] = useState('')
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const dispatch = useAppDispatch()

  const handleAddProduct = () => {
    setMealProducts((prevProducts) => [
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
    const productsList = [...mealProducts]
    productsList[i][valueToEdit] = value
    setMealProducts(productsList)
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    setIsButtonDisabled(true)
    dispatch(getProducts())

    while (productsLoading) {
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    const meal: Meal = {
      uniqueId: nanoid(),
      mealName,
      products: mealProducts,
    }

    try {
      const res = await dispatch(createMeal(meal))
      if (res.meta.requestStatus !== 'rejected') {
        setMealProducts(initialProducts)
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
      {mealProducts.map((product, i) => (
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
            {i === mealProducts.length - 1 && (
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
