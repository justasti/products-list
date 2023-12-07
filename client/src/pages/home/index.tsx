import { Outlet } from 'react-router-dom'
import { Sidenav } from './../../components/sidenav'
import {Header} from '../../components/header'

export const Homepage = () => (
  <>
    <Sidenav />
    <main>
      <Header />
      <Outlet></Outlet>
    </main>
  </>
)
