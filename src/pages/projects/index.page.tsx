import { useContext, useState } from 'react'
import { Error } from '../../components/Error'
import { Loading } from '../../components/Loading'
import { Projects } from '../../components/Projects'
import { ProjectsContext } from '../../contexts/projects'
import { UserContext } from '../../contexts/user'
import { DashboardPageLayout } from '../../layouts/DashboardPageLayout'

export default function ProjectsPage() {
  const [query, setQuery] = useState('')

  const { projects, loading } = useContext(ProjectsContext)
  const { user } = useContext(UserContext)

  if (loading) return <Loading />
  if (!user || !projects) return <Error />

  const projectsThisUser = projects.filter(
    (project) => project.createdPerUser === user.id,
  )

  if (!projectsThisUser) return <Error />

  return (
    <DashboardPageLayout
      window="Meus projetos"
      query={query}
      setQuery={setQuery}
      loading={loading}
      queryless={!!projectsThisUser[0]}
    >
      <Projects
        listEmptyMessage="Você ainda não criou nenhum projeto"
        projects={projectsThisUser}
        query={query}
      />
    </DashboardPageLayout>
  )
}
