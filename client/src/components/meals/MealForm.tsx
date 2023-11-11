import { nanoid } from '@reduxjs/toolkit'
import { SyntheticEvent, useEffect, useState } from 'react'
import { ActionMeta } from 'react-select'
import CreatableSelect from 'react-select/creatable'
import { useAppDispatch, useAppSelector } from '../../state/hooks'
import { createMeal } from '../../state/meals/thunks'
import { Meal, MealProduct, Product } from '../../state/models'
import { selectProducts } from '../../state/products/selectors'
import { getProducts } from '../../state/products/thunks'
import { LoadingSpinner } from '../LoadingSpinner'

type SelectOptionType = { label: string; value: string }

export const NewMealForm = () => {
  const dispatch = useAppDispatch()
  const [mealProducts, setMealProducts] = useState<Product[]>([])
  const [productsWithAmount, setProductsWithAmount] = useState<MealProduct[]>(
    []
  )
  const [mealName, setMealName] = useState('')
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [isProductsSelected, setIsProductsSelected] = useState(false)
  const products = useAppSelector(selectProducts)
  const productOptions = products.map((prod) => ({
    value: prod._id,
    label: prod.productName,
  }))

  useEffect(() => {
    dispatch(getProducts())
  }, [])

  const handleChange = (
    options: SelectOptionType[],
    meta: ActionMeta<SelectOptionType>
  ) => {
    if (meta.action === 'create-option') {
      setMealProducts((current) => [
        ...current,
        { _id: nanoid(), productName: meta.option.label },
      ])
    } else {
      const selectedOptions = options.map((option) => ({
        _id: option.value,
        productName: option.label,
      }))
      setMealProducts(selectedOptions)
    }
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const productToAddAmount = mealProducts.find(
      (product) => product._id === e.target.id
    )
    const updatedProduct = {
      ...productToAddAmount,
      productAmount: e.target.value,
    }

    if (productsWithAmount.find((prod) => prod._id === updatedProduct._id)) {
      setProductsWithAmount((current) =>
        current.map((product) =>
          product._id === updatedProduct._id ? updatedProduct : product
        )
      )
    } else {
      setProductsWithAmount((current) => [...current, updatedProduct])
    }
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()

    if (isProductsSelected) {
      setIsButtonDisabled(true)

      const meal: Meal = {
        _id: nanoid(),
        mealName,
        products: productsWithAmount,
      }

      console.log(meal)

      try {
        const res = await dispatch(createMeal(meal))
        if (res.meta.requestStatus !== 'rejected') {
          setMealProducts([])
          setMealName('')
        }
      } finally {
        setIsButtonDisabled(false)
      }
    } else {
      setIsProductsSelected(true)
    }
  }

  if (!products.length) return <LoadingSpinner />

  if (isProductsSelected) {
    return (
      <>
        <h1>Create a new meal</h1>
        <form onSubmit={handleSubmit}>
          {mealProducts.map((product) => (
            <div key={product._id}>
              <label htmlFor={product._id}>{product.productName}</label>
              <input
                onChange={handleAmountChange}
                type='number'
                name={product._id}
                id={product._id}
              />
            </div>
          ))}
          <input type='submit' value='Create meal' />
        </form>
      </>
    )
  }

  return (
    <>
      <h1>Create a new meal</h1>
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
        <CreatableSelect
          isMulti
          options={productOptions}
          onChange={handleChange}
        ></CreatableSelect>
        <div>
          <input
            disabled={isButtonDisabled}
            type='submit'
            value='Add Amounts'
          />
        </div>
      </form>
    </>
  )
}
