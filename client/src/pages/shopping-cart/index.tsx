import { useAppSelector } from '../../state/hooks'
import { selectShoppingCart } from '../../state/shopping-cart/selectors'

export const ShoppingCart = () => {
  const shoppingCartItems = useAppSelector(selectShoppingCart)

  if (!shoppingCartItems.length) return <h1>Shopping cart is empty!</h1>

  return shoppingCartItems.map((item) => (
    <div>
      {item.name} - {item.amount}
    </div>
  ))
}
