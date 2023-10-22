import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../state/hooks'
import {
  selectIsProductsLoading,
  selectProducts,
} from '../../state/products/selectors'
import { getProducts } from '../../state/products/thunks'
import { Product } from '../../state/productsApi/api'
import { LoadingSpinner } from '../LoadingSpinner'

export const Products = () => {
  const dispatch = useAppDispatch()
  const products = useAppSelector(selectProducts)
  const isProductsLoading = useAppSelector(selectIsProductsLoading)

  useEffect(() => {
    dispatch(getProducts())
  }, [])

  if (isProductsLoading) return <LoadingSpinner />

  return (
    <>
      <div>
        {products &&
          products.map((product: Product) => (
            <div key={product._id}>{product.productName}</div>
          ))}
      </div>
    </>
  )
}
