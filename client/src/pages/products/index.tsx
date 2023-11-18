import { useEffect } from 'react'
import { LoadingSpinner } from '../../components/LoadingSpinner'
import { LinkButton } from '../../components/UI/link-button'
import { ProductCard } from '../../components/products/ProductCard'
import { useAppDispatch, useAppSelector } from '../../state/hooks'
import { Product } from '../../state/models'
import { selectIsProductsLoading, selectProducts } from '../../state/products/selectors'
import { getProducts } from '../../state/products/thunks'
import { ProductsContainer, Wrapper } from './styles'

export const Products = () => {
  const products = useAppSelector(selectProducts)
  const isProductsLoading = useAppSelector(selectIsProductsLoading)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!products.length) dispatch(getProducts())
  }, [])

  if (isProductsLoading) return <LoadingSpinner />

  return (
    <Wrapper>
      <ProductsContainer>
        {products.length ? (
          products.map((product: Product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <h1>No products added yet</h1>
        )}
      </ProductsContainer>
      <LinkButton link='/products/new' text='Add new product' />
    </Wrapper>
  )
}
