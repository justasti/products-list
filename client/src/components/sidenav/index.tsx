import { Egg, Label, LunchDining, ShoppingCart } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useIsMobile } from '../../app/hooks/isMobile'
import { StyledNavbar } from './styles'

export const Sidenav = () => {
  const isMobile = useIsMobile()
  const navigate = useNavigate()

  return (
    <StyledNavbar $mobile={isMobile}>
      <ul>
        <li className='category'>
          <div className='category-title' onClick={() => navigate('/meals')}>
            <LunchDining fontSize={isMobile ? 'large' : 'medium'} />
            <h3 className={isMobile ? 'hidden' : undefined}>Meals</h3>
          </div>
        </li>
        <li className='category'>
          <div className='category-title' onClick={() => navigate('/products')}>
            <Egg fontSize={isMobile ? 'large' : 'medium'} />
            <h3 className={isMobile ? 'hidden' : undefined}>Products</h3>
          </div>
        </li>
        <li className='category'>
          <div className='category-title' onClick={() => navigate('/cart')}>
            <ShoppingCart fontSize={isMobile ? 'large' : 'medium'} />
            <h3 className={isMobile ? 'hidden' : undefined}>Shopping List</h3>
          </div>
        </li>
        <li className='category'>
          <div className='category-title'>
            <Label fontSize={isMobile ? 'large' : 'medium'} />
            <h3 className={isMobile ? 'hidden' : undefined}>Categories</h3>
          </div>
        </li>
      </ul>
    </StyledNavbar>
  )
}
