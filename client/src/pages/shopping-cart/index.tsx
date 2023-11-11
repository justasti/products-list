import { useAppSelector } from '../../state/hooks'
import { selectShoppingCart } from '../../state/shopping-cart/selectors'

export const ShoppingCart = () => {
  const shoppingCartItems = useAppSelector(selectShoppingCart)

  const copyToClipboard = () => {
    const parsedList = shoppingCartItems.map((item) => `${item.name} - ${item.amount}`).join('\n')
    navigator.clipboard.writeText(parsedList)
  }

  if (!shoppingCartItems.length) return <h1>Shopping cart is empty!</h1>

  return (
    <>
      {shoppingCartItems.map((item) => (
        <div key={item.id}>
          {item.name} - {item.amount}
        </div>
      ))}
      <button onClick={copyToClipboard}>Copy to clipboard</button>
    </>
  )
}
