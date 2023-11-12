import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LoadingSpinner } from '../../components/LoadingSpinner'
import { ProductCard } from '../../components/products/ProductCard'
import { useAppDispatch, useAppSelector } from '../../state/hooks'
import { Product } from '../../state/models'
import { selectIsProductsLoading, selectProducts } from '../../state/products/selectors'
import { getProducts } from '../../state/products/thunks'

export const Products = () => {
  const products = useAppSelector(selectProducts)
  const isProductsLoading = useAppSelector(selectIsProductsLoading)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!products.length) dispatch(getProducts())
  }, [])

  if (isProductsLoading) return <LoadingSpinner />

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '18px 12px' }}>
        {products && products.map((product: Product) => <ProductCard key={product.id} product={product} />)}
      </div>
      <Link to='/products/new'>Add new product</Link>
    </>
  )
}
