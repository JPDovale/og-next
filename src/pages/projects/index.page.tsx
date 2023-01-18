import { useContext, useState } from 'react'
import { Projects } from '../../components/Projects'
import { ProjectsContext } from '../../contexts/projects'
import { UserContext } from '../../contexts/user'
import { DashboardPageLayout } from '../../layouts/DashboardPageLayout'

export default function ProjectsPage() {
  const [query, setQuery] = useState('')

  const { projects, loading } = useContext(ProjectsContext)
  const { user } = useContext(UserContext)

  const projectsThisUser = projects.filter(
    (project) => project.createdPerUser === user?.id,
  )

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
        isLoading={loading}
      />
    </DashboardPageLayout>
  )
}
