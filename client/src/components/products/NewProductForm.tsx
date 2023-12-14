import { nanoid } from '@reduxjs/toolkit'
import { SyntheticEvent, useEffect, useRef, useState } from 'react'
import { ActionMeta } from 'react-select'
import CreatableSelect from 'react-select/creatable'
import { useAppDispatch, useAppSelector } from '../../state/hooks'
import { ValidationError } from '../../state/models'
import { selectProducts, selectProductsCategories, selectProductsStateError } from '../../state/products/selectors'
import { createProduct, getProducts } from '../../state/products/thunks'
import { Button } from '../UI/button'
import { ErrorMessage } from '../UI/error-message'
import { SuccessMessage } from '../UI/success-message'
import { Heading } from '../heading'
import { SelectOptionType } from '../meals/MealForm'

export const NewProductForm = () => {
  const products = useAppSelector(selectProducts)
  const productsStateError = useAppSelector(selectProductsStateError)
  const productsCategories = useAppSelector(selectProductsCategories)
  const productInputRef = useRef<HTMLInputElement>(null)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [isProductCreated, setIsProductCreated] = useState(false)
  const [showCreationMessage, setShowCreationMessage] = useState(false)
  const dispatch = useAppDispatch()

  const productsCategoriesOptions = productsCategories.map((category) => ({ value: category, label: category }))

  useEffect(() => {
    if (!products.length) dispatch(getProducts())
  }, [])

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    setIsButtonDisabled(true)
    setIsProductCreated(false)
    setShowCreationMessage(false)
    const newProduct = {
      name: productInputRef.current.value,
      categories: selectedCategories,
      id: nanoid(),
    }
    let timeOut: ReturnType<typeof setTimeout>

    try {
      if (timeOut) clearTimeout(timeOut)
      const res = await dispatch(createProduct(newProduct))

      if (res.meta.requestStatus !== 'rejected') {
        productInputRef.current.value = null
        setIsProductCreated(true)
      }
      setShowCreationMessage(true)
    } finally {
      setIsButtonDisabled(false)

      timeOut = setTimeout(() => {
        setShowCreationMessage(false)
      }, 6000)
    }
  }

  const renderErrorMessage = () => {
    if (productsStateError) {
      if (Array.isArray(productsStateError.data.error)) {
        return productsStateError.data.error.map((error: ValidationError) => (
          <ErrorMessage key={error.msg}>{error.msg}</ErrorMessage>
        ))
      } else {
        return <ErrorMessage>{productsStateError.data.error}</ErrorMessage>
      }
    }
  }

  const handleSelectChange = (_, meta: ActionMeta<SelectOptionType>) => {
    if (meta.action === 'create-option' || meta.action === 'select-option') {
      setSelectedCategories((current) => [...current, meta.option.label])
    } else if (meta.action === 'clear') {
      setSelectedCategories([])
    } else {
      setSelectedCategories((current) => current.filter((category) => category !== meta.removedValue.label))
    }
  }

  return (
    <>
      <Heading level={1}>Create a new product</Heading>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='product'>Product name:</label>
          <input ref={productInputRef} type='text' name='product' id='product' />
        </div>
        <CreatableSelect isMulti options={productsCategoriesOptions} onChange={handleSelectChange}></CreatableSelect>
        <div>
          <Button disabled={isButtonDisabled}>Create</Button>
        </div>
      </form>
      {showCreationMessage && isProductCreated && <SuccessMessage>Product successfully created.</SuccessMessage>}
      {showCreationMessage && renderErrorMessage()}
    </>
  )
}
