import { Link } from 'react-router-dom'
import { useAppSelector } from '../../state/hooks'
import { Product } from '../../state/models'
import {
  selectIsProductsLoading,
  selectProducts,
} from '../../state/products/selectors'
import { LoadingSpinner } from '../LoadingSpinner'

export const Products = () => {
  const products = useAppSelector(selectProducts)
  const isProductsLoading = useAppSelector(selectIsProductsLoading)

  if (isProductsLoading) return <LoadingSpinner />

  return (
    <>
      <div>
        {products &&
          products.map((product: Product) => (
            <div key={product.uniqueId}>{product.productName}</div>
          ))}
      </div>
      <Link to='/products/new'>Add new product</Link>
    </>
  )
}
