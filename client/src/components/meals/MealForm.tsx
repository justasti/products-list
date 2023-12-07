import { nanoid } from '@reduxjs/toolkit'
import { SyntheticEvent, useEffect, useState } from 'react'
import { ActionMeta } from 'react-select'
import CreatableSelect from 'react-select/creatable'
import { useAppDispatch, useAppSelector } from '../../state/hooks'
import { createMeal } from '../../state/meals/thunks'
import { Meal, Product, ProductWithAmount } from '../../state/models'
import { selectProducts } from '../../state/products/selectors'
import { getProducts } from '../../state/products/thunks'
import { LoadingSpinner } from '../LoadingSpinner'
import { Heading } from '../heading'

type SelectOptionType = { label: string; value: string }

export const NewMealForm = () => {
  const dispatch = useAppDispatch()
  const [mealProducts, setMealProducts] = useState<Product[]>([])
  const [productsWithAmount, setProductsWithAmount] = useState<ProductWithAmount[]>([])
  const [productName, setProductName] = useState('')
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [isProductsSelected, setIsProductsSelected] = useState(false)
  const products = useAppSelector(selectProducts)
  const productOptions = products.map((prod) => ({
    value: prod.id,
    label: prod.name,
  }))

  useEffect(() => {
    if (products.length < 2) dispatch(getProducts())
  }, [])

  const handleChange = (_, meta: ActionMeta<SelectOptionType>) => {
    if (meta.action === 'create-option') {
      setMealProducts((current) => [...current, { id: nanoid(), name: meta.option.label }])
    } else if (meta.action === 'select-option') {
      setMealProducts((current) => [...current, { id: meta.option.value, name: meta.option.label }])
    } else if (meta.action === 'clear') {
      setMealProducts([])
    } else {
      setMealProducts((current) => current.filter((product) => product.name !== meta.removedValue.label))
    }
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const productToAddAmount = mealProducts.find((product) => product.id === e.target.id)

    const updatedProduct = {
      ...productToAddAmount,
      amount: e.target.valueAsNumber,
    }

    if (productsWithAmount.find((prod) => prod.id === updatedProduct.id)) {
      setProductsWithAmount((current) =>
        current.map((product) => (product.id === updatedProduct.id ? updatedProduct : product))
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
        id: nanoid(),
        name: productName,
        products: productsWithAmount,
      }

      try {
        const res = await dispatch(createMeal(meal))
        if (res.meta.requestStatus !== 'rejected') {
          setMealProducts([])
          setProductName('')
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
        <Heading level={1}>Create a new meal</Heading>
        <form onSubmit={handleSubmit}>
          {mealProducts.map((product) => (
            <div key={product.id}>
              <label htmlFor={product.id}>{product.name}</label>
              <input onChange={handleAmountChange} type='number' step={0.1} name={product.id} id={product.id} />
            </div>
          ))}
          <input disabled={isButtonDisabled} type='submit' value='Create meal' />
        </form>
      </>
    )
  }

  return (
    <>
      <Heading level={1}>Create a new meal</Heading>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='meal'>Meal name:</label>
          <input
            type='text'
            name='meal'
            id='meal'
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <CreatableSelect isMulti options={productOptions} onChange={handleChange}></CreatableSelect>
        <div>
          <input type='submit' value='Add Amounts' />
        </div>
      </form>
    </>
  )
}
