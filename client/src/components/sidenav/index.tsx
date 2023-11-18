import { Egg, Label, LunchDining, ShoppingCart } from '@mui/icons-material'
import { NavLink } from 'react-router-dom'
import { useIsMobile } from '../../app/hooks/isMobile'
import { StyledNavbar } from './styles'

export const Sidenav = () => {
  const isMobile = useIsMobile()

  return (
    <StyledNavbar $mobile={isMobile}>
      <ul>
        <li>
          <NavLink className='link' to='/meals'>
            <LunchDining fontSize={isMobile ? 'large' : 'medium'} />
            <h3 className={isMobile ? 'hidden' : undefined}>Meals</h3>
          </NavLink>
        </li>
        <li>
          <NavLink className='link' to='/products'>
            <Egg fontSize={isMobile ? 'large' : 'medium'} />
            <h3 className={isMobile ? 'hidden' : undefined}>Products</h3>
          </NavLink>
        </li>
        <li>
          <NavLink className='link' to='/cart'>
            <ShoppingCart fontSize={isMobile ? 'large' : 'medium'} />
            <h3 className={isMobile ? 'hidden' : undefined}>Shopping List</h3>
          </NavLink>
        </li>
        <li>
          <NavLink className='link' to=''>
            <Label fontSize={isMobile ? 'large' : 'medium'} />
            <h3 className={isMobile ? 'hidden' : undefined}>Categories</h3>
          </NavLink>
        </li>
      </ul>
    </StyledNavbar>
  )
}
