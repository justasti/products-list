import { AddCircleOutline, HighlightOff, RemoveCircleOutline } from '@mui/icons-material'
import { FC } from 'react'
import { ProductWithAmount } from '../../../state/models'
import { StyledListItem } from './styles'

interface Props {
  item: ProductWithAmount
  onIncrease: (id: string) => void
  onDecrease: (id: string) => void
  onRemove: (id: string) => void
}

export const ShoppingListItem: FC<Props> = ({ item, onDecrease, onIncrease, onRemove }) => {
  return (
    <StyledListItem>
      <div>
        <HighlightOff onClick={() => onRemove(item.id)} />
        <p>{item.name}</p>
      </div>
      <div>
        <RemoveCircleOutline onClick={() => onDecrease(item.id)} />
        <p>{item.amount}</p>
        <AddCircleOutline onClick={() => onIncrease(item.id)} />
      </div>
    </StyledListItem>
  )
}
