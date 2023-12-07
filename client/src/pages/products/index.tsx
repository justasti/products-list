import { useEffect } from 'react'
import { LoadingSpinner } from '../../components/LoadingSpinner'
import { LinkButton } from '../../components/UI/link-button'
import { Heading } from '../../components/heading'
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
      <Heading level={1}>Products List</Heading>
      <ProductsContainer>
        {products.length ? (
          products.map((product: Product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <Heading level={2}>No products added yet</Heading>
        )}
      </ProductsContainer>
      <LinkButton link='/products/new' text='Add new product' />
    </Wrapper>
  )
}
