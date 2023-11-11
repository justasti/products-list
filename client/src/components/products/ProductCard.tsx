import { FC, useRef } from 'react'
import { useAppDispatch } from '../../state/hooks'
import { Product } from '../../state/models'
import { addToCart } from '../../state/shopping-cart/slice'

interface Props {
  product: Product
}

export const ProductCard: FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch()
  const productAmountRef = useRef<HTMLInputElement>()

  return (
    <div>
      {product.name}
      <input
        type='number'
        ref={productAmountRef}
        onChange={(e) => {
          productAmountRef.current.value = e.target.value
        }}
      />
      <input
        type='submit'
        onClick={() => {
          dispatch(addToCart({ ...product, amount: productAmountRef.current.valueAsNumber }))
        }}
        value='Add'
      />
    </div>
  )
}
