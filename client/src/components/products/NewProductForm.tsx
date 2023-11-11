import { nanoid } from '@reduxjs/toolkit'
import { SyntheticEvent, useRef, useState } from 'react'
import { useAppDispatch } from '../../state/hooks'
import { createProduct } from '../../state/products/thunks'

export const NewProductForm = () => {
  const productInputRef = useRef<HTMLInputElement>(null)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const dispatch = useAppDispatch()

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    setIsButtonDisabled(true)
    const newProduct = {
      name: productInputRef.current.value,
      _id: nanoid(),
    }
    try {
      const res = await dispatch(createProduct(newProduct))
      if (res.meta.requestStatus !== 'rejected') {
        productInputRef.current.value = null
      }
    } finally {
      setIsButtonDisabled(false)
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='product'>Product name:</label>
        <input ref={productInputRef} type='text' name='product' id='product' />
      </div>
      <div>
        <input disabled={isButtonDisabled} type='submit' value='Create' />
      </div>
    </form>
  )
}
