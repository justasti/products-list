import { useAppDispatch } from '../../state/hooks'
import { closeProductsFilter } from '../../state/products/slice'
import { Button } from '../UI/button'
import { Backdrop, StyledFilters } from './styles'

export const Filters = () => {
  const dispatch = useAppDispatch()

  return (
    <Backdrop
      onClick={(e) => {
        if (e.target === e.currentTarget) {
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
        Filters
        <Button
          onClick={(e) => {
            e.stopPropagation()
            dispatch(closeProductsFilter())
          }}
        >
          Close
        </Button>
      </StyledFilters>
    </Backdrop>
  )
}
