import FilterListIcon from '@mui/icons-material/FilterList'
import { useAppDispatch } from '../../state/hooks'
import { openProductsFilter } from '../../state/products/slice'
import { StyledFilderButton } from './styles'

export const FilterButton = () => {
  const dispatch = useAppDispatch()
  return (
    <StyledFilderButton onClick={() => dispatch(openProductsFilter())}>
      <FilterListIcon fontSize='large' />
    </StyledFilderButton>
  )
}
