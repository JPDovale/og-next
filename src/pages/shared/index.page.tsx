import { useContext, useState } from 'react'
import { Error } from '../../components/Error'
import { Loading } from '../../components/Loading'
import { Projects } from '../../components/Projects'
import { ProjectsContext } from '../../contexts/projects'
import { UserContext } from '../../contexts/user'
import { DashboardPageLayout } from '../../layouts/DashboardPageLayout'

export default function SharedPage() {
  const [query, setQuery] = useState('')

  const { projects, loading } = useContext(ProjectsContext)
  const { user } = useContext(UserContext)

  if (loading) return <Loading />
  if (!user || !projects) return <Error />

  const projectsSharedWhitUser = projects.filter(
    (project) => project.createdPerUser !== user.id,
  )

  if (!projectsSharedWhitUser) return <Error />

  return (
    <DashboardPageLayout
      window="Compartilhados"
      query={query}
      setQuery={setQuery}
      queryless={!!projectsSharedWhitUser[0]}
    >
      <Projects
        projects={projectsSharedWhitUser}
        listEmptyMessage="Nenhum projeto foi compartilhado com você ainda"
        query={query}
      />
    </DashboardPageLayout>
  )
}
