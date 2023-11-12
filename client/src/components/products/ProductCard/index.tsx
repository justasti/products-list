import { AddShoppingCartOutlined } from '@mui/icons-material'
import { FC, useRef, useState } from 'react'
import { useAppDispatch } from '../../../state/hooks'
import { Product } from '../../../state/models'
import { addToCart } from '../../../state/shopping-cart/slice'
import { StyledProductCard } from './styles'

interface Props {
  product: Product
}

export const ProductCard: FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch()
  const productAmountRef = useRef<HTMLInputElement>()
  const cardRef = useRef<HTMLDivElement>()
  const [isAddButtonClicked, setIsAddButtonClicked] = useState(false)

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (isAddButtonClicked) {
      dispatch(addToCart({ ...product, amount: productAmountRef.current.valueAsNumber }))
      setIsAddButtonClicked(false)
    } else setIsAddButtonClicked(true)
  }

  return (
    <StyledProductCard $isInputHidden={!isAddButtonClicked} ref={cardRef}>
      <h2>{product.name}</h2>
      <form className='add-to-cart' onSubmit={handleSubmit}>
        <input
          type='number'
          ref={productAmountRef}
          defaultValue={1}
          onChange={(e) => {
            productAmountRef.current.value = e.target.value
          }}
        />
        <button>
          <AddShoppingCartOutlined color='action' />
        </button>
      </form>
    </StyledProductCard>
  )
}
