import { Egg, Label, LunchDining, ShoppingCart } from '@mui/icons-material'
import { useIsMobile } from '../../app/hooks/isMobile'
import { StyledNavbar } from './styles'

export const Sidenav = () => {
  const isMobile = useIsMobile()

  return (
    <StyledNavbar $mobile={isMobile}>
      <ul>
        <li className='category'>
          <div className='category-title'>
            <LunchDining fontSize={isMobile ? 'large' : 'medium'} />
            <h3 className={isMobile ? 'hidden' : undefined}>Meals</h3>
          </div>
          <ul className={isMobile ? 'category-items hidden' : 'category-items'}>
            <li>List</li>
            <li>Add New</li>
          </ul>
        </li>
        <li className='category'>
          <div className='category-title'>
            <Egg fontSize={isMobile ? 'large' : 'medium'} />
            <h3 className={isMobile ? 'hidden' : undefined}>Products</h3>
          </div>
        </li>
        <li className='category'>
          <div className='category-title'>
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
