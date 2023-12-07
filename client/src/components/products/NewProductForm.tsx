import { nanoid } from '@reduxjs/toolkit'
import { SyntheticEvent, useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../state/hooks'
import { ValidationError } from '../../state/models'
import { selectProducts, selectProductsStateError } from '../../state/products/selectors'
import { createProduct, getProducts } from '../../state/products/thunks'
import { Button } from '../UI/button'
import { ErrorMessage } from '../UI/error-message'
import { SuccessMessage } from '../UI/success-message'
import { Heading } from '../heading'

export const NewProductForm = () => {
  const products = useAppSelector(selectProducts)
  const productsStateError = useAppSelector(selectProductsStateError)
  const productInputRef = useRef<HTMLInputElement>(null)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [isProductCreated, setIsProductCreated] = useState(false)
  const [showCreationMessage, setShowCreationMessage] = useState(false)
  const dispatch = useAppDispatch()

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

  return (
    <>
      <Heading level={1}>Create a new product</Heading>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='product'>Product name:</label>
          <input ref={productInputRef} type='text' name='product' id='product' />
        </div>
        <div>
          <Button disabled={isButtonDisabled}>Create</Button>
        </div>
      </form>
      {showCreationMessage && isProductCreated && <SuccessMessage>Product successfully created.</SuccessMessage>}
      {showCreationMessage && renderErrorMessage()}
    </>
  )
}
