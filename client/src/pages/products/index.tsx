import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LoadingSpinner } from '../../components/LoadingSpinner'
import { useAppDispatch, useAppSelector } from '../../state/hooks'
import { Product } from '../../state/models'
import {
  selectIsProductsLoading,
  selectProducts,
} from '../../state/products/selectors'
import { getProducts } from '../../state/products/thunks'

export const Products = () => {
  const products = useAppSelector(selectProducts)
  const isProductsLoading = useAppSelector(selectIsProductsLoading)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getProducts())
  }, [])

  if (isProductsLoading) return <LoadingSpinner />

  return (
    <>
      <div>
        {products &&
          products.map((product: Product) => (
            <div key={product.id}>{product.name}</div>
          ))}
      </div>
      <Link to='/products/new'>Add new product</Link>
    </>
  )
}
