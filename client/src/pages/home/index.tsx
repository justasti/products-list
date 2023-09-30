import { Outlet } from 'react-router-dom'
import { Sidenav } from './../../components/sidenav'

export const Homepage = () => (
  <>
    <Sidenav />
    <main>
      <Outlet></Outlet>
    </main>
  </>
)
