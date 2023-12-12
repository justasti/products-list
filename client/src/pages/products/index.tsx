import { useEffect } from 'react'
import { LoadingSpinner } from '../../components/LoadingSpinner'
import { LinkButton } from '../../components/UI/link-button'
import { FilterButton } from '../../components/filter-button'
import { Filters } from '../../components/filters'
import { Heading } from '../../components/heading'
import { ProductCard } from '../../components/products/ProductCard'
import { useAppDispatch, useAppSelector } from '../../state/hooks'
import { Product } from '../../state/models'
import {
  selectFilteredCategories,
  selectIsProductsFilterOpen,
  selectIsProductsLoading,
  selectProducts,
} from '../../state/products/selectors'
import { getProducts } from '../../state/products/thunks'
import { ProductsContainer, Wrapper } from './styles'

export const Products = () => {
  const products = useAppSelector(selectProducts)
  const filteredCategories = useAppSelector(selectFilteredCategories)
  const isProductsLoading = useAppSelector(selectIsProductsLoading)
  const isProductsFilterOpen = useAppSelector(selectIsProductsFilterOpen)
  const filteredProducts = filteredCategories.length
    ? products.filter((product) => product.categories.some((category) => filteredCategories.includes(category)))
    : products

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!products.length) dispatch(getProducts())
  }, [])

  if (isProductsLoading) return <LoadingSpinner />

  return (
    <Wrapper>
      <Heading level={1}>Products List</Heading>
      <ProductsContainer>
        {filteredProducts.length ? (
          filteredProducts.map((product: Product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <Heading level={2}>No products added yet</Heading>
        )}
      </ProductsContainer>
      <LinkButton link='/products/new' text='Add new product' />
      <FilterButton />
      {isProductsFilterOpen && <Filters />}
    </Wrapper>
  )
}
