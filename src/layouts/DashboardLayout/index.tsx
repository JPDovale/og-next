import { Outlet } from 'react-router-dom'
import { NavigationBar } from '../../components/Navigation'

export function DashboardLayout() {
  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  )
}
