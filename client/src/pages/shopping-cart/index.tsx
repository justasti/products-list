import { ContentCopy, DeleteOutline } from '@mui/icons-material'
import { Button } from '../../components/UI/button'
import { Heading } from '../../components/heading'
import { ShoppingListItem } from '../../components/shopping-list/shopping-list-item'
import { useAppDispatch, useAppSelector } from '../../state/hooks'
import { selectShoppingCart } from '../../state/shopping-cart/selectors'
import { decreaseAmount, increaseAmount, removeFromCart, resetCart } from '../../state/shopping-cart/slice'
import { ButtonsContainer } from './styles'

export const ShoppingCart = () => {
  const dispatch = useAppDispatch()
  const shoppingCartItems = useAppSelector(selectShoppingCart)

  const copyToClipboard = () => {
    const parsedList = shoppingCartItems.map((item) => `${item.name} - ${item.amount}`).join('\n')
    navigator.clipboard.writeText(parsedList)
  }

  if (!shoppingCartItems.length) return <h1>Shopping cart is empty!</h1>

  return (
    <>
      <Heading level={1}>Shopping list</Heading>
      <ul>
        {shoppingCartItems.map((item) => (
          <ShoppingListItem
            item={item}
            key={item.id}
            onRemove={(id) => dispatch(removeFromCart(id))}
            onDecrease={(id) => dispatch(decreaseAmount(id))}
            onIncrease={(id) => dispatch(increaseAmount(id))}
          />
        ))}
      </ul>
      <ButtonsContainer>
        <Button onClick={copyToClipboard}>
          <ContentCopy fontSize='small' />
          Copy to clipboard
        </Button>
        <Button onClick={() => dispatch(resetCart())}>
          <DeleteOutline fontSize='small' />
          Clear Cart
        </Button>
      </ButtonsContainer>
    </>
  )
}
