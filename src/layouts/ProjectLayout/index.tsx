import { Outlet } from 'react-router-dom'
import { ProjectNavigation } from '../../components/ProjectNavigation'

export function ProjectLayout() {
  return (
    <>
      <ProjectNavigation />
      <Outlet />
    </>
  )
}
