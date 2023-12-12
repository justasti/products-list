import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../state/hooks'
import { selectFilteredCategories, selectProductsCategories } from '../../state/products/selectors'
import { closeProductsFilter, setFilteredCategories } from '../../state/products/slice'
import { Button } from '../UI/button'
import { Heading } from '../heading'
import { Backdrop, StyledFilters } from './styles'

export const Filters = () => {
  const dispatch = useAppDispatch()
  const productsCategories = useAppSelector(selectProductsCategories)
  const filteredCategories = useAppSelector(selectFilteredCategories)

  const [categoriesFilter, setCategoriesFilter] = useState(filteredCategories)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target
    if (checked) {
      setCategoriesFilter([...categoriesFilter, value])
    } else {
      setCategoriesFilter(categoriesFilter.filter((category) => category !== value))
    }
  }

  return (
    <Backdrop
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setCategoriesFilter(filteredCategories)
          dispatch(closeProductsFilter())
        }
      }}
    >
      <StyledFilters
        key='filters'
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, type: 'spring' }}
      >
        <div>
          <Heading level={3}>Filter by category:</Heading>
          {productsCategories.map((category) => (
            <div key={category}>
              <input
                type='checkbox'
                checked={categoriesFilter.includes(category)}
                onChange={handleChange}
                id={category}
                name={category}
                value={category}
              />
              <label htmlFor={category}>{category}</label>
            </div>
          ))}
        </div>
        <Button
          onClick={(e) => {
            e.stopPropagation()
            dispatch(setFilteredCategories(categoriesFilter))
          }}
        >
          Save and close
        </Button>
      </StyledFilters>
    </Backdrop>
  )
}
