import { AddShoppingCartOutlined } from '@mui/icons-material'
import { FC, useEffect, useRef, useState } from 'react'
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
  const addButtonRef = useRef<HTMLButtonElement>()
  const svgButtonRef = useRef<SVGSVGElement>()
  const [isAddButtonClicked, setIsAddButtonClicked] = useState(false)

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (isAddButtonClicked) {
      dispatch(addToCart({ ...product, amount: productAmountRef.current.valueAsNumber }))
      setIsAddButtonClicked(false)
    } else setIsAddButtonClicked(true)
  }

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (
        !cardRef.current.contains(event.target as Node) &&
        event.target !== addButtonRef.current &&
        event.target !== svgButtonRef.current
      ) {
        setIsAddButtonClicked(false)
      }
    }

    document.addEventListener('click', handleDocumentClick)

    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [])

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
        <button ref={addButtonRef}>
          <AddShoppingCartOutlined ref={svgButtonRef} color='action' />
        </button>
      </form>
    </StyledProductCard>
  )
}
